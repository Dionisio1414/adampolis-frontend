<template>
    <div class="checkout-pay-withdrawal">
        <div class="checkout-pay-withdrawal__wrapper">
            <div>
                <div class="checkout-pay-withdrawal__grid">
                    <div class="checkout-pay-withdrawal__subheader text text--xs text--600">
                        {{ $t('CheckoutPage.payWithdrawal.lookForward') }}
                    </div>
                    <div>
                        <p 
                            class="text text--xs"
                            v-if="paymentData.location && paymentData.location.address"
                            v-html="$sanitize(paymentData.location.address)"
                        >
                        </p>
                        <!-- <p class="text text--xs">
                            {{ $t('CheckoutPage.payWithdrawal.hours') }}: I-V 9-18val. VI 9-15val.
                        </p> -->
                    </div>
                </div>
                <div class="checkout-pay-withdrawal__grid">
                    <div class="checkout-pay-withdrawal__subheader text text--xs text--600">
                        {{ $t('CheckoutPage.payWithdrawal.contactInfo') }}
                    </div>
                    <div>
                        <p class="checkout-pay-withdrawal__grid-item text text--xs">
                            {{ $t('CheckoutPage.payWithdrawal.email') }}:
                            <a class="checkout-pay-withdrawal__link" href="mailto:info@adampolis.lt">info@adampolis.lt</a>
                        </p>
                        <div class="checkout-pay-withdrawal__grid-item">
                            <p class="text text--xs">Loreta Zamblauskienė</p>
                            <div class="checkout-pay-withdrawal__phone-container">
                                <i class="checkout-pay-withdrawal__icon icon icon--phone"></i>
                                <span class="checkout-pay-withdrawal__phone text text--xs">+37065095643</span>
                            </div>
                        </div>
                        <div class="checkout-pay-withdrawal__grid-item">
                            <p class="text text--xs">Karina Maldeikienė</p>
                            <div class="checkout-pay-withdrawal__phone-container">
                                <i class="checkout-pay-withdrawal__icon icon icon--phone"></i>
                                <span class="checkout-pay-withdrawal__phone text text--xs">+37069938489</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p 
                class="checkout-pay-withdrawal__text text text--xxs"
                v-if="paymentData && paymentData.instructions"
                v-html="$sanitize(paymentData.instructions)"
            >
            </p>
        </div>
        <CheckoutPaymentFooter @nextStep="nextStepHandler"></CheckoutPaymentFooter>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject, Action, InjectReactive } from 'nuxt-property-decorator';
import CheckoutPaymentFooter from './CheckoutPaymentFooter.vue';
import { IPaymentMethodPayload, IPaymentMethods, IPaymentPayBy } from '~/types/payment-methods';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';

@Component({
    components: {
        CheckoutPaymentFooter
    }
})
export default class ComponentCheckoutPayWithDrawal extends Vue {
    @Action('payment-pay-by/setPaymentMethod') public setPaymentMethod!: (payload: IPaymentMethodPayload) => Promise<void>;

    @Prop() public paymentData?: Partial<IPaymentMethods>;

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

.checkout-pay-withdrawal {
    padding: 20px 15px;

    &__grid {
        display: grid;
        grid-template-columns: 100%;
        margin-bottom: 10px;

        &:not(:last-child) {
            margin-bottom: 34px;
        }
    }

    &__grid-item {
        &:not(:last-child) {
            margin-bottom: 25px;
        }
    }

    &__subheader {
        margin-bottom: 10px;
    }

    &__phone-container {
        display: flex;
        align-items: center;
        margin-top: 5px;

        &:not(:first-child) {
            margin-bottom: -10px;
        }
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
        padding: 35px 0 20px 0;
    }

    &__link {
        color: $color-pink;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-pay-withdrawal {
        padding: 25px 0 0 0;

        &__grid {
            grid-template-columns: 34% 1fr;
            margin-bottom: 0;

            &:not(:last-child) {
                margin-bottom: 26px;
            }
        }

        &__subheader {
            margin-bottom: 0;
        }

        &__phone-container {
            margin-top: 5px;

            &:not(:first-child) {
                margin-bottom: 0;
            }
        }

        &__text {
            padding: 40px 0 20px 0;
        }
    }
}
</style>
