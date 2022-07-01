<template>
    <div class="complete-product-card">
        <div class="complete-product-card__content">
            <div class="complete-product-card__header">
                <NuxtLink 
                    class="complete-product-card__picture"
                    :to="slug"
                >
                    <img
                        v-if="isImage"
                        class="img-responsive img-responsive--width"
                        :src="product.image"
                        :alt="product.slug"
                    >
                    <NotImage 
                        class="complete-product-card__not-image"
                        :imageWidth="70"
                        :imageHeight="70"
                        :imageWidthMobile="35"
                        :imageHeightMobile="35"
                        v-else
                    >
                    </NotImage>
                </NuxtLink>

                <div class="complete-product-card__information">
                    <NuxtLink :to="slug" class="complete-product-card__caption">{{ product.displayName || '' }}</NuxtLink>
                    <div class="complete-product-card__list">
                        <div class="complete-product-card__list-item">
                            {{ $t('MainProduct.code') }}: {{ product.code || '' }}
                        </div>
                        <div class="complete-product-card__list-item">
                            {{ $t('MainProduct.sku') }}: {{ product.externalCode || '' }}
                        </div>
                        <div class="complete-product-card__list-item">
                            {{ $t('ProductTabs.itemsTabText') }}: <span class="complete-product-card__list-item--bold">{{ stockTotal }} {{ $t('CatalogPage.ProductCard.count') }}.</span>
                        </div>
                        <div class="complete-product-card__list-item">
                            <span class="complete-product-card__item--link">{{ $t('MainProduct.allBalances') }}</span>
                        </div>
                        <div 
                            class="complete-product-card__badge--brand"
                            v-if="showBrand"
                        >
                            <img
                                class="img-responsive img-responsive--width"
                                :src="product.manufacturer.image"
                                :alt="product.manufacturer.name"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="complete-product-card__footer">
                <div class="complete-product-card__list complete-product-card__prices">
                    <div class="complete-product-card__item">
                        <div class="complete-product-card__price">{{ product.priceWithTax.toFixed(2) }}</div>
                        <div class="complete-product-card__description">
                            {{ $t('MainProduct.withTax') }}
                        </div>
                    </div>
                    <div class="complete-product-card__item">
                        <template v-if="checkPriceWithDiscount">
                            <div class="complete-product-card__price">{{ product.priceWithTaxDiscount.toFixed(2) }}</div>
                            <div class="complete-product-card__price--old">{{ product.priceWithTax.toFixed(2) }}</div>
                        </template>
                        <template v-else>
                            <div class="complete-product-card__price">{{ product.priceWithoutTax.toFixed(2) }}</div>
                        </template>
                        <div class="complete-product-card__description">
                            {{ $t('MainProduct.withoutTax') }}
                        </div>
                    </div>
                </div>
                <div class="complete-product-card__buttons">
                    <InputProductsCounter
                        class="complete-product-card__counter"
                        :limitValue="stockTotal"
                        :disabled="!disabledCounter"
                        v-model="quantity"
                    >
                    </InputProductsCounter>
                    <button 
                        :disabled="addToCartStatus || (!getCartToken && addToCartStatus)" 
                        @click="addToCart"
                        class="d-none d-lg-block btn btn--pink complete-product-card__submit"
                    >
                        {{ $t('MainProduct.addToCart') }}
                    </button>
                    <FavoriteButton
                        :disabled="disabledFavoriteButton"
                        :favorite="inWishList"
                        :isAuthorized="isAuthorized"
                        @toggleFavorite="toggleFavorite"
                    >
                    </FavoriteButton>
                </div>
                <button 
                    :disabled="addToCartStatus || (!getCartToken && addToCartStatus)" 
                    @click="addToCart" 
                    class="d-block d-lg-none btn btn--pink complete-product-card__submit"
                >
                    {{ $t('MainProduct.addToCart') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Inject, InjectReactive, mixins } from 'nuxt-property-decorator';
import { InputProductsCounter, FavoriteButton } from '~/components';
import SlideUpDown from 'vue-slide-up-down';
import MixinWishlistProduct from '~/mixins/wishlist-product';
import { EMessageTypes } from '~/constants/message-types';
import { ICartProductData } from '~/types/cart.interface';
import { EStatus } from '~/constants/status';
import NotImage from '~/components/NotImage.vue';

@Component({
    components: {
        SlideUpDown,
        InputProductsCounter,
        FavoriteButton,
        NotImage
    }
})
export default class CompleteProductCard extends mixins(MixinWishlistProduct) {
    @InjectReactive('CART_STATUS') public cartStatus!: EStatus;
    @InjectReactive('CART_TOKEN') public cartToken!: string | null;

    @Inject('ADD_CART_ITEM_SUBMIT') public addCartItem!: (value: ICartProductData) => void;

    public quantity: number = 1;

    public get stockTotal(): number {
        return this.product?.stockTotal >= 0 && this.product?.stockTotal ? this.product.stockTotal : 0;
    }

    public get isImage(): boolean {
        return !!(this.product?.image);
    }

    public get showBrand(): boolean {
        return !!(this.product?.manufacturer);
    }

    public get disabledCounter(): boolean {
        return !!(this.stockTotal);
    }

    public get slug(): string {
        if(this.product && this.product.slug) {
            return `/product/${this.product.slug}`
        }

        return '/';
    }

    public get checkPriceWithDiscount(): boolean {
        return !!(this.product?.priceWithTaxDiscount);
    }

    public get addToCartStatus(): boolean {
        return this.cartStatus === EStatus.PROCESSING;
    }

    public get getCartToken(): boolean {
        return !!this.cartToken;
    }

    public addToCart(): ICartProductData | void {
         if(this.stockTotal > 0) {
            this.addCartItem({
                productCode: this.product.code,
                quantity: this.quantity === 0 ? this.quantity++ : this.quantity
            });
        } else {
            this.$notify({
                type: EMessageTypes.INFO,
                title: `Sandėlyje ${this.stockTotal} ${this.$t('CatalogPage.ProductCard.count').toString()}.`
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.complete-product-card {
    background: $color-white;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid $color-grey;
    width: 100%;

    &__content {
        display: flex;
        flex-direction: column;
        width: 235px;
        padding: 15px;
    }

    &__header {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
    }

    &__picture {
        max-width: 90px;
        max-height: 90px;
        text-decoration: none;
    }

    &__caption {
        font-size: 16px;
        font-weight: bold;
        line-height: 24px;
        margin-bottom: 10px;
        margin-top: 20px;
        text-decoration: none;
        color: $color-dark-blue;
    }

    &__item {
        font-size: 14px;
        line-height: 21px;
        color: $color-dark-blue;

        &--bold {
            font-weight: bold;
        }

        &--link {
            color: $color-pink;
            font-size: 12px;
            letter-spacing: 0;
            line-height: 17px;
            text-decoration: underline;
            cursor: pointer;
        }
    }

    &__badges {
        margin-left: auto;

        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    &__badge {
        background-color: $color-accent-grey;
        font-size: 12px;
        line-height: 18px;
        line-height: 1;
        border-radius: 4px;
        padding: 3px 10px;
        text-align: center;
        width: max-content;

        &--brand {
            max-width: 90px;
            max-height: 20px;
            margin-top: 15px;
        }
    }

    &__list-item {
        line-height: 18px;
    }

    &__footer {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
    }

    &__counter {
        max-width: 96px;
        margin-right: 20px;
        height: max-content;
    }

    &__buttons {
        display: flex;
        margin-top: 20px;
    }

    &__submit {
        font-size: 16px;
        min-width: 130px;
        margin-top: 20px;

        // margin-right: 20px;
    }

    &__like {
        min-height: 40px;
    }

    &__details {
        display: inline-flex;
        align-items: center;
        font-size: 16px;
        margin-left: auto;
        min-width: 116px;
        .icon {
            margin-left: auto;
        }
    }

    &__price {
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        margin-right: 3px;
        margin-top: 8px;
        color: $color-pink;

        &:first-child {
            margin-top: 0;
        }

        &:last-child {
            margin-bottom: 12px;
        }

        &--old {
            @extend .complete-product-card__price;
            text-decoration: line-through;
            color: $color-dark-blue;
        }
    }

    &__description {
        display: inline-block;
        font-size: 14px;
        line-height: 19px;
        color: $color-dark-blue;

        .card__badge {
            padding: 0 8px 2px 10px;
            font-size: 12px;
            color: $color-default;
            background-color: $color-accent-grey;
            border-radius: 4px;
            margin-left: 10px;
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .complete-product-card {
        &__content {
            padding: 20px;
            width: 100%;
        }
        &__header {
            flex-direction: row;
        }

        &__picture {
            max-width: 120px;
            max-height: 120px;
            margin-right: 20px;
        }

        &__caption {
            margin-top: 00px;
            font-size: 18px;
        }

        &__prices {
            margin-top: 10px;
        }

        &__submit {
            margin-right: 20px;
            margin-top: 0;
        }

        &__footer {
            margin-top: 12px;
        }

        &__badge {
            &--brand {
                margin-top: 12px;
            }
        }

        &__buttons {
            margin-top: 8px;
        }
    }
}
</style>
