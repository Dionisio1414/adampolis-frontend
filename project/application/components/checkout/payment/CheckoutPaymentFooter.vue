<template>
    <div class="checkout-payment-footer__footer">
        <div>
            <div class="form-group checkout-payment-footer__checkbox">
                <input 
                    id="agreeTo" 
                    type="checkbox" 
                    class="form-checkbox"
                    v-model="agreeTo"
                >
                <label for="agreeTo" class="form-label text text--xxs text--normal">
                    <div class="label">
                        {{ $t('CheckoutPage.paymentFooter.agreeTo') }}
                        <a class="checkout-payment-footer__link" href="" target="_blank">
                            {{ $t('CheckoutPage.paymentFooter.purchaseRules') }}
                        </a>
                    </div>
                </label>
            </div>
            <div class="form-group checkout-payment-footer__checkbox">
                <input 
                    id="subscribedToNewsletter" 
                    type="checkbox" 
                    class="form-checkbox"
                    v-model="subscribedToNewsletter"
                >
                <label for="subscribedToNewsletter" class="form-label text text--xxs text--normal">
                    <div class="label">{{ $t('CheckoutPage.paymentFooter.receiveEmails') }}</div>
                </label>
                <FormControlErrors
                    v-if="$v.agreeTo.$invalid && $v.agreeTo.$dirty"
                    :validations="$v.agreeTo"
                    validationType="validations.modals.registrationPopup"
                >
                </FormControlErrors>
            </div>
        </div>
        <button 
            class="checkout-payment-footer__button btn btn--pink" 
            :disabled="submitPaymentStatus"
            @click="nextStepHandler"
        >
            {{ $t('CheckoutPage.common.continue') }}
        </button>
    </div>
</template>

<script lang="ts">
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { Component, mixins, Emit, InjectReactive } from 'nuxt-property-decorator';
import FormControlErrors from '~/components/FormControlErrors.vue';
import { EStatus } from '~/constants/status';

const validations: any = {
    agreeTo: { 
        checkb: (value: boolean) => value,
        required 
    }
}

@Component({
    validations,
    components: { FormControlErrors }
})
export default class ComponentCheckoutPaymentFooter extends mixins(validationMixin) {
    @InjectReactive('PAYMENT_STATUS') public paymentStatus!: EStatus;
    
    public agreeTo: boolean = false;
    public subscribedToNewsletter: boolean = false;

    public get submitPaymentStatus(): boolean {
        return this.paymentStatus === EStatus.PROCESSING;
    }

    @Emit('nextStep')
    private nextStep(): void {};

    public nextStepHandler(): void {
        this.$v.$touch();
        if(!this.$v.$invalid) {
            this.nextStep();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.form-checkbox {
    + .form-label {
        &::before {
            width: 18px;
            height: 18px;
            border-radius: 4px;
            border-color: rgba(203, 208, 216, 0.6);
        }
    }
    &:checked {
        + .form-label {
            &::before {
                background-color: $color-pink;
                border-color: $color-pink;
                border-radius: 4px;
            }
        }
    }
}

.checkout-payment-footer {
    padding: 30px;

    &__footer {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding-top: 20px;
        border-top: 1px solid $color-lightest-grey;
    }

    &__checkbox {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 15px;
        }
    }

    &__button {
        width: 100%;
        margin-top: 6px;
    }

    &__link {
        color: $color-pink;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-payment-footer {
        &__footer {
            align-items: flex-end;
        }

        &__button {
            width: 160px;
        }

        &__checkbox {
            margin-bottom: 5px;

            &:last-child {
                margin-bottom: 20px;
            }
        }
    }
}
</style>
