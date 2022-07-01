<template>
    <div class="checkout-bank-transfer">
        <div class="text text--s">{{ $t('CheckoutPage.bankTransfer.makeTransfer') }}:</div>
        <div class="checkout-bank-transfer__account">
            <p class="text text--xs">{{ $t('CheckoutPage.bankTransfer.account') }}: {{ this.paymentData.bankAccountNumber ? this.paymentData.bankAccountNumber : '-' }}</p>
            <p class="text text--xs">{{ $t('CheckoutPage.bankTransfer.recipient') }}: {{ this.paymentData.beneficiary ? this.paymentData.beneficiary : '-' }}</p>
        </div>

        <!-- <div>
            <div class="d-flex">
                <i class="checkout-bank-transfer__warning-icon icon icon--warning" /><span
                    class="checkout-bank-transfer__warning-text text text--xxs"
                    >{{ $t('CheckoutPage.bankTransfer.paymentPurpose') }} 556656556.</span
                >
            </div>
            <div class="d-flex">
                <i class="checkout-bank-transfer__warning-icon icon icon--warning-pink" />
                <span class="checkout-bank-transfer__warning-text checkout-bank-transfer__warning-text--pink text text--xxs">{{ $t('CheckoutPage.bankTransfer.deferral') }}</span>
            </div>
        </div> -->

        <div 
            v-if="paymentData && paymentData.instructions"
            class="checkout-bank-transfer__info"
        >
            <p 
                class="text text--xxs"
                v-html="$sanitize(paymentData.instructions)"
            >
            </p>
            <!-- {{ $t('CheckoutPage.bankTransfer.info') }} -->
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
export default class ComponentCheckoutBankTransfer extends Vue {
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

.checkout-bank-transfer {
    padding: 25px 15px;

    &__account {
        padding: 25px 0 25px 0;
    }

    &__warning-text {
        margin-left: 10px;
        margin-bottom: 10px;
        &--pink {
            color: $color-pink;
        }
    }

    &__warning-icon {
        width: 16px;
        height: 16px;
    }

    &__info {
        padding: 15px 0 35px 0;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-bank-transfer {
        padding: 30px 0 0 0;

        &__account {
            padding: 20px 0 25px 0;
        }

        &__info {
            padding: 22px 0 63px 0;
        }
    }
}
</style>
