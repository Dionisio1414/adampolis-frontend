<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    <div class="add-to-cart-popup__head">
                        <div class="add-to-cart-popup__picture">
                            <img class="img-responsive" :src="require(`@/assets/images/check-circle.svg`)" alt="" />
                        </div>
                        <span>
                            {{ $t('Cart.itemAdded') }}
                        </span>
                    </div>
                </template>
            </modal-header>
        </template>
        <template #main>
            <div 
                class="add-to-cart-popup__wrapper"
                v-for="(val, index) in cartItems"
                :key="index"
            >
                <div class="add-to-cart-popup__picture d-none d-lg-block">
                    <img
                        class="img-responsive img-responsive--width img-responsive--height"
                        :src="val.product"
                        alt=""
                    />
                </div>
                <div class="add-to-cart-popup__content">
                    <div class="">
                        <div class="add-to-cart-popup__title text text--s text--bold">
                            {{ val.product.name }}
                        </div>
                        <div class="add-to-cart-popup__description">
                            <p class="add-to-cart-popup__text text text--xs">{{ val.quantity }} vnt / {{ priceItem(val.quantity, val.total) }}</p>
                            <!-- <p class="add-to-cart-popup__text text text--xs">Šiauliai, Vairo g. 11</p> -->
                        </div>
                    </div>
                    <div class="add-to-cart-popup__price product__price product__price--small">{{ val.total }}</div>
                </div>
            </div>
        </template>
        <template #footer>
            <modal-footer
                class="add-to-cart-popup__footer"
                @cancel="cancel"
                @submit="submit"
                :btnCancelTitle="$t('Cart.continueSearching')"
                :btnSubmitTitle="$t('Cart.viewCart')"
                btnSubmitClass="btn--pink"
                btnCancelClass="btn--secondary-black-border"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Getter } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import { EStatus } from '~/constants/status';
import { ICart, ICartItem, ICartItemProductImages } from '~/types/cart.interface';

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter
    }
})
export default class ComponentAddToCartPopup extends Vue {
    @Getter('cart/getStatus') public status!: EStatus;
    @Getter('cart/getCartData') public cartData!: ICart;
    @Prop() public modal!: any;

    public localePath: any;

    public get loader(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public get cartItems(): ICartItem[] {
        if(this.cartData && this.cartData.items) {
            return this.cartData?.items;
        }

        return [];
    }

    public priceItem(quantity: number, sum: number): number {
        if(quantity >= 1) return sum;
        else return sum / quantity;
    }

    public submit(): void {
        this.$router.push({ path: this.localePath('/basket') }) 
        this.close();
    }

    public close(): void { this.$emit('close'); }
    public cancel(): void { this.$emit('close'); }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.add-to-cart-popup {
    &__head {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 5px;
        width: 100%;
        text-align: center;
        font-size: 18px;
    }

    &__wrapper {
        display: flex;
        padding: 0px 0 20px 0;
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
    }

    &__description {
        margin-top: 12px;
    }

    &__picture {
        margin-bottom: 20px;
        max-width: 100px;
        max-height: 90px;
        width: 100%;
        height: 100%;
    }

    &__text {
        &:not(:last-child) {
            margin-bottom: 4px;
        }
    }

    &__price {
        margin-top: 20px;
    }

    &__footer {
        border-top: 1px solid rgba($color-grey, $alpha: 0.6);
        padding-top: 20px;
    }

    ::v-deep .modal-footer__btn {
        padding-left: 30px;
        padding-right: 32px;
    }
}

@media (min-width: $breakpoint-lg) {
    .add-to-cart-popup {
        &__wrapper {
            padding: 10px 0 30px 0;
        }

        &__head {
            flex-direction: row;
            font-size: 20px;
        }

        &__content {
            flex-direction: row;
            justify-content: space-between;
            margin-left: 8px;
            padding-top: 8px;
        }

        &__price {
            margin-top: 0px;
        }

        &__description {
            margin-top: 0px;
        }

        &__title {
            margin-bottom: 15px;
        }

        &__picture {
            margin-bottom: 0;
            margin-right: 20px;
        }

        &__text {
            &:not(:last-child) {
                margin-bottom: 6px;
            }
        }
    }
    ::v-deep .modal-footer__btn {
        padding-left: 30px;
        padding-right: 32px;
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
    }
}
</style>
