<template>
    <div class="catalog-product-card">
        <div class="catalog-product-card__desktop d-none d-lg-flex">
            <div class="catalog-product-card__body" :class="{ 'catalog-product-card__body--small': false }">
                <div class="catalog-product-card__header">
                    <div class="catalog-product-card__picture">
                        <NuxtLink
                            :to="slug"
                            class="catalog-product-card__link"
                        >
                            <img
                                v-if="isImage"
                                class="img-responsive img-responsive--width img-responsive--height"
                                :src="productData.image"
                                alt=""
                            />
                            <div class="catalog-product-card__empty" v-else>
                                <div class="catalog-product-card__empty-content">
                                    <div class="catalog-product-card__empty-pic"></div>
                                    <div class="catalog-product-card__empty-text">
                                        {{ $t('MainProduct.notImage') }}
                                    </div>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                    <div class="catalog-product-card__information">
                        <NuxtLink :to="slug" class="catalog-product-card__caption" v-html="$sanitize(productName)"></NuxtLink>
                        <div class="catalog-product-card__list">
                            <!-- <div class="catalog-product-card__list-item">
                                {{ $t('MainProduct.code') }}: {{ product.code }}
                            </div> -->
                            <div class="catalog-product-card__list-item">
                                {{ $t('MainProduct.sku') }}: {{ product.code }} <!-- externalCode -->
                            </div>
                            <div class="catalog-product-card__list-item">{{ $t('CatalogPage.ProductCard.balance') }}: {{ stockTotal }} {{ $t('CatalogPage.ProductCard.count') }}.</div>
                        </div>
                    </div>
                    <div class="catalog-product-card__badges">
                        <div 
                            v-if="isBadge" 
                            class="catalog-product-card__badges-item badge badge--brand"
                        >
                            <img
                                class="img-responsive img-responsive--width"
                                :src="productData.manufacturer.image"
                                :alt="productData.manufacturer.name"
                            >
                        </div>
                        <div 
                            class="catalog-product-card__badges-item badge badge--originals"
                        >
                            {{ $t('MainProduct.original') }}
                        </div>
                        <div v-if="isDeposit" :title="$sanitize($t('Badges.warranty_period'))" class="catalog-product-card__badges-item badge badge--waranty">
                            <i class="catalog-product-card__icon icon icon--waranty"></i>
                        </div>
                        <div v-if="isOnSale" :title="$sanitize($t('Badges.discount'))" class="catalog-product-card__badges-item badge badge--sale">
                            <i class="catalog-product-card__icon icon icon--sale"></i>
                        </div>
                    </div>
                </div>
                <div class="catalog-product-card__main">
                    <div class="catalog-product-card__list">
                        <template v-if="isDiscount">
                            <div class="catalog-product-card__list-item">
                                <div class="catalog-product-card__price">{{ $n(product.priceWithTaxDiscount, 'currency') }}</div>
                                <div class="catalog-product-card__description">{{ $t('CatalogPage.ProductCard.withTaxLabel') }}</div>
                            </div>
                            <div class="catalog-product-card__list-item">
                                <div class="catalog-product-card__price">{{ $n(product.priceWithoutTaxDiscount, 'currency') }}</div>
                                <div class="catalog-product-card__price--old">{{ $n(product.priceWithoutTax, 'currency') }}</div>
                                <div class="catalog-product-card__description">{{ $t('CatalogPage.ProductCard.withoutTaxLabel') }}</div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="catalog-product-card__list-item">
                                <div class="catalog-product-card__price">{{ $n(product.priceWithTax, 'currency') }}</div>
                                <div class="catalog-product-card__description">{{ $t('CatalogPage.ProductCard.withTaxLabel') }}</div>
                            </div>
                            <div class="catalog-product-card__list-item">
                                <div class="catalog-product-card__price">{{ $n(product.priceWithoutTax, 'currency') }}</div>
                                <div class="catalog-product-card__description">{{ $t('CatalogPage.ProductCard.withoutTaxLabel') }}</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="catalog-product-card__footer">
                    <InputProductsCounter
                        class="catalog-product-card__counter"
                        :limitValue="stockTotal"
                        :disabled="!disabledCounter"
                        v-model="quantity"
                    />
                    <button
                        :disabled="addToCartStatus || (!getCartToken && addToCartStatus)" 
                        @click="addCart"
                        class="btn btn--pink catalog-product-card__submit"
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
                    <button
                        type="button"
                        class="btn btn--secondary-black-border catalog-product-card__details"
                        @click="toggleDetails"
                        v-if="isDetails"
                    >
                        {{ $t('CatalogPage.ProductCard.buttonDetailText') }}
                        <i class="icon icon--arrow-down-black" :class="{ 'icon--rotate': isDetail }"></i>
                    </button>
                </div>
            </div>
            <div class="catalog-product-card__analogs">
                <CatalogAnalogsList 
                    :analogsList="productData.analogs"
                    @analogHandler="analogHandler"
                >
                </CatalogAnalogsList>
            </div>
            <div v-if="isDetails" class="catalog-product-card__detail">
                <SlideUpDown :active="isDetail" :duration="200">
                    <CatalogCardDetail></CatalogCardDetail>
                </SlideUpDown>
            </div>
        </div>
        <div class="catalog-product-card__mobile d-block d-lg-none">
            <catalog-product-card-mobile
                :product="product"
            >
            </catalog-product-card-mobile>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, mixins, ProvideReactive, InjectReactive, Inject, Watch } from 'nuxt-property-decorator';
import CatalogAnalogsList from '~/components/catalogs/CatalogAnalogsList.vue';
import CatalogCardDetail from '~/components/catalogs/CatalogCardDetail.vue';
import CatalogProductCardMobile from '~/components/catalogs/CatalogProductCardMobile.vue';
import SlideUpDown from 'vue-slide-up-down';
import { FavoriteButton, InputProductsCounter } from '~/components';
import { ICatalogProductAttribute, ICatalogProductFiles, ICatalogProducts, ICatalogVehicle } from '~/types/catalog.interface';
import { EMessageTypes } from '~/constants/message-types';
import { ICartProductData } from '~/types/cart.interface';
import { EStatus } from '~/constants/status';
import MixinWishlistProduct from '~/mixins/wishlist-product';
import { IProductInner, IProductInnerVehicle } from '~/types/product.interface';

@Component({
    components: {
        CatalogAnalogsList,
        CatalogCardDetail,
        CatalogProductCardMobile,
        SlideUpDown,
        FavoriteButton,
        InputProductsCounter
    }
})
export default class CatalogProductCard extends mixins(MixinWishlistProduct) {
    @Inject('ADD_CART_ITEM_SUBMIT') public addCartItem!: (value: ICartProductData) => void;
    @InjectReactive('CART_STATUS') public cartStatus!: EStatus;
    @InjectReactive('CART_TOKEN') public cartToken!: string | null;

    public productData: IProductInner = { ...this.product };

    public quantity: number = 1;
    public isDetail: boolean = false;

    public get productName(): string {
        if(this.productData?.tecDocName) {
            return this.productData?.tecDocName;
        }

        return this.productData.displayName;
    }

    public get isBadge(): boolean {
        return !!this.productData?.manufacturer;
    }

    public get isImage(): boolean {
        return !!(this.productData?.image);
    }

    public get stockTotal(): number {
        return this.productData?.stockTotal >= 0 && this.productData?.stockTotal ? this.productData.stockTotal : 0;
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

    public get isOnSale() : boolean {
        return this.productData?.isOnSale;
    }

    public get isDeposit(): boolean {
        return !!(this.productData.isDeposit && this.productData.deposit?.amount);
    }

    public get isDiscount(): boolean {
        return !!(this.product?.discount);
    }

    @ProvideReactive('CATALOG_PRODUCT_ATTRIBUTES')
    public get productAttributes(): ICatalogProductAttribute[] | [] {
        if(this.productData && this.productData.attributes) {
            return (this.productData.attributes as ICatalogProductAttribute[]);
        }

        return [];
    }

    @ProvideReactive('CATALOG_PRODUCT_VEHICLES')
    public get productVehicles(): IProductInnerVehicle[] | [] {
        if(this.productData && this.productData.vehicles) {
            return (this.productData.vehicles as IProductInnerVehicle[]);
        }

        return [];
    }

    @ProvideReactive('CATALOG_PRODUCT_FILES')
    public get productFiles(): ICatalogProductFiles[] | [] {
        if(this.productData && this.productData.files) {
            return (this.productData.files as ICatalogProductFiles[]);
        }

        return [];
    }

    @ProvideReactive('CATALOG_PRODUCT_SET')
    public get productSet(): IProductInner[] | [] {
        if(this.productData && this.productData.set) {
            return (this.productData.set as IProductInner[]);
        }

        return [];
    }

    @ProvideReactive('CATALOG_ADDITIONAL_ARTICLES')
    public get additionalArticles(): string | null {
        return this.productData?.additionalArticles ?? null;
    }

    @ProvideReactive('CATALOG_PRODUCT_DATA')
    public get provideProductData(): IProductInner {
        return this.productData;
    }

    @Watch('product')
    public watchProduct(val: IProductInner): void {
        this.productData = { ...val }
    }

    public get isDetails(): boolean {
        return !!(
            this.productData.attributes && this.productData.attributes.length || 
            this.productData.vehicles && this.productData.vehicles.length ||
            this.productData.files && this.productData.files.length ||
            this.productData.set && this.productData.set.length ||
            this.productData.additionalArticles
        ) 
    }

    public get slug(): string {
        if(this.productData && this.productData.slug) {
            return `/product/${this.productData.slug}`
        }

        return '/';
    }

    public toggleDetails(): void {
        this.isDetail = !this.isDetail;
    }

    public analogHandler(val: IProductInner): void {
        const { analogs, ...rest } = val;
        this.productData = { ...this.productData, ...rest };
    }

    public addCart(): void {
        if(this.stockTotal > 0) {
            this.addCartItem({ 
                productCode: this.productData.code,
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

.catalog-product-card {
    &__icon {
        width: 20px;
        height: 20px;
    }
    &__link {
        display: block;
        position: relative;
        text-decoration: none;
        max-height: 120px;
        max-width: 120px;
        width: 100%;
        height: 100%;
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

    &__desktop {
        background: $color-white;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid $color-grey;
    }

    &__body {
        flex: 0 1 68%;
        padding: 20px;

        &--small {
            flex-basis: 100%;
        }
    }

    &__header {
        display: flex;
        margin-bottom: 10px;
    }

    &__picture {
        max-width: 120px;
        max-height: 120px;
        width: 100%;
        margin-right: 20px;
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

    &__main {
        margin-bottom: 13px;

        .catalog-product-card__list-item {
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
            @extend .catalog-product-card__price;
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
    }

    &__counter {
        max-width: 96px;
        margin-right: 20px;
    }

    &__submit {
        font-size: 16px;
        min-width: 130px;
        margin-right: 20px;
    }

    &__details {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        margin-left: auto;
        min-width: 116px;
        .icon {
            margin-left: auto;
        }
    }

    &__analogs {
        flex: 0 1 32%;
    }

    &__detail {
        flex: 1;
    }
}
</style>
