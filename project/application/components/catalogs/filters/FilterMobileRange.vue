<template>
    <div class="mobile-range">
        <div class="mobile-range__wrapper">
            <client-only>
                <VueRangeSlider
                    ref="rangeSlider"
                    :height="4"
                    :dotSize="24"
                    :tooltip="false"
                    :min="minRange"
                    :max="maxRange"
                    :step="1"
                    v-model="rangeValue"
                    :disabled="disabled || statusDisabled"
                    @slide-end="dragDebounceHandler"
                    @drag-start="dragDebounceHandler"
                    @drag-end="dragDebounceHandler"
                />
            </client-only>
        </div>
        <div class="mobile-range__fields">
            <client-only>
                <VueNumberFormat
                    class="form-control mobile-range__form-control"
                    :options="inputNumberOptions"
                    :disabled="disabled || statusDisabled"
                    v-model="inputMin"
                    @blur.native="inputMinHandler"
                    @keydown.enter.native="inputMinHandler"
                />
                <VueNumberFormat
                    class="form-control mobile-range__form-control"
                    :options="inputNumberOptions"
                    :disabled="disabled || statusDisabled"
                    v-model="inputMax"
                    @blur.native="inputMaxHandler"
                    @keydown.enter.native="inputMaxHandler"
                />
            </client-only>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit, InjectReactive } from 'nuxt-property-decorator';
import { IRange } from '~/types/catalog.interface';
import storeFormMapper from '~/utils/store-form-mapper';
import { debounce } from 'lodash';
import { EStatus } from '~/constants/status';

@Component({})
export default class ComponentFilterMobileRange extends Vue {
    @Prop() public readonly data!: IRange;
    @InjectReactive('CATALOG_STATUS') public status!: EStatus;

    public rangeValue: [number, number] = [0, 1];
    public disabled: boolean = false;
    public inputMin: number = 0;
    public inputMax: number = 1;

    public inputNumberOptions = {
        precision: 2,
        prefix: '',
        suffix: '',
        decimal: '.',
        thousand: '',
        acceptNegative: false,
        isInteger: true
    };

    public get statusDisabled(): boolean {
        return !!(this.status === EStatus.PROCESSING);
    }

    public get minRange(): number {
        return this.data ? this.data.min : 0;
    }

    public get maxRange(): number {
        if(this.data && this.data.min === this.data.max) {
            return this.data.max + 1;
        }

        return this.data.max;
    }

    private get minField(): string {
        return `attributes[attribute_${this.data.code}][min]`;
    }

    private get maxField(): string {
        return `attributes[attribute_${this.data.code}][max]`;
    }

    private get minValue(): number {
        return this.form[this.minField];
    }

    private get maxValue(): number {
        if(this.data && this.data.min === this.data.max) {
            return this.form[this.maxField] + 1;
        }

        return this.form[this.maxField];
    }

    private get internalMin(): number {
        return this.rangeValue[0];
    }

    private get internalMax(): number {
        return this.rangeValue[1];
    }

    public get form(): any {
        return storeFormMapper({
            store: this.$store,
            getter: 'page-catalog-form/formValue',
            action: 'page-catalog-form/setFormField',
            fields: [this.minField, this.maxField]
        });
    }

    public inputMinHandler(): void {
        let result: number = this.inputMin;

        if (result > this.internalMax) {
            result = this.maxValue
        }

        if (result < this.data.min) {
            result = this.data.min;
        }

        this.inputMin = this.form[this.minField] = result;
        this.updateAttributes();
    }

    public inputMaxHandler(): void {
        let result: number = this.inputMax;

        if (result < this.internalMin) {
            result = this.minValue
        }

        if (result > this.data.max) {
            result = this.data.max;
        }

        this.inputMax = this.form[this.maxField] = result;
        this.updateAttributes();
    }

    dragDebounceHandler = debounce(this.dragHandler, 400);

    public dragHandler(): void {
        this.form[this.minField] = this.rangeValue[0];
        this.form[this.maxField] = this.rangeValue[1];
        this.updateAttributes();
    }

    @Emit()
    public updateAttributes(): void {}

    public created(): void {
        console.log('created', this.data.name);
        if(this.data.name === 'Svoris [kg]') {
            this.inputNumberOptions.precision = 3;
        } 
    }

    public mounted(): void {
        this.rangeValue = [this.minValue, this.maxValue];
        this.inputMin = this.minValue;
        this.inputMax = this.maxValue;

        if(this.data.min === this.data.max) this.disabled = true;

        // https://github.com/xwpongithub/vue-range-slider/issues/21
        setTimeout(() => {
            (this.$refs.rangeSlider as any).refresh();
            (this.$refs.rangeSlider as any).handleKeyup = () => {};
            (this.$refs.rangeSlider as any).handleKeydown = () => {};
        }, 10);
    }

    @Watch('minValue')
    public onMinValueChanged(newValue: number): void {
        if (newValue === this.rangeValue[0]) {
            return;
        }

        this.rangeValue = [newValue, this.rangeValue[1]];
    }

    @Watch('maxValue')
    public onMaxValueChanged(newValue: number): void {
        if (newValue === this.rangeValue[1]) {
            return;
        }

        this.rangeValue = [this.rangeValue[0], newValue];
    }

    @Watch('rangeValue', { deep: true })
    public onInternalValueChanged([min, max]: [number, number]): void {
        this.inputMin = min;
        this.inputMax = max;
    }
}
</script>

<style lang="scss">
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.mobile-range {
    .vue-range-slider.slider-component {
        .slider {
            &-dot {
                border-color: $color-pink !important;
                max-width: 16px;
                max-height: 16px;
                top: -7px !important;
            }
            &-process {
                background-color: $color-pink !important;
            }
        }
    }

    &__wrapper {
        margin-bottom: 15px;
    }

    &__fields {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    &__form-control {
        flex: 0 1 calc(50% - 20px);
    }
}
</style>
