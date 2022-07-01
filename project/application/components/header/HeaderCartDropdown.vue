<template>
    <div v-if="!emptyBasket" class="header-cart-dropdown--empty">
        {{ $t('HeaderCartButton.emptyBasket') }}
    </div>
    <div class="header-cart-dropdown" v-else>
        <div class="header-cart-dropdown__list">
            <div 
                class="header-cart-dropdown__item" 
                v-for="item in cartItems" 
                :key="item.id"
            >
                <div class="header-cart-dropdown__block">
                    <div class="header-cart-dropdown__name">
                        {{ item.product.name }}
                    </div>
                    <div class="header-cart-dropdown__description">{{ $t('MainProduct.code') }}: {{ item.product.code }}</div>
                    <div class="header-cart-dropdown__description">{{ item.quantity }} {{ $t('CatalogPage.ProductCard.count') }}</div>
                </div>
                <div class="header-cart-dropdown__block">
                    <button class="header-cart-dropdown__icon-container" @click="removeItem(item.id)">
                        <i class="header-cart-dropdown__icon icon icon--close-pink"></i>
                    </button>
                    <div class="header-cart-dropdown__price">{{ $n(item.total, 'currency') }}</div>
                </div>
            </div>
        </div>
        <div class="header-cart-dropdown__footer">
            <div class="header-cart-dropdown__total-container">
                <span class="header-cart-dropdown__total">{{ $t('OrdersPreview.sumText') }}</span>
                <span class="header-cart-dropdown__total--pink">{{ $n(cartTotalSum, 'currency') }}</span>
            </div>
            <NuxtLink 
                :to="localePath('/basket')" 
                class="btn btn--pink header-cart-dropdown__btn"
                @click.native="close"
            >
                {{ $t('MainProduct.buy') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, InjectReactive, Inject, Emit } from 'nuxt-property-decorator';
import { ICartItem } from '~/types/cart.interface';

@Component({})
export default class ComponentHeaderCartButton extends Vue {
    @InjectReactive('HEADER_CART_ITEMS') public cartItems!: ICartItem[];
    @InjectReactive('HEADER_CART_TOTAL_SUM') public cartTotalSum!: number;
    @Inject('HEADER_CART_REMOVE') public removeCartItem!: (id: number) => void;

    public get emptyBasket(): boolean {
        return !!this.cartItems.length;
    }

    @Emit('close')
    public close(): void {}

    public removeItem(id: number): number | void {
        this.removeCartItem(id);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.header-cart-dropdown {
    &--empty {
        padding: 27px 40px 30px 41px;
        color: $color-search-bg;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 22px;
        text-align: center;
    }

    &__item {
        display: flex;
        padding: 12px 20px;
        border-bottom: 1px solid $color-grey;
        width: 100%;
    }

    &__list {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 250px;
    }

    &__icon-container {
        cursor: pointer;
        background-color: transparent;
        outline: none;
        border: none;
        padding: 0;
    }

    &__icon {
        height: 24px;
        width: 24px;
    }

    &__block {
        &:last-child {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            margin-left: auto;
        }
    }

    &__name {
        color: $color-dark-blue;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 17px;
        margin-bottom: 4px;
    }

    &__description {
        color: $color-search-bg;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 18px;
    }

    &__price {
        color: $color-dark-blue;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 19px;
    }

    &__footer {
        padding: 20px;
    }

    &__total-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    &__total {
        font-size: 16px;
        line-height: 22px;
        color: $color-dark-blue;
        font-weight: bold;

        &--pink {
            @extend .header-cart-dropdown__total;
            color: $color-pink;
        }
    }

    &__btn {
        width: 100%;
        font-weight: 600;
    }
}
</style>
