<template>
    <header class="checkout-header">
        <div class="container">
            <div class="checkout-header__wrapper d-flex">
                <HeaderLogo />
                <div class="checkout-header__box">
                    <div class="checkout-header__text">
                        {{ $t('CheckoutPage.header.faq') }}
                    </div>
                    <button class="checkout-header__button btn btn--secondary-black-border btn--flex">
                        <i class="checkout-header__icon icon icon--phone-black"></i>
                        8 800 60 700
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import HeaderLogo from '~/components/header/HeaderLogo.vue';

@Component({
    components: {
        HeaderLogo
    }
})
export default class ComponentCheckoutHeader extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.checkout-header {
    background-color: $color-white;
    box-shadow: $shadow;

    &__wrapper {
        justify-content: space-between;
        align-items: center;
        padding: 19px 0 17px;
    }

    &__icon {
        width: 14px;
        height: 14px;
        margin-right: 10px;
    }
    &__button {
        padding: 6px 10px 5px 10px;
        font-weight: bold;

        &:hover {
            .checkout-header__faq-icon {
                &::before {
                    background-image: url('../../assets/images/phone-white.svg');
                }
            }
        }
    }

    &__box {
        padding-right: 10px;
    }

    &__text {
        display: none;
    }
}

@include media-lg {
    .container {
        padding: 0;
    }

    .checkout-header {
        z-index: 1001;
        position: sticky;
        top: 0;

        .header-logo {
            padding-left: 10px;
        }

        &__wrapper {
            height: 50px;
            padding: 0;
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-header {
        &__box {
            display: flex;
            align-items: center;
            padding-right: 0;
        }

        &__button {
            font-size: 20px;
            padding: 12px 20px 11px 20px;
        }

        &__text {
            display: block;
            margin-right: 20px;
            font-size: 16px;
            color: $color-dark-blue;
            font-weight: bold;
        }
    }
}
</style>
