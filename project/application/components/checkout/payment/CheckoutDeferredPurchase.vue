<template>
    <div class="checkout-deferred-purchase">
        <div class="checkout-deferred-purchase__wrapper">
            <p 
                class="checkout-deferred-purchase__text"
                v-if="paymentData && paymentData.instructions"
                v-html="$sanitize(paymentData.instructions)"
            >
            </p>
            <div>
                <div class="checkout-deferred-purchase__grid">
                    <div class="checkout-deferred-purchase__subheader text text--xs text--600">
                        {{ $t('CheckoutPage.deferredPurchase.contractNumber') }}
                    </div>
                    <div
                        v-if="paymentData && paymentData.contractNo"
                    >
                        <p 
                            class="text text--xs"
                            v-html="$sanitize(paymentData.contractNo)"
                        >
                        </p>
                    </div>
                </div>
                <div class="checkout-deferred-purchase__grid">
                    <div class="checkout-deferred-purchase__subheader text text--xs text--600">
                        {{ $t('CheckoutPage.deferredPurchase.contactInfo') }}
                    </div>
                    <div>
                        <p class="checkout-deferred-purchase__grid-item text text--xs">
                            {{ $t('CheckoutPage.deferredPurchase.email') }}:
                            <a class="checkout-deferred-purchase__link" href="">info@adampolis.lt</a>
                        </p>
                        <div class="checkout-deferred-purchase__grid-item">
                            <p class="text text--xs">Loreta Zamblauskienė</p>
                            <div class="checkout-deferred-purchase__phone-container">
                                <i class="checkout-deferred-purchase__icon icon icon--phone"></i>
                                <span class="checkout-deferred-purchase__phone text text--xs">+37065095643</span>
                            </div>
                        </div>
                        <div class="checkout-deferred-purchase__grid-item">
                            <p class="text text--xs">Karina Maldeikienė</p>
                            <div class="checkout-deferred-purchase__phone-container">
                                <i class="checkout-deferred-purchase__icon icon icon--phone"></i>
                                <span class="checkout-deferred-purchase__phone text text--xs">+37069938489</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CheckoutPaymentFooter @nextStep="nextStepHandler"></CheckoutPaymentFooter>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Action, Inject, InjectReactive } from 'nuxt-property-decorator';
import CheckoutPaymentFooter from './CheckoutPaymentFooter.vue';
import { IPaymentMethodPayload, IPaymentMethods, IPaymentPayBy } from '~/types/payment-methods';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';

@Component({
    components: { CheckoutPaymentFooter }
})
export default class ComponentCheckoutDeferredPurchase extends Vue {
    @Action('payment-pay-by/setPaymentMethod') public setPaymentMethod!: (payload: IPaymentMethodPayload) => Promise<void>;

    @Prop() public paymentData?: Partial<IPaymentMethods>;

    @Inject('CHECKOUT_NEXT_STEP') public nextStep!: () => void;
    @InjectReactive('CART_TOKEN') public cartToken!: string | null;
    @InjectReactive('PAYMENT_STATUS') public paymentStatus!: EStatus;
    @InjectReactive('PAYMENT_ERROR') public paymentError!: any;
    @InjectReactive('PAYMENT_DATA') public paymentPayByData!: IPaymentPayBy | null;

    public async nextStepHandler(): Promise<any> {
        await this.setPaymentMethod({ 
            cartToken: this.cartToken,
            code: this.paymentData?.code
        });

        if(this.paymentStatus === EStatus.SUCCESS) {
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: 'Success'
            });
            this.$router.push({ 
                query: { 
                    orderNumber: this.paymentPayByData?.order_nr 
                } 
            });
        } 
        
        if(this.paymentStatus === EStatus.ERROR) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.paymentError?.message
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-deferred-purchase {
    padding: 20px 15px;

    &__wrapper {
        padding-bottom: 25px;
    }

    &__grid {
        display: grid;
        grid-template-columns: 100%;

        &:not(:last-child) {
            margin-bottom: 28px;
        }
    }

    &__subheader {
        padding-right: 60px;
        margin-bottom: 10px;
    }

    &__grid-item {
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    &__phone-container {
        display: flex;
        align-items: center;
        margin-top: 5px;
    }

    &__phone {
        color: $color-search-bg;
        margin-left: 6px;
    }

    &__icon {
        width: 20px;
        height: 20px;
    }

    &__text {
        font-size: 12px;
        margin-bottom: 20px;
    }

    &__link {
        color: $color-pink;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-deferred-purchase {
        padding: 30px 0 0 0;

        &__wrapper {
            padding-bottom: 30px;
        }

        &__grid {
            grid-template-columns: 35% 1fr;

            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }

        &__text {
            margin-bottom: 30px;
        }

        &__subheader {
            margin-bottom: 0;
        }
    }
}
</style>
