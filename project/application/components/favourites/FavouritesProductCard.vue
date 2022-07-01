<template>
    <div class="favourites-product-card">
        <div class="favourites-product-card__block">
            <div class="favourites-product-card__picture">
                <NuxtLink
                    :to="slug"
                    class="favourites-product-card__link"
                >
                    <img
                        v-if="isImage"
                        class="img-responsive img-responsive--width img-responsive--height picture"
                        :src="product.image"
                        alt=""
                    />
                    <div class="favourites-product-card__empty" v-else>
                        <div class="favourites-product-card__empty-content">
                            <div class="favourites-product-card__empty-pic"></div>
                            <div class="favourites-product-card__empty-text">
                                {{ $t('MainProduct.notImage') }}
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
            <div class="favourites-product-card__body">
                <div class="favourites-product-card__header">
                    <div class="favourites-product-card__information">
                        <NuxtLink :to="slug" class="favourites-product-card__caption">{{ product.displayName }}</NuxtLink>
                        <div class="favourites-product-card__list">
                            <div class="favourites-product-card__list-item">
                                {{ $t('MainProduct.code') }}: {{ product.code }}
                            </div>
                            <div class="favourites-product-card__list-item">
                                {{ $t('MainProduct.sku') }}: {{ product.externalCode }}
                            </div>
                            <div class="favourites-product-card__list-item">{{ $t('CatalogPage.ProductCard.balance') }}: {{ stockTotal }} {{ $t('CatalogPage.ProductCard.count') }}.</div>
                        </div>
                        <div class="favourites-product-card__brand d-block d-lg-none">
                            <img
                                class="img-responsive img-responsive--width"
                                :src="require(`@/assets/images/suppliers/bosch.png`)"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="favourites-product-card__badges" v-if="isBadge">
                        <div class="badge badge--brand">
                            <img
                                class="img-responsive img-responsive--width"
                                :src="require(`@/assets/images/suppliers/bosch.png`)"
                                alt=""
                            />
                        </div>
                        <div class="badge badge--originals">{{ $t('MainProduct.original') }}</div>
                        <div class="badge badge--waranty">
                            <img class="img-responsive img-responsive--width" :src="require(`@/assets/images/waranty.svg`)" alt="" />
                        </div>
                        <div class="badge badge--sale">
                            <img class="img-responsive img-responsive--width" :src="require(`@/assets/images/sale.svg`)" alt="" />
                        </div>
                    </div>
                </div>
                <div class="favourites-product-card__main">
                    <div class="favourites-product-card__list">
                        <div class="favourites-product-card__list-item">
                            <div class="favourites-product-card__price">{{ product.priceWithTax.toFixed(2) }}</div>
                            <div class="favourites-product-card__description">{{ $t('CatalogPage.ProductCard.withTaxLabel') }}</div>
                        </div>
                        <div class="favourites-product-card__list-item">
                            <div class="favourites-product-card__price">{{ product.priceWithoutTax.toFixed(2) }}</div>
                            <!-- <div class="favourites-product-card__price--old">2.54 €</div> -->
                            <div class="favourites-product-card__description">{{ $t('CatalogPage.ProductCard.withoutTaxLabel') }}</div>
                        </div>
                    </div>
                </div>
                <div class="favourites-product-card__footer">
                    <InputProductsCounter
                        class="favourites-product-card__counter"
                        :limitValue="stockTotal"
                        :disabled="!disabledCounter"
                        v-model="quantity"
                    />
                    <button 
                        :disabled="addToCartStatus || (!getCartToken && addToCartStatus)" 
                        @click="addCart"
                        class="btn btn--pink favourites-product-card__submit"
                    >
                        {{ $t('MainProduct.addToCart') }}
                    </button>
                    <FavoriteButton 
                        class="favourites-product-card__saved"
                        :disabled="disabledFavoriteButton"
                        :favorite="inWishList" 
                        :isAuthorized="isAuthorized"
                        @toggleFavorite="toggleFavorite"
                    >
                    </FavoriteButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Inject, mixins } from 'nuxt-property-decorator';
import SlideUpDown from 'vue-slide-up-down';
import { FavoriteButton, InputProductsCounter } from '~/components';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import { ICartProductData } from '~/types/cart.interface';
import MixinWishlistProduct from '~/mixins/wishlist-product';

@Component({
    components: {
        SlideUpDown,
        FavoriteButton,
        InputProductsCounter
    }
})
export default class ComponentFavouritesProductCard extends mixins(MixinWishlistProduct) {
    @Inject('ADD_CART_ITEM_SUBMIT') public addCartItem!: (value: ICartProductData) => void;
    @InjectReactive('CART_STATUS') public cartStatus!: EStatus;
    @InjectReactive('CART_TOKEN') public cartToken!: string | null;

    public quantity: number = 1;

    public get isBadge(): boolean {
        return !!this.product?.manufacturer;
    }

    public get isImage(): boolean {
        return this.product?.image ? true : false;
    }

    public get stockTotal(): number {
        return this.product?.stockTotal >= 0 && this.product?.stockTotal ? this.product.stockTotal : 0;
    }

    public get disabledCounter(): boolean {
        return !!(this.stockTotal);
    }

    public get addToCartStatus(): boolean {
        return this.cartStatus === EStatus.PROCESSING;
    }

    public get getCartToken(): boolean {
        return !!this.cartToken;
    }

    public get slug(): string {
        if(this.product && this.product.slug) {
            return `/product/${this.product.slug}`
        }

        return '/';
    }

    public addCart(): void {
        if(this.stockTotal > 0) {
            this.addCartItem({ 
                productCode: this.product.code,
                quantity: this.quantity === 0 ? this.quantity++ : this.quantity
            });
        } else {
            this.$notify({
                type: EMessageTypes.INFO,
                title: `Sandėlyje ${this.stockTotal} vnt`
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.favourites-product-card {
    position: relative;
    &__block {
        background: $color-white;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border: 1px solid $color-grey;
    }

    &__brand {
        max-width: 90px;
    }

    &__body {
        flex: 0 1 100%;
        padding: 20px;
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 1 82%;
        }
    }

    &__header {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }

    &__picture {
        position: relative;
        flex: 0 1 100%;
        padding: 20px 20px 0 20px;
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 1 18%;
            padding: 20px;
        }
        .picture {
            max-height: 120px;
            max-width: 120px;
        }
    }

    &__caption {
        display: block;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        margin-bottom: 10px;
        text-decoration: none;
        color: $color-dark-blue;
    }

    &__list {
        margin-bottom: 15px;
        @media screen and (min-width: $breakpoint-lg) {
            margin-bottom: 0;
        }
    }

    &__list-item {
        font-size: 14px;
        line-height: 19px;
    }

    &__badges {
        position: absolute;
        top: 20px;
        right: 20px;
        .badge {
            margin-left: auto;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
    }

    &__main {
        margin-bottom: 13px;

        .favourites-product-card__list-item {
            &:not(:last-child) {
                margin-bottom: 8px;
            }
        }
    }

    &__price {
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        margin-right: 10px;
        color: $color-pink;

        &--old {
            @extend .favourites-product-card__price;
            text-decoration: line-through;
            color: $color-dark-blue;
        }
    }

    &__description {
        display: inline-block;
        font-size: 14px;
        line-height: 19px;
        color: $color-dark-blue;
    }

    &__footer {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    &__saved {
        order: 2;
        @media screen and (min-width: $breakpoint-lg) {
            order: 3;
        }
    }

    &__counter {
        max-width: 96px;
        margin-right: 20px;
        order: 1;
        @media screen and (min-width: $breakpoint-lg) {
            order: 1;
        }
    }

    &__submit {
        font-size: 16px;
        min-width: 130px;
        order: 3;
        width: 100%;
        margin: 20px 0 0 0;
        @media screen and (min-width: $breakpoint-lg) {
            order: 2;
            width: auto;
            margin: 0 20px 0 0;
        }
    }

    &__empty {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        &-pic {
            background-image: url('~assets/images/not-image-icon.svg');
            background-repeat: no-repeat;
            background-size: cover;
            width: 50px;
            height: 50px;
            margin: 0 auto 5px auto;
        }

        &-text {
            font-size: 12px;
            line-height: 15px;
            text-align: center;
            color: $color-grey;
        }

    }
}
</style>
