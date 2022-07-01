<template>
    <div class="checkout-order-info card card--shadow">
        <div class="checkout-order-info__head d-none d-lg-flex">
            <div class="checkout-order-info__heading">{{ $t('CheckoutPage.order.title') }}</div>
            <NuxtLink 
                class="btn btn-link btn--label-grey" 
                :class="{'btn-link--disabled': submitStatus}"
                :to="localePath('/basket')"
            >
                {{ $t('CheckoutPage.order.edit') }}
            </NuxtLink>
        </div>
        <div 
            class="checkout-order-info__item" 
            v-for="(val, index) in cartItems" 
            :key="index"
        >
            <div>
                <div class="checkout-order-info__name">{{ val.product.name }}</div>
                <div class="checkout-order-info__code">{{ $t('CheckoutPage.order.code') }}: {{ val.product.code }}</div>
            </div>
            <div class="checkout-order-info__price">{{ $n(val.total, 'currency') }}</div>
        </div>
        <div class="checkout-order-info__conclusion">
            <div class="checkout-order-info__flex">
                <div class="checkout-order-info__price">{{ $t('CheckoutPage.order.delivery') }}</div>
                <div class="checkout-order-info__price">{{ $n(cartTotalShipping, 'currency') }}</div>
            </div>
            <div class="checkout-order-info__flex">
                <div class="checkout-order-info__price">{{ $t('OrdersPreview.vatText') }} (21%)</div>
                <div class="checkout-order-info__price">{{ $n(priceWithoutTax, 'currency') }}</div>
            </div>
        </div>
        <div class="checkout-order-info__total">
            <div class="checkout-order-info__flex">
                <div class="checkout-order-info__total-text">{{ $t('CheckoutPage.order.sum') }}</div>
                <div class="checkout-order-info__total-text checkout-order-info__total-text--pink">{{ $n(cartTotal, 'currency') }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import AccordionTab from '@/components/AccordionTab.vue';
import { ICart, ICartItem, ICartTotals } from '~/types/cart.interface';
import { EStatus } from '~/constants/status';

@Component({
    components: { AccordionTab }
})
export default class ComponentCheckoutOrderInfo extends Vue {
    @InjectReactive('CART_DATA') public cartData!: ICart;
    @InjectReactive('PAYMENT_STATUS') public paymentStatus!: EStatus;

    public get cartItems(): ICartItem[] {
        if(this.cartData && this.cartData.items) {
            return this.cartData?.items;
        }

        return [];
    }

    public get cartTotals(): ICartTotals {
        return this.cartData?.totals ?? {};
    }

    public get cartTotalShipping(): number {
        return this.cartTotals && this.cartTotals?.shipping ? this.cartTotals.shipping : 0;
    }

    public get cartTotal(): number {
        return this.cartTotals && this.cartTotals?.total ? this.cartTotals.total : 0;
    }

    public get priceWithoutTax(): number {
        if(this.cartTotals && this.cartTotals.total && this.cartTotals.taxes) {
            return this.cartTotals.total - this.cartTotals.taxes;
        }

        return 0;
    }

    public get submitStatus(): boolean {
        return this.paymentStatus === EStatus.PROCESSING;
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-order-info {
    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 10px;
        border-bottom: 1px solid $color-lightest-grey;
    }

    &__heading {
        color: $color-dark-blue;
        font-weight: 600;
        font-size: 16px;
    }

    &__item {
        padding: 15px 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $color-lightest-grey;
    }

    &__flex {
        display: flex;
        justify-content: space-between;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__name {
        font-size: 12px;
        line-height: 17px;
        color: $color-dark-blue;
        font-weight: bold;
    }

    &__code {
        font-size: 12px;
        line-height: 17px;
        color: $color-search-bg;
        margin-top: 6px;
    }

    &__price {
        font-size: 14px;
        line-height: 19px;
        color: $color-dark-blue;
        font-weight: bold;
    }

    &__conclusion {
        padding: 15px 10px;
        border-bottom: 1px solid $color-lightest-grey;
        background-color: $color-light-grey;
    }

    &__total {
        padding: 15px 10px;
        background-color: $color-light-grey;
    }

    &__total-text {
        font-size: 16px;
        font-weight: bold;
        color: $color-dark-blue;
        line-height: 22px;

        &--pink {
            color: $color-pink;
        }
    }
}
</style>
