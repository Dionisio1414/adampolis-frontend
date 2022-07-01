<template>
    <div class="profile-favourites">
        <FavouritesHeader :wishListCount="wishListCount"></FavouritesHeader>
        <div class="profile-favourites__products">
            <FavouritesProductCard
                class="profile-favourites__card"
                v-for="val in wishList"
                :product="val"
                :key="val.id"
            >
            </FavouritesProductCard>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter, Action, ProvideReactive, Provide } from 'nuxt-property-decorator';
import FavouritesHeader from '~/components/favourites/FavouritesHeader.vue';
import FavouritesProductCard from '~/components/favourites/FavouritesProductCard.vue';
import { IProductInner } from '~/types/product.interface';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import { ICartProductData } from '~/types/cart.interface';

@Component({
    components: {
        FavouritesHeader,
        FavouritesProductCard
    },
    middleware: ['auth-user-only']
})
export default class ProfileSaved extends Vue {
    @Getter('wishlist/getWishListProducts') public wishList!: IProductInner[];

    @Getter('cart/getStatus') public cartStatus!: EStatus;
    @Getter('cart/getToken') public cartToken!: string | null;
    @Getter('cart/getError') public cartError!: Error | null;

    @Action('cart/addCartItem') public addCartItem!: (payload: ICartProductData) => Promise<void>;

    @ProvideReactive('CART_STATUS')
    public get getCartStatus(): EStatus {
        return this.cartStatus;
    }

    @ProvideReactive('CART_TOKEN')
    public get getCartToken(): string | null {
        return this.cartToken;
    }

    @Provide('ADD_CART_ITEM_SUBMIT')
    public async addCartItemSubmit({ productCode, quantity }: ICartProductData): Promise<any> {
        await this.addCartItem({ productCode, quantity });
        if(this.getCartStatus === EStatus.ERROR && this.cartError) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: (this.cartError as any)?.errors.quantity[0]
            });
        } 
    }

    public get wishListCount(): number {
        return this.wishList ? this.wishList.length : 0;
    }

    async asyncData({ store, error }: any): Promise<void> {
        try {
            await store.dispatch('wishlist/fetchWishList');
        } catch (e: any) {
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

.profile-favourites {
    &__card {
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .profile-favourites {
        &__card {
            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }
}
</style>
