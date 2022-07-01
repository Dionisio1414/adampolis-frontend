<template>
    <div class="input-products-counter form-counter" :class="counterClassAttr">
        <button
            type="button"
            class="btn btn--flat btn--flex input-products-counter__btn"
            :disabled="decrementDisabled"
            @click="decrement"
        >
            <span class="icon icon--minus input-products-counter__icon"></span>
        </button>
        <client-only>
            <VueNumberFormat
                class="input-products-counter__value-input form-counter__value"
                :options="inputNumberOptions"
                :disabled="disabled"
                v-model="internalValue"
                @blur.native="blurHandler"
            />
        </client-only>
        <button 
            type="button" 
            class="btn btn--flat btn--flex input-products-counter__btn" 
            :disabled="incrementDisabled"            
            @click="increment"
        >
            <span class="icon icon--plus input-products-counter__icon"></span>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';

import { ESizes } from '../constants/sizes';

@Component({
    components: {}
})
export default class ComponentInputProductsCounter extends Vue {
    @Prop({ default: ESizes.MEDIUM })
    public readonly size!: string;

    @Prop({ default: false })
    public readonly border!: boolean;

    @Prop({ default: false })
    public readonly noBorderMd!: boolean;

    @Prop()
    public readonly value!: number;

    @Prop({ default: false })
    public readonly disabled!: boolean;

    @Prop({ default: 0 })
    public readonly minValue!: number;

    @Prop()
    public readonly limitValue!: number;

    public internalValue: number = this.minValue;

    public inputNumberOptions = {
        precision: 0,
        prefix: '',
        suffix: '',
        decimal: '',
        thousand: '',
        acceptNegative: false,
        isInteger: true
    };

    public get counterClassAttr(): string[] {
        const classes: string[] = [];

        switch (this.size) {
            case ESizes.SMALL: {
                classes.push('form-counter--small');
                break;
            }
            case ESizes.MEDIUM: {
                classes.push('form-counter--medium');
                break;
            }
            default: {
                throw new Error('Invalid products counter size');
            }
        }

        if (this.border) {
            classes.push('form-counter--border');
        }

        if (this.noBorderMd) {
            classes.push('form-counter--no-border-md');
        }

        return classes;
    }

    public get decrementDisabled(): boolean {
        return this.internalValue <= this.minValue;
    }

    public get incrementDisabled(): boolean {
        return this.internalValue >= this.limitValue;
    }

    @Watch('value')
    public onValueChange(newValue: number): void {
        if (newValue === this.internalValue) {
            return;
        }

        this.internalValue = newValue;
    }

    @Watch('internalValue')
    public onInternalValueChange(newValue: number): void {
        if (newValue === this.value) {
            return;
        }

        if (newValue < this.minValue) {
            return;
        }

        this.$emit('input', newValue);
    }

    public mounted(): void {
        this.internalValue = this.value || this.minValue;
    }

    public increment(): void {
        if (this.disabled) {
            return;
        }

        if(this.internalValue >= this.limitValue) {
            return;
        }

        this.internalValue++;
        this.$emit('countChange');
    }

    public decrement(): void {
        if (this.disabled) {
            return;
        }

        this.internalValue--;
        this.$emit('countChange');
    }

    public blurHandler(): void {
        if (this.internalValue < this.minValue) {
            this.internalValue = this.minValue;
        }

        if(this.internalValue >= this.limitValue) {
            this.internalValue = this.limitValue;
        }

        this.$emit('inputBlur', ...arguments);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.input-products-counter {
    &__btn {
        flex: 0 0 auto;
        justify-content: center;
        font-size: 10px;
        height: 40px;
        width: 32px;
        border: 1px solid $color-grey;
        background-color: $color-light-grey;

        &--minus {
            @extend .input-products-counter__btn;
            border-radius: 4px 0 0 4px;
        }

        &--plus {
            @extend .input-products-counter__btn;
            border-radius: 0 4px 4px 0;
        }

        &:disabled {
            cursor: default;

            .input-products-counter__icon {
                opacity: 0.5;
            }
        }
    }
}
</style>
