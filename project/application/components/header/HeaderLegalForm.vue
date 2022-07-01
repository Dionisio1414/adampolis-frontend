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
                            'form-control--invalid': ($v.formFields.email.$invalid && $v.formFields.email.$dirty) || (error && error.errors && error.errors.email && processingState) 
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
        </div>
        <div class="form-block">
            <div class="form-title">
                {{ $t('modals.registration.company.title') }}
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.company.name') }}</label>
                    <input
                        v-model="formFields.companyName"
                        class="form-control"
                        :class="{
                            'form-control--invalid':
                                $v.formFields.companyName.$invalid && $v.formFields.companyName.$dirty
                        }"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.companyName.$invalid && $v.formFields.companyName.$dirty"
                        :validations="$v.formFields.companyName"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.company.code_company') }}</label>
                    <input
                        v-model="formFields.companyCode"
                        class="form-control"
                        :class="{
                            'form-control--invalid':
                                $v.formFields.companyCode.$invalid && $v.formFields.companyCode.$dirty
                        }"
                        type="text"
                        @keypress="inputHandl"
                        @input="inputHandl"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.companyCode.$invalid && $v.formFields.companyCode.$dirty"
                        :validations="$v.formFields.companyCode"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.company.code_ndc') }}</label>
                    <input
                        v-model="formFields.vatCode"
                        class="form-control"
                        :class="{
                            'form-control--invalid': $v.formFields.vatCode.$invalid && $v.formFields.vatCode.$dirty
                        }"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.vatCode.$invalid && $v.formFields.vatCode.$dirty"
                        :validations="$v.formFields.vatCode"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
            </div>
        </div>
        <div class="form-block">
            <div class="form-title">
                {{ $t('modals.registration.address.title') }}
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.address.country') }}</label>
                    <multiselect
                        v-if="countriesList && countriesList.length"
                        class="form-control"
                        :class="{
                            'form-control--invalid':
                                $v.formFields.countryCode.$invalid && $v.formFields.countryCode.$dirty
                        }"
                        v-model="formFields.countryCode"
                        :allow-empty="true"
                        :options="countriesList"
                        :custom-label="customLabel"
                        label="label"
                        track-by="value"
                        :placeholder="$t('MainFilter.vin.placeholder')"
                    >
                        <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                    </multiselect>
                    <FormControlErrors
                        v-if="$v.formFields.countryCode.$invalid && $v.formFields.countryCode.$dirty"
                        :validations="$v.formFields.countryCode"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.address.city') }}</label>
                    <input
                        v-model="formFields.city"
                        :class="{ 'form-control--invalid': $v.formFields.city.$invalid && $v.formFields.city.$dirty }"
                        class="form-control"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.city.$invalid && $v.formFields.city.$dirty"
                        :validations="$v.formFields.city"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.address.address') }}</label>
                    <input
                        v-model="formFields.address"
                        :class="{
                            'form-control--invalid': $v.formFields.address.$invalid && $v.formFields.address.$dirty
                        }"
                        class="form-control"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.address.$invalid && $v.formFields.address.$dirty"
                        :validations="$v.formFields.address"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.address.postal_code') }}</label>
                    <input
                        v-model="formFields.postCode"
                        :class="{
                            'form-control--invalid': $v.formFields.postCode.$invalid && $v.formFields.postCode.$dirty
                        }"
                        class="form-control"
                        type="text"
                        @focus="errorHandler"
                        @change="errorHandler"
                    />
                    <FormControlErrors
                        v-if="$v.formFields.postCode.$invalid && $v.formFields.postCode.$dirty"
                        :validations="$v.formFields.postCode"
                        validationType="validations.modals.registrationPopup"
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label class="form-label">{{ $t('modals.registration.address.password') }}</label>
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
    </form>
</template>

<script lang="ts">
import { Component, mixins, Inject, Prop, Watch, InjectReactive, Getter } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { email, required, sameAs } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import { IFormRegistrationCompany } from '~/types/form-registration.interface';
import { ICompanyInfro } from '~/types/company-info.interface';
import passwordValidations from '~/utils/password-validators';
import numberValidators from '~/utils/number-validators';
import SwitchablePasswordInput from '~/components/SwitchablePasswordInput.vue';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import { debounce } from 'lodash';
import { EStatus } from '~/constants/status';
import { ICountryList, IFormatedCountriesList } from '~/types/countries-list.interface';

export interface ICountriesList {
    name: string;
    code: string;
}

const validations: any = {
    formFields: {
        email: { email, required },
        plainPassword: { ...passwordValidations() },
        firstName: { required },
        lastName: { required },
        phoneNumber: { ...numberValidators() },
        companyName: { required },
        companyCode: { required },
        vatCode: {},
        countryCode: { required },
        city: { required },
        address: { required },
        postCode: { required },
        subscribedToNewsletter: {},
        agreeTo: { checkb: sameAs(() => true) }
    }
};

@Component({
    validations,
    components: {
        Multiselect,
        SwitchablePasswordInput,
        FormControlErrors,
        FormControlServerErrors
    }
})
export default class HeaderRegistrationLegalForm extends mixins(validationMixin) {
    @Getter('countries-list/getCountriesList') public countries!: ICountryList;
    @Getter('modal-auth/registrationError') public error!: any;

    @Inject('REGISTRATION_SUBMIT') public submitForm!: (formValue: IFormRegistrationCompany) => void;
    @Inject('COMPANY_CODE_HANDLER') public companyCodeHandler!: (fieldValue: string) => void;
    @InjectReactive('STATUS') public status!: EStatus;

    @Prop() public fields!: object;

    public processingState: boolean = false;
    public formFields: IFormRegistrationCompany = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        channel: 'default',
        companyName: '',
        companyCode: '',
        vatCode: '',
        isCompany: true,
        countryCode: '',
        city: '',
        address: '',
        postCode: '',
        plainPassword: '',
        subscribedToNewsletter: false,
        agreeTo: false
    };

    inputHandl = debounce(this.companyCodeHandler, 350);

    @Watch('fields')
    public onChangeFields(val: ICompanyInfro): void {
        const { 
            mobile = '', 
            city = '', 
            code = '', 
            address = '', 
            postCode = '', 
            title = '', 
            email = '', 
            pvmCode = ''
        } = val;

        this.formFields = {
            ...this.formFields,
            phoneNumber: mobile ? mobile : this.formFields.phoneNumber,
            city: city ? city : this.formFields.city,
            address: address ? address : this.formFields.address,
            postCode: postCode ? postCode : this.formFields.postCode,
            vatCode: pvmCode ? pvmCode : this.formFields.vatCode,
            email: email ? email : this.formFields.email,
            companyCode: code ? code : this.formFields.companyCode,
            companyName: title ? title : this.formFields.companyName
        };
        
    }

    public customLabel({ label }: any): string {
        return label;
    }

    public touchField(fieldName: string): void {
        this.$v.formFields[fieldName]!.$touch();
    }

    public resetForm(): void {
        this.$v.$reset();
    }

    public get countriesList(): IFormatedCountriesList[] | [] {
        if(this.countries.items && this.countries.items.length) {
            return this.countries.items.map((item: ICountriesList) => ({ label: item.name, value: item.code }));
        } 

        return [];
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
            const copyFormFields: IFormRegistrationCompany = { ...this.formFields };
            delete copyFormFields.agreeTo;
            const { value }: any = this.formFields.countryCode;
            this.submitForm({ ...copyFormFields, countryCode: value });
        } 

        return;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.form {
    &-group {
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
        flex: 0 1 100%;
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 1 calc(50% - 20px);
        }
        .errors-list {
            margin-top: 8px;
        }
        .multiselect {
            &.form-control--invalid {
                border-color: $color-pink;
            }
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
        color: $color-dark-blue;
    }
    &-label {
        font-weight: 600;
        line-height: 19px;
        margin-bottom: 5px;
        color: $color-dark-blue;
        .link {
            color: $color-pink;
        }
    }
    &-error {
        font-size: 12px;
        margin-top: 5px;
        text-align: left;
        color: $color-pink;
    }
}
</style>
