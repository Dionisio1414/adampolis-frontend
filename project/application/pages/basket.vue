<template>
    <main class="page page-basket">
        <div class="container">
            <BasketHeader></BasketHeader>
            <BasketBlock
                :status="status"
                :isAuthorized="isAuthorized"
                :cartItems="cartItems"
                :cartQuantity="cartQuantity"
                :cartTotals="cartTotals"
                @changeItem="changeItem"
                @removeItem="removeItem"
            >
            </BasketBlock>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter, Action } from 'nuxt-property-decorator';
import BasketHeader from '~/components/basket/BasketHeader.vue';
import BasketBlock from '~/components/basket/BasketBlock.vue';
import { ICart, ICartItem, ICartProductChangeData, ICartTotals } from '~/types/cart.interface';
import { EStatus } from '~/constants/status';

@Component({
    components: {
        BasketHeader,
        BasketBlock
    }
})
export default class PageBasket extends Vue {
    @Getter('cart/getCartData') public cartData!: ICart;
    @Getter('cart/getStatus') public status!: EStatus;
    @Getter('auth/isAuthorized') public isAuthorized!: boolean;
    @Action('cart/changeQuantity') public changeQuantity!: (data: ICartProductChangeData) => Promise<void>;
    @Action('cart/removeCartItem') public removeCartItem!: (id: number) => Promise<void>;

    public get cartItems(): ICartItem[] {
        if(this.cartData && this.cartData.items) {
            return this.cartData?.items;
        }

        return [];
    }

    public get cartQuantity(): number {
        if(this.cartData?.items.length && this.cartData) {
            return this.cartData?.items.reduce((sum, { quantity }) => {
                return sum + quantity;
            }, 0);
        } 

        return 0;
    }

    public get cartTotals(): ICartTotals {
        return this.cartData?.totals ?? {};
    }

    public changeItem({ id, quantity }: ICartProductChangeData): void {
        this.changeQuantity({ id, quantity })
    }

    public removeItem(id: number): void {
        this.removeCartItem(id);
    }

    async asyncData({ store, error }: any): Promise<void> {
        try {
            await store.dispatch('cart/fetchCartData');
        } catch (err: any) {
            if(err?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(err);
        }
    }
}
</script>
