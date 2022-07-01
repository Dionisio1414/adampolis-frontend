<template>
    <main class="page product">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="product__head">
                        <BreadCrumbs 
                            class="product__breadcrumbs"
                            :breadcrumbs="breadcrumbs"
                            :isHomeLink="isHomeLink"
                        >
                        </BreadCrumbs>
                        <button type="button" class="d-none d-lg-flex product__back btn btn--link" @click="$router.back()">
                            <i class="product__icon icon icon--arrow-left"></i>
                            <span>
                                {{ $t('Cart.continueSearching') }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <ProductCard 
                        class="product__card"
                        :product="product"
                        :analogsList="analogsList"
                        @addToCart="addToCart"
                        @anchorScroll="anchorScroll"
                    >
                    </ProductCard>
                    <ProductDetailsMobile 
                        v-if="isDetails && isMobile"
                    >
                    </ProductDetailsMobile>
                    <ProductDetails 
                        v-if="isDetails && !isMobile"
                    >
                    </ProductDetails>
                    <ProductAnalogs 
                        v-if="analogsList && analogsList.length"
                        :analogsList="analogsList" 
                        ref="analogsContainer"
                        class="product__analogs"
                    >
                    </ProductAnalogs>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { Component, mixins, Getter, ProvideReactive, Action, Provide } from 'nuxt-property-decorator';
import BreadCrumbs from '~/components/BreadCrumbs.vue';
import ProductCard from '~/components/product/card/ProductCard.vue';
import ProductDetails from '~/components/product/ProductDetails.vue';
import ProductDetailsMobile from '~/components/product/ProductDetailsMobile.vue';
import ProductAnalogs from '~/components/product/ProductAnalogs.vue';
import MixinWindowSize from '~/mixins/window-size';
import { IProductInner, IProductInnerAttribute, IProductInnerFile, IProductInnerStock, IProductInnerVehicle } from '~/types/product.interface';
import { IBreadcrumbs } from '~/types/breadcrumbs.interface';
import { ICartProductData } from '~/types/cart.interface';
import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';
import { MODAL_CONFIG } from '@/constants/modalConfig';
import AddToCartPopup from '~/components/cart/AddToCartPopup.vue';

@Component({
    components: {
        BreadCrumbs,
        ProductCard,
        ProductDetails,
        ProductDetailsMobile,
        ProductAnalogs,
        AddToCartPopup
    }
})
export default class PageProduct extends mixins(MixinWindowSize) {
    @Getter('cart/getStatus') public cartStatus!: EStatus;
    @Getter('cart/getError') public cartError!: any;
    @Getter('cart/getToken') public cartToken!: string | null;

    @Getter('page-product/getProduct') public product!: IProductInner;

    @Action('cart/addCartItem') public addCartItem!: (payload: ICartProductData) => Promise<void>;
    
    public $modal: any;
    public isHomeLink: boolean = false;

    @Provide('ADD_CART_ITEM_SUBMIT')
    public async addToCartSimple({ productCode, quantity }: ICartProductData): Promise<any> {
        await this.addCartItem({ productCode, quantity });
        if(this.cartStatus === EStatus.ERROR && this.cartError) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: (this.cartError as any)?.message
            });
        }
    }

    public async addToCart({ productCode, quantity }: ICartProductData): Promise<any> {
        await this.addCartItem({ productCode, quantity });
        if(this.cartStatus === EStatus.ERROR && this.cartError) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: (this.cartError as any)?.message
            });
        } else {
            this.$modal.show(
                AddToCartPopup, 
                { 
                    modal: this.$modal
                }, 
                { ...MODAL_CONFIG, maxWidth: 590 }
            );
        }
    }

    @ProvideReactive('PRODUCT_INNER_ATTRIBUTES')
    public get attributesList(): IProductInnerAttribute[] | [] {
        return this.product.attributes ?? [];
    }

    @ProvideReactive('PRODUCT_INNER_VEHICLES')
    public get vehiclesList(): IProductInnerVehicle[] | [] {
        return this.product.vehicles ?? [];
    }

    @ProvideReactive('PRODUCT_INNER_FILES')
    public get filesList(): IProductInnerFile[] | [] {
        return this.product.files ?? [];
    }

    @ProvideReactive('PRODUCT_INNER_STOCK')
    public get stockList(): IProductInnerStock[] | [] {
        return this.product.stock ?? [];
    }

    @ProvideReactive('PRODUCT_INNER_SET')
    public get setList(): IProductInner[] {
        return this.product?.set ?? [];
    }

    @ProvideReactive('PRODUCT_INNER_ADDITIONAL_ARTICLES')
    public get additionalArticles(): string | null {
        return this.product?.additionalArticles ?? null;
    }

    @ProvideReactive('CART_STATUS')
    public get getCartStatus(): EStatus {
        return this.cartStatus;
    }

    @ProvideReactive('CART_TOKEN')
    public get getCartToken(): string | null {
        return this.cartToken;
    }

    @ProvideReactive('PRODUCT_DATA')
    public get productData(): IProductInner {
        return this.product;
    }

    public get breadcrumbs(): IBreadcrumbs[] | [] {
        const taxonTitle: IBreadcrumbs[] = [
            {
                key: this.product.taxon.name,
                title: this.product.taxon.name,
                link: `/catalog/${this.product.taxon.slug}`
            },
            {
                key: this.product.displayName,
                title: this.product.displayName,
                link: `/catalog/${this.product.slug}`
            },
        ],
        breadcrumbs = (this.product.taxon.breadcrumbs || []).map(item => ({
            key: item.id,
            title: item.name,
            link: `/catalog/${item.slug}`
        })).sort((a, b) => a.key - b.key);

        return [  ...breadcrumbs, ...taxonTitle ];
    }

    public get analogsList(): IProductInner[] {
        return this.product?.analogs ?? [];
    }

    public get isDetails(): boolean {
        return !!(
            this.product.attributes && this.product.attributes.length || 
            this.product.vehicles && this.product.vehicles.length ||
            this.product.files && this.product.files.length ||
            this.product.stock && this.product.stock.length ||
            this.product.set && this.product.set.length ||
            this.product.additionalArticles
        ) 
    }

    public anchorScroll(): void {
        const el = (this.$refs.analogsContainer as Vue).$el;
        el && el.scrollIntoView({ behavior: "smooth" });
    }

    async asyncData({ params, store, error }: any): Promise<void> {
        try {
            const { pathMatch:slug } = params;
            await store.dispatch('page-product/fetchProduct', slug);
        } catch(e: any) {
            if(e?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(e);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product {
    padding-bottom: 80px;

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__card {
        margin-bottom: 30px;
    }

    &__analogs {
        margin-top: 40px;
    }

    &__back {
        display: flex;
        align-items: center;
    }

    &__icon {
        width: 20px;
        height: 20px;
    }
}
</style>
