<template>
    <div class="catalog-product-card-mobile">
        <div class="catalog-product-card-mobile__wrapper">
            <div class="catalog-product-card-mobile__header">
                <div class="catalog-product-card-mobile__picture">
                   <NuxtLink
                        :to="slug"
                        class="catalog-product-card-mobile__link"
                    >
                        <img
                            v-if="isImage"
                            class="img-responsive img-responsive--width img-responsive--height"
                            :src="product.image"
                            alt=""
                        >
                        <div class="catalog-product-card-mobile__empty" v-else>
                            <div class="catalog-product-card-mobile__empty-content">
                                <div class="catalog-product-card-mobile__empty-pic"></div>
                                <div class="catalog-product-card-mobile__empty-text">
                                    {{ $t('MainProduct.notImage') }}
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <div class="catalog-product-card-mobile__badges">
                    <div class="catalog-product-card-mobile__badges-item badge badge--originals">{{ $t('MainProduct.original') }}</div>
                    <div v-if="isDeposit" :title="$sanitize($t('Badges.warranty_period'))" class="catalog-product-card-mobile__badges-item badge badge--waranty">
                        <i class="catalog-product-card-mobile__icon icon icon--waranty"></i>
                    </div>
                    <div v-if="isOnSale" :title="$sanitize($t('Badges.discount'))" class="catalog-product-card-mobile__badges-item badge badge--sale">
                        <i class="catalog-product-card-mobile__icon icon icon--sale"></i>
                    </div>
                </div>

            </div>
            <div class="catalog-product-card-mobile__main">
                <div class="catalog-product-card-mobile__information">
                    <NuxtLink :to="slug" class="catalog-product-card-mobile__caption" v-html="$sanitize(productName)"></NuxtLink>
                    <div class="catalog-product-card-mobile__list">
                        <!-- <div class="catalog-product-card-mobile__list-item">
                            {{ $t('MainProduct.code') }}: {{ product.code }}
                        </div> -->
                        <div class="catalog-product-card-mobile__list-item">
                            {{ $t('MainProduct.sku') }}: {{ product.code }} <!-- externalCode -->
                        </div>
                        <div class="catalog-product-card-mobile__list-item">{{ $t('CatalogPage.ProductCard.balance') }}: {{ stockTotal }} {{ $t('CatalogPage.ProductCard.count') }}.</div>
                    </div>
                </div>
                <div class="catalog-product-card-mobile__badge--brand" v-if="isBadge">
                    <img
                        class="img-responsive img-responsive--width"
                        :src="product.manufacturer.image"
                        :alt="product.manufacturer.name"
                    >
                </div>
                <div class="catalog-product-card-mobile__list">
                    <template v-if="isDiscount">
                        <div class="catalog-product-card-mobile__list-item">
                            <div class="catalog-product-card-mobile__price">{{ $n(product.priceWithTaxDiscount, 'currency') }}</div>
                            <div class="catalog-product-card-mobile__description">{{ $t('CatalogPage.ProductCard.withTaxLabel') }}</div>
                        </div>
                        <div class="catalog-product-card-mobile__list-item catalog-product-card-mobile__list-item--price">
                            <div class="catalog-product-card-mobile__price">{{ $n(product.priceWithoutTaxDiscount, 'currency') }}</div>
                            <div class="catalog-product-card-mobile__price--old">{{ $n(product.priceWithoutTax, 'currency') }}</div>
                            <div class="catalog-product-card-mobile__description">{{ $t('CatalogPage.ProductCard.withoutTaxLabel') }}</div>
                        </div>
                    </template>
                    <template v-else>           
                        <div class="catalog-product-card-mobile__list-item">
                            <div class="catalog-product-card-mobile__price">{{ $n(product.priceWithTax, 'currency') }}</div>
                            <div class="catalog-product-card-mobile__description">{{ $t('CatalogPage.ProductCard.withTaxLabel') }}</div>
                        </div>
                        <div class="catalog-product-card-mobile__list-item catalog-product-card-mobile__list-item--price">
                            <div class="catalog-product-card-mobile__price">{{ $n(product.priceWithoutTax, 'currency') }}</div>
                            <div class="catalog-product-card-mobile__description">{{ $t('CatalogPage.ProductCard.withoutTaxLabel') }}</div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="catalog-product-card-mobile__footer">
                <div class="catalog-product-card-mobile__buttons">
                    <InputProductsCounter
                        class="catalog-product-card-mobile__counter"
                        :limitValue="stockTotal"
                        :disabled="!disabledCounter"
                        v-model="quantity"
                    />
                    <FavoriteButton
                        :disabled="disabledFavoriteButton"
                        :favorite="inWishList"
                        :isAuthorized="isAuthorized"
                        @toggleFavorite="toggleFavorite"
                    >
                    </FavoriteButton>
                </div>
                <button @click="addCart" class="btn btn--pink catalog-product-card-mobile__submit">
                    {{ $t('MainProduct.addToCart') }}
                </button>
            </div>
        </div>
        <NuxtLink 
            class="catalog-product-card-mobile__analogs"
            :to="slug"
            tag="div"
        >
            {{ $t('MainProduct.showAnalogs') }} {{ `(${product.analogs.length})` }}
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import { Component, mixins, Inject, InjectReactive } from 'nuxt-property-decorator';
import { FavoriteButton, InputProductsCounter } from '~/components';
import { ICatalogProducts } from '~/types/catalog.interface';
import { ICartProductData } from '~/types/cart.interface';
import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';
import MixinWishlistProduct from '~/mixins/wishlist-product';

@Component({
    components: {
        FavoriteButton,
        InputProductsCounter
    }
})
export default class CatalogProductCard extends mixins(MixinWishlistProduct) {
    @Inject('ADD_CART_ITEM_SUBMIT') public addCartItem!: (value: ICartProductData) => void;
    @InjectReactive('CART_STATUS') public cartStatus!: EStatus;
    @InjectReactive('CART_TOKEN') public cartToken!: string | null;

    public quantity: number = 1;

    public get productName(): string {
        if(this.product?.tecDocName) {
            return this.product?.tecDocName;
        }

        return this.product.displayName;
    }

    public get isBadge(): boolean {
        return !!this.product?.manufacturer;
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

    public get isImage(): boolean {
        return this.product?.image ? true : false;
    }

    public get slug(): string {
        if(this.product && this.product.slug) {
            return `/product/${this.product.slug}`
        }

        return '/';
    }

    public get isOnSale() : boolean {
        return this.product?.isOnSale;
    }

    public get isDeposit(): boolean {
        return !!(this.product.isDeposit && this.product.deposit?.amount);
    }

    public get isDiscount(): boolean {
        return !!(this.product?.discount);
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

.catalog-product-card-mobile {
    background: $color-white;
    border: 1px solid $color-grey;
    border-radius: 0 0 4px 4px;

    &__icon {
        width: 20px;
        height: 20px;
    }

    &__link {
        display: block;
        position: relative;
        text-decoration: none;
        width: 90px;
        height: 90px;
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

    &__wrapper {
        padding: 10px 10px 20px 10px;
        width: 100%;
    }

    &__header {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }

    &__picture {
        max-width: 90px;
        max-height: 90px;
        margin-right: 20px;
        width: 100%;
    }

    &__caption {
        display: block;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        margin-bottom: 10px;
        text-decoration: none;
        color: $color-dark-blue;
        text-transform: lowercase;
        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__list-item {
        font-size: 14px;
        line-height: 19px;
        margin-bottom: 4px;

        &--price {
            margin-top: 10px;
        }
    }

    &__badges {
        margin-left: auto;
        &-item {
            margin-left: auto;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
    }

    &__badge--brand {
        max-width: 100px;
        margin-bottom: 15px;
    }

    &__main {
        margin-bottom: 13px;

        .catalog-product-card-mobile__list-item {
            &:not(:last-child) {
                margin-bottom: 3px;
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
            @extend .catalog-product-card-mobile__price;
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
        flex-direction: column;
        margin-top: 20px;
    }

    &__counter {
        max-width: 96px;
        margin-right: 20px;
    }

    &__submit {
        font-size: 16px;
        min-width: 130px;
        margin-right: 20px;
        width: 100%;
    }

    &__buttons {
        display: flex;
        margin-bottom: 20px;
    }

    &__analogs {
        padding: 15px;
        background-color: $color-dark-grey;
        color: $color-pink;
        text-align: center;
        text-decoration: underline;
        border: 1px solid $color-grey;
        border-radius: 0 0 4px 4px;
    }

    &__information {
        margin-bottom: 15px;
    }
}
</style>
