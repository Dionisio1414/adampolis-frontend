<template>
    <header class="header">
        <div class="container">
            <div class="header__wrapper d-flex">
                <div class="d-lg-none header__mobile-content d-flex">
                    <HeaderMobileMenuToggle class="header__menu d-flex" />
                </div>
                <HeaderLogo />
                <HeaderContacts class="header__contacts" />
                <HeaderProfile></HeaderProfile>
                <div class="d-lg-none header__mobile-content d-flex">
                    <HeaderPhoneButton class="header__phone d-flex" />
                    <HeaderCartButton class="header__cart d-flex"></HeaderCartButton>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter, ProvideReactive, Action, Provide } from 'nuxt-property-decorator';
import HeaderMobileMenuToggle from '~/components/header/HeaderMobileMenuToggle.vue';
import HeaderLogo from '~/components/header/HeaderLogo.vue';
import HeaderContacts from '~/components/header/HeaderContacts.vue';
import HeaderProfile from '~/components/header/HeaderProfile.vue';
import HeaderPhoneButton from '~/components/header/HeaderPhoneButton.vue';
import HeaderCartButton from '~/components/header/HeaderCartButton.vue';
import { ICart, ICartItem } from '~/types/cart.interface';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';

@Component({
    components: {
        HeaderMobileMenuToggle,
        HeaderLogo,
        HeaderContacts,
        HeaderProfile,
        HeaderPhoneButton,
        HeaderCartButton
    }
})
export default class ComponentHeader extends Vue {
    @Getter('cart/getCartData') public cartData!: ICart;
    @Getter('cart/getStatus') public status!: EStatus;
    @Getter('cart/getMessage') public message!: string;
    @Action('cart/removeCartItem') public removeCartItem!: (id: number) => Promise<void>;

    @Provide('HEADER_CART_REMOVE')
    public async removeHandler(id: number): Promise<any> {
        await this.removeCartItem(id);

        // if(this.status === EStatus.SUCCESS) {
        //     this.$notify({
        //         type: EMessageTypes.SUCCESS,
        //         title: this.message
        //     });
        // } else {
        //     this.$notify({
        //         type: EMessageTypes.DANGER,
        //         title: this.message
        //     });
        // }
    }

    @ProvideReactive('HEADER_CART_STATUS')
    public get cartStatus(): EStatus {
        return this.status;
    }
    
    @ProvideReactive('HEADER_CART_MESSAGE')
    public get cartMessage(): string {
        return this.message;
    }

    @ProvideReactive('HEADER_CART_ITEMS')
    public get cartItems(): ICartItem[] {
        if(this.cartData && this.cartData.items) {
            return this.cartData?.items;
        }

        return [];
    }

    @ProvideReactive('HEADER_CART_QUANTITY')
    public get cartQuantity(): number {
        if(this.cartData?.items.length && this.cartData) {
            return this.cartData?.items.reduce((sum, { quantity }) => {
                return sum + quantity;
            }, 0);
        } 

        return 0;
    }

    @ProvideReactive('HEADER_CART_TOTAL_SUM')
    public get cartTotalSum(): number {
        if(this.cartData && this.cartData.totals) {
            return this.cartData?.totals?.total;
        }

        return 0;
    }

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.header {
    background-color: $color-white;

    &__wrapper {
        justify-content: space-between;
        align-items: center;
        padding: 25px 0 15px;
    }

    &__contacts {
        padding-left: 25px;
        @media screen and (min-width: $breakpoint-laptop) {
            padding-left: 100px;
        }
    }

    &__phone,
    &__menu {
        background-color: $color-dark-blue;
    }

    &__cart {
        background-color: $color-pink;
    }

    &__mobile-content {
        height: 100%;
    }

}

@include media-lg {
    .container {
        padding: 0;
    }

    .header {
        z-index: 1001;
        position: sticky;
        top: 0;

        &__wrapper {
            height: 50px;
            padding: 0;
        }

        &__contacts {
            padding-left: 30px;
        }
    }
}
</style>
