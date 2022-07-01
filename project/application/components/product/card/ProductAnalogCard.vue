<template>
    <div class="product-analog-card card card--bordered">
        <NuxtLink :to="slug" class="product-analog-card__title text text--xs text--600">{{ analog.displayName }}</NuxtLink>
        <div class="product-analog-card__code">
            <span class="text text--xxs">{{ $t('MainProduct.code') }}: {{ analog.code }}</span>
            <span class="text text--xxs">{{ stockTotal }} {{ $t('MainProduct.quantity') }}</span>
        </div>
        <div
            class="product-analog-card__analog  card card--shadow flex"
            :class="{ 'product-analog-card__analog--active': true }"
        >
            <div class="product-analog-card__price ">{{ $n(analog.priceWithoutTax, 'currency') }}</div>
            <div class="product-analog-card__block">
                <div v-if="isImage" class="product-analog-card__brand">
                    <img
                        class="product-analog-card__image"
                        :src="analog.manufacturer.image"
                        :alt="analog.manufacturer.name"
                    >
                </div>
                <!-- <span class="text text--xxs">{{ 0 }} {{ $t('MainProduct.quantity') }}.</span> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { IProductInner } from '~/types/product.interface';

@Component({})
export default class ComponentProductAnalogCard extends Vue {
    @Prop({ required: true }) public analog!: IProductInner;

    public get stockTotal(): number {
        return this.analog?.stockTotal >= 0 && this.analog?.stockTotal ? this.analog.stockTotal : 0;
    }

    public get isImage(): boolean {
        return !!(this.analog?.manufacturer?.image);
    }

    public get slug(): string {
        if(this.analog?.slug) {
            return `/product/${this.analog.slug}`
        }

        return '/';
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product-analog-card {
    padding: 15px;
    min-height: 151px;
    display: flex;
    flex-direction: column;

    &__title {
        text-decoration: none;
        color: $color-dark-blue;
    }

    &__code {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        span {
            color: $color-search-bg;
        }
    }

    &__analog {
        margin-top: auto;

        &--active {
            border: 2px solid $color-accent-orange;

            .product-analog-card__price {
                background-color: $color-accent-orange;
            }
        }
    }

    &__price {
        background-color: $color-light-grey;
        padding: 9px 15px;
        min-width: 81px;
        font-weight: bold;
        white-space: nowrap;
        color: $color-dark-blue;
    }

    &__block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        width: 100%;
        span {
            color: $color-search-bg;
        }
    }

    &__image {
        display: flex;
        max-width: 80px;
    }
}

@media (min-width: $breakpoint-lg) {
    .product-analog-card {
        min-height: 161px;
        padding: 20px;
    }
}
</style>
