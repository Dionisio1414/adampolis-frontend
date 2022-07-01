<template>
    <div class="checkout-order-info-mobile" :class="{ 'checkout-order-info-mobile--opened': accordionActive }">
        <div class="checkout-order-info-mobile__header card card--shadow" @click="switchAccordion">
            <div class="checkout-order-info-mobile text text--s text--bold">
                <span>
                    {{ $t('CheckoutPage.order.title') }}
                </span>
                <br />
                <NuxtLink 
                    v-if="accordionActive"
                    class="btn btn--label-grey checkout-order-info-mobile__button" 
                    :to="localePath('/basket')"
                >
                    {{ $t('CheckoutPage.order.edit') }}
                </NuxtLink>
            </div>
            <div
                class="checkout-order-info-mobile__icon-container"
                :class="{ 'checkout-order-info-mobile__icon-container--opened': accordionActive }"
            >
                <i class="icon icon--arrow-down-black checkout-order-info-mobile__icon" />
            </div>
        </div>
        <SlideUpDown :active="accordionActive" :duration="200">
            <div class="checkout-order-info-mobile__main card card--shadow">
                <CheckoutOrderInfo :cartData="cartData"></CheckoutOrderInfo>
            </div>
        </SlideUpDown>
    </div>
</template>

<script lang="ts">
import { Component, mixins, InjectReactive } from 'nuxt-property-decorator';
import CheckoutOrderInfo from './CheckoutOrderInfo.vue';
import SlideUpDown from 'vue-slide-up-down';
import mixinAccordion from '~/mixins/accordion';
import { ICart } from '~/types/cart.interface';

@Component({
    components: {
        CheckoutOrderInfo,
        SlideUpDown
    }
})
export default class ComponentCheckoutOrderInfoMobile extends mixins(mixinAccordion) {
    @InjectReactive('CART_DATA') public cartData!: ICart;
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-order-info-mobile {
    &--opened {
        .checkout-order-info-mobile {
            &__header {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                border-bottom: 1px solid rgba($color-grey, $alpha: 0.6);
            }

            &__icon-container {
                transform: rotate(180deg);
            }

            &__main {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        }
    }

    &__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 15px;
        cursor: pointer;
    }

    &__title {
        color: $color-dark-blue;
    }

    &__button {
        margin-top: 18px;
    }
}
</style>
