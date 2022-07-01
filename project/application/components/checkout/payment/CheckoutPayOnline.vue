<template>
    <div class="checkout-pay-online">
        <div class="checkout-pay-online__wrapper">
            <div class="text text--xs text--600">{{ $t('CheckoutPage.payOnline.selectBank') }}:</div>

            <div class="checkout-pay-online__items">
                <div
                    v-for="bank in banks"
                    :key="bank.code"
                    class="checkout-pay-online__item card card--bordered"
                    @click="selectBank(bank)"
                >
                    <div class="form-radio">
                        <input
                            :id="`bank-${bank.code}`"
                            class="form-radio__field"
                            type="radio"
                            :name="`radio-bank-${bank.code}`"
                            :checked="bank.code === selectedBank"
                        >
                        <label :for="`radio-bank-${bank.code}`" class="form-radio__label checkout-pay-online__label">
                            <img class="checkout-pay-online__image" :src="bank.image" :alt="bank.code">
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <CheckoutPaymentFooter @nextStep="nextStepHandler"></CheckoutPaymentFooter>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Action, Prop, InjectReactive, Inject } from 'nuxt-property-decorator';
import CheckoutPaymentFooter from './CheckoutPaymentFooter.vue';
import { EStatus } from '~/constants/status';
import { IPaymentMethodPayload, IPaymentMethods, IPaymentPayBy } from '~/types/payment-methods';
import { EMessageTypes } from '~/constants/message-types';

interface IBankItem {
    code: string;
    image: string;
}

@Component({
    components: { CheckoutPaymentFooter }
})
export default class ComponentCheckoutPayOnline extends Vue {
    @Action('payment-pay-by/setPaymentMethod') public setPaymentMethod!: (payload: IPaymentMethodPayload) => Promise<void>;

    @Prop() public paymentData?: Partial<IPaymentMethods>;

    @InjectReactive('CART_TOKEN') public cartToken!: string | null;
    @InjectReactive('PAYMENT_STATUS') public paymentStatus!: EStatus;
    @InjectReactive('PAYMENT_ERROR') public paymentError!: any;
    @InjectReactive('PAYMENT_DATA') public paymentPayByData!: IPaymentPayBy | null;

    public banks: IBankItem[] = [
        {
            code: 'swedbank',
            image: require('@/assets/images/banks/swedbank.png')
        },
        {
            code: 'luminor',
            image: require('@/assets/images/banks/luminor.png')
        },
        {
            code: 'seb',
            image: require('@/assets/images/banks/seb.png')
        }
    ];

    public selectedBank: string = this.banks[0].code;

    public selectBank({ code }: { code: string }): void {
        this.selectedBank = code;
    }

    public async nextStepHandler(): Promise<any> {
        await this.setPaymentMethod({ 
            cartToken: this.cartToken,
            code: this.paymentData?.code,
            bankCode: this.selectedBank
        });

        if(this.paymentStatus === EStatus.ERROR) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.paymentError?.message
            });

            return false;
        }

        const redirectUrl: string | undefined = this.paymentPayByData?.redirect_url;

        if(redirectUrl) { 
            window.location.assign(redirectUrl); 
        }
    
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-pay-online {
    padding: 20px 15px;

    &__wrapper {
        padding-bottom: 20px;
    }

    &__items {
        padding-top: 20px;
    }

    &__item {
        padding: 10px 20px;
        width: 100%;
        cursor: pointer;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__image {
        max-height: 24px;
    }

    &__label {
        padding-left: 38px;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-pay-online {
        padding: 25px 0 0 0;

        &__wrapper {
            padding-bottom: 93px;
        }

        &__item {
            width: 255px;
        }
    }
}
</style>
