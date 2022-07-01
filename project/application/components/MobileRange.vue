<template>
    <div class="mobile-range">
        <div class="mobile-range__wrapper">
            <VueRangeSlider
                :height="4"
                :dotSize="24"
                :tooltip="false"
                :max="10000"
                :step="100"
                v-model="internalValue"
            />
        </div>
        <div class="mobile-range__fields">
            <input class="form-control mobile-range__form-control" type="text" v-model="internalValue[0]" />
            <input class="form-control mobile-range__form-control" type="text" v-model="internalValue[1]" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
@Component({})
export default class ComponentMobileRange extends Vue {
    @Prop()
    public readonly value: any;
    public internalValue: any = [0, 5000];

    @Watch('internalValue')
    public updateValue(): void {
        this.$emit('updateValue', this.internalValue);
    }
    public created(): void {
        if (this.value != null) this.internalValue = this.value;
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
