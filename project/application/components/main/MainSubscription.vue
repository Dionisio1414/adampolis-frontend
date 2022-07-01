<template>
    <div class="main-subscription">
        <div class="container">
            <div class="main-subscription__wrapper">
                <div class="main-subscription__title">{{ $t('Subscription.title') }}</div>
                <div class="main-subscription__content d-flex">
                    <div class="main-subscription__description">
                        <div class="main-subscription__description--sub">{{ $t('Subscription.subtitle') }}</div>
                    </div>
                    <form class="main-subscription__form" @submit.prevent="submitForm">
                        <div class="form-input-group form-input-group--sm-inline">
                            <input
                                v-model="formFields.email"
                                type="text"
                                class="form-control mb-7 mb-sm-0"
                                :class="{
                                    'form-control--invalid':
                                        ($v.formFields.email.$invalid && $v.formFields.email.$dirty) ||
                                        (error && error.errors && error.errors.children && processingSubscription)
                                }"
                                :placeholder="$t('Subscription.placeholder')"
                                @focus="resetForm"
                                @blur="resetForm"
                            />
                            <button 
                                type="submit" 
                                class="btn btn--primary main-subscription__submit"
                                :disabled="processingSubscription"
                            >
                                {{ $t('Subscription.submit') }}
                            </button>
                        </div>
                        <FormControlErrors
                            v-if="$v.formFields.email.$invalid && $v.formFields.email.$dirty"
                            :validations="$v.formFields.email"
                            validationType="validations.modals.registrationPopup"
                        />
                        <div class="form-group">
                            <input 
                                v-model="agreeTo"
                                type="checkbox" 
                                id="agree" 
                                class="form-checkbox"
                            >
                            <label for="agree" class="form-label agree-label">
                                <span class="main-subscription__label">
                                    {{ $t('Subscription.aggreement') }}
                                    <a 
                                        href="/privacy-policy" 
                                        class="btn btn--inline-flex main-subscription__link"
                                        target="_blank"
                                        v-html="$sanitize($t('Subscription.aggreementLink'))"
                                    >
                                    </a>
                                </span>
                            </label>
                            <FormControlErrors
                                v-if="$v.agreeTo.$invalid && $v.agreeTo.$dirty"
                                :validations="$v.agreeTo"
                                validationType="validations.modals.registrationPopup"
                            />
                            <FormControlServerErrors
                                v-if="error && error.errors && error.errors.children && error.errors.children.email.errors && processingSubscription"
                                :validations="error.errors.children.email.errors"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { validationMixin } from 'vuelidate';
import { email, required, sameAs } from 'vuelidate/lib/validators';
import { Component, Inject, InjectReactive, mixins } from 'nuxt-property-decorator';
import { ISubscribeEmail } from '~/types/subscribe-email.interface';
import FormControlErrors from '~/components/FormControlErrors.vue';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';

const validations: any = {
    formFields: {
        email: { email, required }
    },
    agreeTo: { checkb: sameAs(() => true) },
}

@Component({
    validations,
    components: {
        FormControlErrors,
        FormControlServerErrors
    }
})
export default class ComponentSubscription extends mixins(validationMixin) {
    @InjectReactive('SUBSCRIPTION_STATUS') public status!: EStatus;
    @InjectReactive('SUBSCRIPTION_ERROR') public error!: any;

    @Inject('SUBMIT_SUBSCRIPTION') public onSubmitSubscription!: (email: ISubscribeEmail) => Promise<void>;

    public agreeTo: boolean = false;
    public formFields: ISubscribeEmail = {
        email: null
    }

    public get processingSubscription(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public resetForm(): void {
        this.$v.$reset();
    }

    public async submitForm(): Promise<void> {
        this.$v.$touch();
        if(!this.$v.$invalid) {
            await this.onSubmitSubscription({ ...this.formFields });
            console.log('onSubmitSubscription', this.status);
            
            switch(this.status) {
                case EStatus.SUCCESS:
                    this.$notify({
                        type: EMessageTypes.SUCCESS,
                        title: 'Success subscription',
                    })
                    console.log('work');
                    
                    this.resetForm();
                    this.formFields.email = null;
                    this.agreeTo = false;
                    break;
                case EStatus.ERROR:
                    this.$notify({
                        type: EMessageTypes.DANGER,
                        title: this.error?.message,
                    })
                    break;
            }
        } 
    }

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-subscription {
    background-color: $color-blue;
    color: $color-white;

    &__wrapper {
        display: flex;
        padding: 50px 0;
        flex-direction: column;
    }

    &__title {
        font-size: 24px;
        line-height: 33px;
        font-weight: bold;
        margin-bottom: 22px;
    }

    &__description {
        flex: 1;

        &--sub {
            padding-right: 125px;
            font-size: 14px;
            line-height: 22px;
        }
    }

    &__form {
        flex: 1;
        .errors-list {
            &__item {
                text-align: left!important;;
            }
        }
        .form-checkbox {
            + .agree-label {
                &::before {
                    background-color: rgba(255,255,255,0.5);
                    border-radius: 4px;
                    width: 18px;
                    height: 18px;
                }
            }
            &:checked {
                + .agree-label {
                    &::before {
                        background-color: $color-pink;
                        border-color: $color-pink;
                    }
                }
            }
        }
        
        .form-input-group {
            margin-bottom: 16px;
        }
    }

    &__submit {
        padding-left: 22px;
        padding-right: 22px;
    }

    &__label {
        font-size: 14px;
        color: $color-white;
    }

    &__link {
        text-decoration: underline;
        padding: 0;
        color: $color-white;
    }
}

@include media-md {
    .main-subscription {
        &__wrapper {
            padding: 30px 0;
        }

        &__content {
            flex-direction: column;
        }

        &__description {
            display: none;
            &--sub {
                padding: 0 0 30px;
            }
        }
    }
}

@include media-sm {
    .main-subscription {
        &__submit {
            width: 100%;
            margin-top: 8px;
        }
    }
}
</style>
