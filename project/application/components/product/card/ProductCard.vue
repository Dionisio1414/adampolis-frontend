<template>
    <div class="product-card card card--bordered">
        <div class="product-card__swiper">
            <div class="product-card__mobile-head d-block d-lg-none">
                <div class="product-card__name text text--l text--bold" v-html="$sanitize(productName)">
                </div>
                <p class="product-card__description product-card__description--mobile text text--s">
                    {{ $t('MainProduct.sku') }}: {{ product.code || '' }}
                </p>
            </div>
            <ProductCardSlider
                v-if="imagelList.length"
                :images="imagelList"
            >
            </ProductCardSlider>
            <div class="product-card-picture" v-else>
                <div class="product-card-picture__content">
                    <div class="product-card-picture__pic"></div>
                    <div class="product-card-picture__text">
                        {{ $t('MainProduct.notImage') }}
                    </div>
                </div>
            </div>
            <div class="product-card__badges d-none d-lg-block">
                <div class="product-card__badge badge badge--originals">{{ $t('MainProduct.original') }}</div>
                <div v-if="isDeposit" :title="$sanitize($t('Badges.warranty_period'))" class="product-card__badge badge badge--waranty">
                    <i class="product-card__icon icon icon--waranty"></i>
                </div>
                <div v-if="isOnSale" :title="$sanitize($t('Badges.discount'))" class="product-card__badge badge badge--sale">
                    <i class="product-card__icon icon icon--sale"></i>
                </div>
            </div>
        </div>
        <div class="product-card__info">
            <img
                v-if="showBrand"
                class="product-card__brand d-none d-lg-block"
                :src="product.manufacturer.image"
                alt=""
            />
            <div class="d-none d-lg-block product-card__name text text--l text--bold" v-html="$sanitize(productName)"></div>
            <div>
                <!-- <p class="product-card__description text text--s">{{ $t('MainProduct.code') }}: {{ product.code || '' }}</p> -->
                <p class="product-card__description text text--s">{{ $t('MainProduct.sku') }}: {{ product.code || '' }}</p>
                <p class="product-card__description text text--s">{{ $t('ProductTabs.itemsTabText') }}: {{ stockTotal }} vnt.</p>
            </div>

            <img
                v-if="showBrand"
                class="product-card__brand d-block d-lg-none"
                :src="product.manufacturer.image"
                alt=""
            />

            <div>
                <template v-if="isDiscount">
                    <div class="product-card__prices">
                        <span class="product-card__price product__price">{{ $n(product.priceWithoutTaxDiscount, 'currency') }}</span>
                        <span class="product-card__price product__price product__price--old">{{ $n(product.priceWithoutTax, 'currency') }}</span>
                        <span class="product-card__price text text--s">{{ $t('MainProduct.withoutTax') }}</span>
                    </div>
                    <div class="product-card__prices">
                        <span class="product-card__price product-card__price--small product__price">{{ $n(product.priceWithTaxDiscount, 'currency') }}</span>
                        <span class="product-card__price text text--xs">{{ $t('MainProduct.withTax') }}</span>
                    </div>
                </template>
                <template v-else>
                    <div class="product-card__prices">
                        <span class="product-card__price product__price">{{ $n(product.priceWithoutTax, 'currency') }}</span>
                        <span class="product-card__price text text--s">{{ $t('MainProduct.withoutTax') }}</span>
                    </div>
                    <div class="product-card__prices">
                        <span class="product-card__price product-card__price--small product__price">{{ $n(product.priceWithTax, 'currency') }}</span>
                        <span class="product-card__price text text--xs">{{ $t('MainProduct.withTax') }}</span>
                    </div>
                </template>
            </div>
            <div class="flex product-card__buttons">
                <InputProductsCounter 
                    class="product-card__counter"
                    :limitValue="stockTotal"
                    :disabled="!disabledCounter"
                    v-model="quantity"
                >
                </InputProductsCounter>
                <button class="d-none d-lg-block product-card__btn--pink btn btn--pink" @click="addToCart">
                    {{ $t('MainProduct.addToCart') }}
                </button>
                <FavoriteButton 
                    class="product-card__favorite"
                    :disabled="disabledFavoriteButton"
                    :favorite="inWishList"
                    :isAuthorized="isAuthorized"
                    @toggleFavorite="toggleFavorite"
                >
                </FavoriteButton>
            </div>

            <button @click="addToCart" class="d-block d-lg-none product-card__btn--pink btn btn--pink">
                {{ $t('MainProduct.addToCart') }}
            </button>

            <div>
                <!-- <div class="product-card__advantages">
                    <i class="product-card__icon icon icon--waranty-grey"></i>
                    <span class="product-card__text text text--xs">6 mėn. {{ $t('ProductInner.warranty') }}</span>
                </div> -->
                <div v-if="isQuantityPerPackage" class="product-card__advantages">
                    <i class="product-card__icon icon icon--items-grey"></i>
                    <span class="product-card__text text text--xs">{{ $t('ProductInner.minPurchaseQuantity') }} {{ product.quantityPerPackage }} {{ $t('MainProduct.quantity') }}.</span>
                </div>
                <div v-if="isDeposit" class="product-card__advantages">
                    <i class="product-card__icon icon icon--deposit-grey"></i>
                    <span class="product-card__text text text--xs">{{ $t('ProductInner.valueOfDeposit') }} {{ $n(product.deposit.amount, 'currency') }}</span>
                </div>
            </div>

            <div class="flex product-card__buttons">
                <button class="product-card__btn btn btn--secondary-black-border">
                    {{ $t('ProductInner.aboutProduct') }}
                </button>
                <button class="product-card__btn btn btn--secondary-black-border">
                    {{ $t('ProductInner.foundCheaper') }}
                </button>
                <button 
                    @click="analogsHandler"
                    v-if="analogsList && analogsList.length" 
                    class="product-card__btn btn btn--secondary-black-border"
                >
                    {{ $t('ProductInner.analogs') }} {{ `(${analogsList.length})` }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, mixins, Prop } from 'nuxt-property-decorator';
import { InputProductsCounter, FavoriteButton } from '~/components';
import ProductCardSlider from './ProductCardSlider.vue';
import { ICartProductData } from '~/types/cart.interface';
import { EMessageTypes } from '~/constants/message-types';
import MixinWishlistProduct from '~/mixins/wishlist-product';
import { IProductInner } from '~/types/product.interface';

@Component({
    components: {
        InputProductsCounter,
        FavoriteButton,
        ProductCardSlider,
    }
})
export default class ComponentProductCard extends mixins(MixinWishlistProduct) {
    @Prop({ required: true }) public analogsList!: IProductInner;

    public quantity: number = 1;

    public get productName(): string {
        if(this.product?.tecDocName) {
            return this.product?.tecDocName;
        }

        return this.product.displayName;
    }

    public get showSlider(): boolean {
        return !!this.product.images;
    }

    public get showBrand(): boolean {
        return !!this.product?.manufacturer;
    }

    public get imagelList(): string[] | [] {
        return this.product?.images ? this.product?.images : [];
    }

    public get stockTotal(): number {
        return this.product?.stockTotal >= 0 && this.product?.stockTotal ? this.product.stockTotal : 0;
    }

    public get isDiscount(): boolean {
        return !!(this.product?.discount);
    }

    public get disabledCounter(): boolean {
        return !!(this.stockTotal);
    }

    public get isOnSale() : boolean {
        return this.product?.isOnSale;
    }

    public get isDeposit(): boolean {
        return !!(this.product.isDeposit && this.product.deposit?.amount);
    }
    
    public get isQuantityPerPackage(): boolean {
        return !!(this.product.quantityPerPackage);
    }

    @Emit('anchorScroll')
    public analogsHandler(): void {}

    @Emit('addToCart')
    public addToCartHandler(): ICartProductData {
        return {
            productCode: this.product.code,
            quantity: this.quantity
        }
    }

    public addToCart(): ICartProductData | void {
         if(this.stockTotal > 0) {
            this.addToCartHandler();
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
@import '@/assets/styles/variables.scss';
.product-card {
    display: flex;
    flex-direction: column;

    &-picture {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 382px;

        &__pic {
            background-image: url('~assets/images/not-image-icon.svg');
            background-repeat: no-repeat;
            background-size: cover;
            width: 100px;
            height: 100px;
            margin: 0 auto 15px auto;
        }

        &__text {
            font-size: 16px;
            font-weight: bold;
            line-height: 22px;
            text-align: center;
            color: $color-grey;
        }

    }

    &__mobile-head {
        border-bottom: 1px solid rgba($color-grey, 0.6);
        padding: 15px;
        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__swiper {
        position: relative;
        border-right: 1px solid rgba($color-grey, 0.6);
        width: 100%;
    }

    &__info {
        position: relative;
        padding: 30px 15px 15px 15px;
        width: 100%;
    }

    &__description {
        &:not(:last-child) {
            margin-bottom: 9px;
        }

        &:last-child {
            margin-bottom: 20px;
        }

        &--mobile {
            color: $color-search-bg;
            font-size: 14px;
        }
    }

    &__name {
        font-size: 18px;
        margin-bottom: 15px;
        color: $color-dark-blue;
        line-height: 28px;
        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__prices {
        margin-top: 10px;
    }

    &__price {
        margin-right: 10px;
        &--small {
            font-size: 18px;
        }
    }

    &__btn {
        margin: 6px 0px;

        &:first-child {
            margin-left: 0;
        }

        &--pink {
            margin: 0 0 20px 0;
            width: 100%;
        }
    }

    &__counter {
        max-width: 96px;
    }

    &__buttons {
        display: flex;
        margin: 10px 0 20px 0;

        &:last-child {
            flex-direction: column;
            margin-top: 20px;
            margin-bottom: 0;
        }
    }

    &__text {
        &:not(:last-child) {
            margin-bottom: 7px;
        }

        margin-left: 15px;
    }

    &__icon {
        width: 20px;
        height: 20px;
    }

    &__advantages {
        display: flex;
        align-items: center;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__brand {
        max-width: 99px;
        margin-bottom: 20px;
    }

    &__badges {
        position: absolute;
        left: 30px;
        top: 30px;
        z-index: 10;
    }

    &__badge {
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__favorite {
        width: max-content;
        margin-left: 18px;
    }
}

@media (min-width: $breakpoint-lg) {
    .product-card {
        flex-direction: row;

        &-picture {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            min-height: unset;
        }

        &__info {
            padding: 15px;
        }

        &__name {
            font-size: 24px;
            line-height: 33px;
            font-weight: bold;
            margin-bottom: 16px;
        }

        &__buttons {
            flex-direction: row;
            margin: 24px 0 30px 0;

            &:last-child {
                flex-direction: row;
                margin-top: 30px;
                margin-bottom: 0;
            }
        }

        &__swiper {
            width: 477px;
            min-width: 477px;
        }

        &__info {
            padding: 30px;
        }

        &__btn {
            margin: 0 10px;
            padding-left: 32px;
            padding-right: 32px;

            &:first-child {
                margin-left: 0;
            }

            &--pink {
                margin: 0 20px;
                width: 184px;
            }
        }

        &__brand {
            position: absolute;
            right: 40px;
            top: 35px;
            max-width: 99px;
        }

        &__advatanges {
            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }

        &__favorite {
            margin-left: 0;
        }
    }
}
</style>
