<template>
    <div class="checkout-success card card--bordered">
        <div 
            class="checkout-success__circle"
            :class="{'checkout-success__circle--failed': processingPaymentState}"
        >
            <i 
                class="checkout-success__icon icon"
                :class="{
                    'icon--check': !processingPaymentState,
                    'icon--close-checkout': processingPaymentState
                }"
            >
            </i>
        </div>

        <template v-if="!processingPaymentState">
            <p class="checkout-success__header">{{ $t('CheckoutPage.success.thankYou') }}</p>
            <p class="checkout-success__text">{{ $t('CheckoutPage.success.findInfo') }}</p>
        </template>
        <template v-else>
            <p class="checkout-success__header">Error title</p>
            <p 
                class="checkout-success__text checkout-success__text--error"
            >
                Error information lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at lorem lacinia, ullamcorper purus ac.
            </p>
        </template>

        <template v-if="!processingPaymentState">
            <div class="card-group">
                <div class="checkout-success__card checkout-success__card--head card card--bordered">
                    <p class="checkout-success__card-header">{{ $t('CheckoutPage.order.title') }}</p>
                </div>

                <div 
                    class="checkout-success__card card card--bordered" 
                    v-for="val in orderItems" 
                    :key="val.id"
                >
                    <div class="checkout-success__flex">
                        <div>
                            <p class="checkout-success__name">{{ val.name }}</p>
                            <p class="checkout-success__code">{{ $t('CheckoutPage.order.code') }}: {{ val.code }}</p>
                        </div>
                        <div>
                            <p class="checkout-success__price">{{ val.total }}</p>
                        </div>
                    </div>
                </div>

                <div class="checkout-success__card checkout-success__card--total card card--bordered">
                    <div class="checkout-success__total checkout-success__flex">
                        <p class="text text--xs text--600">{{ $t('OrdersPreview.vatText') }} (21%)</p>
                        <p class="checkout-success__price">{{ order.totalItems }}</p>
                    </div>
                    <div class="checkout-success__flex">
                        <p class="checkout-success__card-header">{{ $t('CheckoutPage.order.sum') }}</p>
                        <p class="checkout-success__price checkout-success__price--total">{{ order.totalSum }}</p>
                    </div>
                </div>
            </div>

            <div class="checkout-success__grid" v-if="order && order.address">
                <div class="checkout-success__subheader text text--xs text--bold">
                    {{ $t('CheckoutPage.delivery.deliveryAddress') }}:
                </div>
                <div>
                    <p class="checkout-success__info">{{ order.address.street }}</p>
                    <!-- <p class="checkout-success__info">Jovaišos 25, Vilnius</p> -->
                    <!-- <div class="checkout-success__warning">
                        <i class="checkout-success__icon-warning icon icon--warning"></i>
                        <span class="checkout-success__info">SIuntinys atkeliaus per 2-3 dienas</span>
                    </div> -->
                </div>
            </div>

            <div class="checkout-success__grid">
                <div class="checkout-success__subheader text text--xs text--bold">
                    {{ $t('CheckoutPage.success.billing') }}:
                </div>
                <div>
                    <p class="checkout-success__info"
                        v-if="order && order.paymentMethod"
                    >
                        {{ order.paymentMethod }}
                    </p>
                </div>
            </div>
        </template>

        <div class="checkout-success__footer">
            <!-- <div class="checkout-success__downloads">
                <a class="checkout-success__download">
                    <i class="icon icon--download-pink"></i>
                    <span>{{ $t('CheckoutPage.success.downloadPreInvoice') }}</span>
                </a>
                <a class="checkout-success__download">
                    <i class="icon icon--download-pink"></i>
                    <span>{{ $t('CheckoutPage.success.downloadXls') }}</span>
                </a>
            </div> -->

            <div class="checkout-success__buttons">
                <NuxtLink 
                    :to="localePath('/')"
                    class="checkout-success__link btn btn--link"
                >
                    <i class="checkout-success__icon-arrow icon icon--arrow-left-black"></i>
                    {{ $t('CheckoutPage.success.back') }}
                </NuxtLink>
                <NuxtLink 
                    class="checkout-success__btn btn btn--pink"
                    :to="localePath('/profile/orders')"
                >
                    {{ $t('CheckoutPage.success.goToOrders') }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Inject, InjectReactive } from 'nuxt-property-decorator';
import { IOrderCard, IOrders } from '~/types/orders.interface';

export enum EOrderStatus {
    FAILED = 'failed'
}

@Component({})
export default class ComponentCheckoutSuccess extends Vue {
    @Inject('CHECKOUT_PREV_STEP') public prevStep!: () => void;
    @InjectReactive('ORDER_ITEM') public order!: IOrders | null;

    public get orderItems(): IOrderCard[] {
        return this.order?.items ?? [];
    }

    public get processingPaymentState(): boolean {
        return this.order?.paymentState === EOrderStatus.FAILED;
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-success {
    padding: 20px 15px;
    max-width: 590px;
    margin: 0 auto;

    &__icon {
        width: 16px;
    }

    &__circle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: $color-accent-green;
        border-radius: 50%;
        margin: 0 auto;
        &--failed {
            background-color: $color-pink;
            .checkout-success__icon {
                width: 1em;
                font-size: 24px;
            }
        }
    }

    &__header {
        font-size: 18px;
        color: $color-dark-blue;
        font-weight: bold;
        text-align: center;
        margin-top: 46px;
        line-height: 28px;
        max-width: 222px;
        margin: 40px auto 0 auto;
    }

    &__text {
        font-size: 12px;
        margin: 2px auto 30px auto;
        text-align: center;
        max-width: 277px;
        &--error {
            max-width: 387px;
        }
    }

    &__card {
        padding: 15px 10px;

        &--head {
            padding: 20px 10px;
        }

        &--total {
            background-color: $color-light-grey;
            padding: 13px 10px;
            .checkout-success__total {
                margin-bottom: 6px;
            }
        }
    }

    &__card-header {
        font-size: 16px;
        color: $color-dark-blue;
        font-weight: bold;
    }

    &__flex {
        display: flex;
        justify-content: space-between;
    }

    &__name {
        font-size: 12px;
        font-weight: 600;
        line-height: 18px;
        margin-bottom: 4px;
    }

    &__code {
        font-size: 12px;
        color: $color-search-bg;
    }

    &__price {
        font-size: 14px;
        color: $color-dark-blue;
        font-weight: bold;

        &--total {
            font-size: 16px;
            color: $color-pink;
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: 100%;
        margin: 33px 0 15px 0;
    }

    &__info {
        color: $color-search-bg;
        font-size: 14px;
        &:not(:last-child) {
            margin-bottom: 4px;
        }
    }

    &__footer {
        border-top: 1px solid $color-lightest-grey;
        padding-top: 20px;
    }

    &__warning {
        display: flex;
        align-items: center;
        margin-top: 30px;

        span {
            margin-bottom: 0;
        }
    }

    &__icon-warning {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    &__downloads {
        margin-bottom: 30px;
    }

    &__download {
        display: flex;
        align-items: center;
        color: $color-pink;
        text-decoration: underline;
        font-size: 12px;

        .icon {
            margin-right: 10px;
            width: 16px;
            height: 16px;
        }

        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    &__icon-arrow {
        width: 10px;
        height: 10px;
        margin-right: 8px;
    }

    &__buttons {
        display: flex;
        justify-content: space-between;
        flex-direction: column-reverse;
        margin-top: 10px;
    }

    &__link {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__btn {
        width: 100%;
        margin-bottom: 20px;
    }

    &__subheader {
        margin-bottom: 10px;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-success {
        padding: 30px 30px 0 30px;

        &__header {
            font-size: 20px;
            line-height: 27px;
            margin-top: 30px;
            width: auto;
        }

        &__text {
            margin: 15px auto 30px auto;
        }

        &__card {
            padding: 15px 20px;

            &--head {
                padding: 20px;
            }
            &--total {
                background-color: $color-light-grey;
                padding: 20px;
            }
        }

        &__grid {
            grid-template-columns: 33% 1fr;
            margin: 30px 0 30px 0;
        }

        &__subheader {
            margin-bottom: 0;
        }

        &__warning {
            margin-top: 20px;
        }

        &__downloads {
            margin-bottom: 35px;
        }

        &__download {
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }

        &__buttons {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
        }

        &__btn {
            width: 230px;
            margin-bottom: 0;
        }

        &__link {
            justify-content: flex-start;
        }

        &__footer {
            padding-bottom: 30px;
        }
    }
}
</style>
