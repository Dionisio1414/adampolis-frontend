<template>
    <form class="form" @submit.prevent="triggerForm">
        <div class="form-block">
            <div class="form-title">
                {{ $t('modals.registration.contacts.title') }}
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.contacts.name') }}</label>
                    <input
                        v-model="formFields.firstName"
                        class="form-control"
                        :class="{
                            'form-control--invalid': ($v.formFields.firstName.$invalid && $v.formFields.firstName.$dirty) || (error && error.errors && error.errors.firstName && processingState)
                        }"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.firstName.$invalid && $v.formFields.firstName.$dirty"
                        :validations="$v.formFields.firstName"
                        validationType="validations.modals.registrationPopup"
                    />
                    <FormControlServerErrors
                        v-if="error && error.errors && error.errors.firstName && processingState"
                        :validations="error.errors.firstName"
                    />
                </div>
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.contacts.surname') }}</label>
                    <input
                        v-model="formFields.lastName"
                        class="form-control"
                        :class="{
                            'form-control--invalid': ($v.formFields.lastName.$invalid && $v.formFields.lastName.$dirty) || (error && error.errors && error.errors.lastName && processingState)
                        }"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.lastName.$invalid && $v.formFields.lastName.$dirty"
                        :validations="$v.formFields.lastName"
                        validationType="validations.modals.registrationPopup"
                    />
                    <FormControlServerErrors
                        v-if="error && error.errors && error.errors.lastName && processingState"
                        :validations="error.errors.lastName"
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.contacts.mail') }}</label>
                    <input
                        v-model="formFields.email"
                        class="form-control"
                        :class="{
                            'form-control--invalid':
                                ($v.formFields.email.$invalid && $v.formFields.email.$dirty) ||
                                (error && error.errors && error.errors.email && processingState)
                        }"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.email.$invalid && $v.formFields.email.$dirty"
                        :validations="$v.formFields.email"
                        validationType="validations.modals.registrationPopup"
                    />
                    <FormControlServerErrors
                        v-if="error && error.errors && error.errors.email && processingState"
                        :validations="error.errors.email"
                    />
                </div>
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.contacts.telephone') }}</label>
                    <input
                        v-model="formFields.phoneNumber"
                        class="form-control"
                        :class="{
                            'form-control--invalid':
                                $v.formFields.phoneNumber.$invalid && $v.formFields.phoneNumber.$dirty
                        }"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.phoneNumber.$invalid && $v.formFields.phoneNumber.$dirty"
                        :validations="$v.formFields.phoneNumber"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.contacts.password') }}</label>
                    <SwitchablePasswordInput
                        id="password"
                        :inputClassNames="{
                            'form-control--invalid':
                                ($v.formFields.plainPassword.$invalid && $v.formFields.plainPassword.$dirty) ||
                                (error && error.errors && error.errors.plainPassword && processingState)
                        }"
                        v-model="formFields.plainPassword"
                        @componentBlur="touchField('plainPassword')"
                        @componentFocus="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.plainPassword.$invalid && $v.formFields.plainPassword.$dirty"
                        :validations="$v.formFields.plainPassword"
                        validationType="validations.modals.registrationPopup.password"
                    />
                    <FormControlServerErrors
                        v-if="error && error.errors && error.errors.plainPassword && processingState"
                        :validations="error.errors.plainPassword"
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <input 
                        v-model="formFields.agreeTo" 
                        id="category_1" 
                        type="checkbox" 
                        class="form-checkbox"
                        @change="errorHandler"
                    >
                    <label for="category_1" class="form-label">
                        {{ $t('modals.registration.controls.agreeTo') }}&nbsp;
                        <a class="link" href="/privacy-policy" target="_blank">
                            {{ $t('modals.registration.controls.privacyPoliceDescription') }}
                        </a>
                    </label>
                </div>
                <div class="form-group">
                    <input
                        v-model="formFields.subscribedToNewsletter"
                        id="category_2"
                        type="checkbox"
                        class="form-checkbox"
                        @change="errorHandler"
                    >
                    <label for="category_2" class="form-label">
                        {{ $t('modals.registration.controls.subscribeDescription') }}
                    </label>
                    <FormControlErrors
                        v-if="$v.formFields.agreeTo.$invalid && $v.formFields.agreeTo.$dirty"
                        :validations="$v.formFields.agreeTo"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
            </div>
        </div>
        <div class="form-error" v-if="error && error.message && processingState">
            {{ error.message }}
        </div>
    </form>
</template>

<script lang="ts">
import { Component, mixins, Inject, InjectReactive, Getter } from 'nuxt-property-decorator';
import { IFormRegistrationCustomer } from '~/types/form-registration.interface';
import { validationMixin } from 'vuelidate';
import { email, required, sameAs } from 'vuelidate/lib/validators';
import passwordValidations from '~/utils/password-validators';
import numberValidators from '~/utils/number-validators';
import SwitchablePasswordInput from '~/components/SwitchablePasswordInput.vue';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import { EStatus } from '~/constants/status';

const validations: any = {
    formFields: {
        firstName: { required },
        lastName: { required },
        email: {
            email,
            required
        },
        plainPassword: { ...passwordValidations() },
        subscribedToNewsletter: {},
        phoneNumber: { ...numberValidators() },
        agreeTo: { checkb: sameAs(() => true) }
    }
};

@Component({
    validations,
    components: {
        SwitchablePasswordInput,
        FormControlErrors,
        FormControlServerErrors
    }
})
export default class HeaderRegistrationIndividuallForm extends mixins(validationMixin) {
    @Getter('modal-auth/registrationError') public error!: any;

    @Inject('REGISTRATION_SUBMIT') public submitForm!: (formValue: IFormRegistrationCustomer) => void;
    @InjectReactive('STATUS') public status!: EStatus;

    public processingState: boolean = false;
    public formFields: IFormRegistrationCustomer = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        channel: 'default',
        isCompany: false,
        plainPassword: '',
        subscribedToNewsletter: false,
        agreeTo: false
    };

    public touchField(fieldName: string): void {
        this.$v.formFields[fieldName]!.$touch();
    }

    public resetForm(): void {
        this.$v.$reset();
    }

    public errorHandler(): void {
        if(this.error && this.error.message) {
            this.processingState = false;
        }
    }

    public triggerForm(): void {
        this.processingState = true;
        this.$v.$touch();
        if(!this.$v.$invalid) {
            const copyFormFields: IFormRegistrationCustomer = { ...this.formFields };
            delete copyFormFields.agreeTo;
            this.submitForm({ ...copyFormFields });
        } 

        return;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.form {
    &-group {
        .errors-list {
            &__item {
                text-align: left;
            }
        }
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
    }
    &-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        .form-group {
            flex: 1 1 100%;
            .form-label {
                font-weight: normal;
            }
        }
    }
    &-col {
        position: relative;
        flex: 0 1 100%;
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 1 calc(50% - 20px);
        }
        .errors-list {
            margin-top: 8px;
        }
    }
    &-block {
        margin-bottom: 30px;
        .form-row {
            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }
    &-title {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        margin-bottom: 20px;
        color: #253a49;
    }
    &-label {
        font-weight: 600;
        line-height: 19px;
        margin-bottom: 5px;
        color: #253a49;
        .link {
            color: $color-pink;
        }
    }
    &-error {
        font-size: 12px;
        margin-bottom: 15px;
        color: $color-pink;
    }
}
</style>
