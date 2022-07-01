<template>
    <div class="customer-individual-form">
        <form class="form">
            <div class="form-block">
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.contacts.name') }}</label>
                        <input
                            v-model="$v.formFields.firstName.$model"
                            class="form-control"
                            :class="{
                                'form-control--invalid':
                                    $v.formFields.firstName.$invalid && $v.formFields.firstName.$dirty
                            }"
                            type="text"
                            name=""
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formFields.firstName.$invalid && $v.formFields.firstName.$dirty"
                            :validations="$v.formFields.firstName"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.firstName && loader"
                            :validations="error.errors.firstName"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.contacts.surname') }}</label>
                        <input
                            v-model="$v.formFields.lastName.$model"
                            class="form-control"
                            :class="{
                                'form-control--invalid':
                                    $v.formFields.lastName.$invalid && $v.formFields.lastName.$dirty
                            }"
                            type="text"
                            name=""
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formFields.lastName.$invalid && $v.formFields.lastName.$dirty"
                            :validations="$v.formFields.lastName"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.lastName && loader"
                            :validations="error.errors.lastName"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.contacts.mail') }}</label>
                        <input
                            v-model="$v.formFields.email.$model"
                            class="form-control"
                            :class="{
                                'form-control--invalid': ($v.formFields.email.$invalid && $v.formFields.email.$dirty) ||
                                (error && error.errors && error.errors.email && loader)
                            }"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formFields.email.$invalid && $v.formFields.email.$dirty"
                            :validations="$v.formFields.email"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.email && loader"
                            :validations="error.errors.email"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.contacts.telephone') }}</label>
                        <input
                            v-model="$v.formFields.phoneNumber.$model"
                            class="form-control"
                            :class="{
                                'form-control--invalid':
                                    $v.formFields.phoneNumber.$invalid && $v.formFields.phoneNumber.$dirty
                            }"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formFields.phoneNumber.$invalid && $v.formFields.phoneNumber.$dirty"
                            :validations="$v.formFields.phoneNumber"
                            validationType="validations.modals.registrationPopup"
                        />
                    </div>
                </div>
                <p class="form-title">{{ $t('ProfilePage.modals.newContact.delivery_details') }}</p>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.address.country') }}</label>
                        <multiselect
                            v-model="$v.country.$model"
                            class="form-control catalog-sorting__form-control"
                            :class="{
                                'form-control--invalid': $v.companyAddress.countryCode.$invalid && $v.companyAddress.countryCode.$dirty
                            }"
                            :allow-empty="true"
                            :options="countriesList"
                            label="label"
                            track-by="label"
                        >
                            <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                        </multiselect>
                        <FormControlErrors
                            v-if="$v.companyAddress.countryCode.$invalid && $v.companyAddress.countryCode.$dirty"
                            :validations="$v.companyAddress.countryCode"
                            validationType="validations.modals.registrationPopup"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.address.city') }}</label>
                        <input
                            class="form-control"
                            v-model="$v.companyAddress.city.$model"
                            :class="{
                                'form-control--invalid': $v.companyAddress.city.$invalid && $v.companyAddress.city.$dirty
                            }"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.companyAddress.city.$invalid && $v.companyAddress.city.$dirty"
                            :validations="$v.companyAddress.city"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.city && loader"
                            :validations="error.errors.city"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.address.address') }}</label>
                        <input
                            class="form-control"
                            v-model="$v.companyAddress.street.$model"
                            :class="{
                                'form-control--invalid':
                                    $v.companyAddress.street.$invalid && $v.companyAddress.street.$dirty
                            }"
                            type="text"
                            name=""
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.companyAddress.street.$invalid && $v.companyAddress.street.$dirty"
                            :validations="$v.companyAddress.street"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.street && loader"
                            :validations="error.errors.street"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.address.postal_code') }}</label>
                        <input
                            class="form-control"
                            :class="{
                                'form-control--invalid':
                                    ($v.companyAddress.postcode.$invalid && $v.companyAddress.postcode.$dirty) ||
                                    (error && error.errors && error.errors['companyAddress.postcode'] && loader)
                                    
                            }"
                            v-model="$v.companyAddress.postcode.$model"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.companyAddress.postcode.$invalid && $v.companyAddress.postcode.$dirty"
                            :validations="$v.companyAddress.postcode"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors['companyAddress.postcode'] && loader"
                            :validations="error.errors['companyAddress.postcode']"
                        />
                    </div>
                </div>
            </div>
            <!-- <div class="form-error" v-if="error && error.message && loader">
                {{ error.message }}
            </div> -->
        </form>
    </div>
</template>

<script lang="ts">
import { Component, mixins, Prop, Watch, Getter } from 'nuxt-property-decorator';

import { validationMixin } from 'vuelidate';
import { email, required, maxLength, numeric } from 'vuelidate/lib/validators';
import numberValidators from '~/utils/number-validators';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import { IProfileData, IIndividualForm, ICustomer, ICompanyAddress } from '~/types/profile-data.interface';
import { ICountryList, ICountryListItem, IFormatedCountriesList } from '~/types/countries-list.interface';
import Multiselect from 'vue-multiselect';

const validations: any = {
    formFields: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phoneNumber: { ...numberValidators() }
    },
    companyAddress: {
        countryCode: { required },
        city: { required },
        street: { required },
        postcode: { 
            required,
        }
    },
    country: { required }
};

@Component({
    validations,
    components: {
        FormControlErrors,
        FormControlServerErrors,
        Multiselect
    }
})
export default class ComponentCustomerIndividualForm extends mixins(validationMixin) {
    @Getter('customer/getError') error!: string;
    @Getter('countries-list/getCountriesList') countries!: ICountryList;

    @Prop() public formData!: IProfileData;
    
    public formFields: IIndividualForm = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    };
    public companyAddress: ICompanyAddress = {
        countryCode: '',
        city: '',
        street: '',
        postcode: ''
    };
    public country: IFormatedCountriesList | null | undefined = null;
    public loader: boolean = false;

    @Watch('formData', { deep: true, immediate: true })
    public handleFormData(val: ICustomer): void {
        if (this.formData !== null) {            
            const { firstName, lastName, email, phoneNumber } = val;
            const { countryCode, city, street, postcode } = val.companyAddress || val;

            this.formFields = {
                firstName,
                lastName,
                email,
                phoneNumber
            };

            this.companyAddress = {
                countryCode,
                city,
                street,
                postcode
            };

            this.country = this.countriesList.find((elem: any) => elem.value === countryCode);
        } else {
            this.formFields = {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: ''
            };
            this.companyAddress = {
                countryCode: '',
                city: '',
                street: '',
                postcode: ''
            };
            this.country = null;
        }

    }

    @Watch('country')
    public handleCountryCode(val: IFormatedCountriesList): void {
        this.companyAddress.countryCode = val?.value;
    }

    public errorLoaderHandler(): void {
        if(this.error && this.loader) {
            this.loader = false;
        }
    }

    public get countriesList(): IFormatedCountriesList[] {
        const countries = this.countries;
        if (countries.items && countries.items.length) {
            return countries.items.map((item: ICountryListItem) => ({ label: item.name, value: item.code }));
        } else {
            return [];
        }
    }

    public resetForm(): void {
        this.$v.$reset();
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.customer-individual-form {
    padding: 30px 0;

    .form-title {
        color: $color-dark-blue;
    }

    .form-block {
        &:last-child {
            margin-bottom: 0;
        }
    }
}

.errors-list {
    margin-top: 8px;
}

.form-error {
    font-size: 12px;
    margin-bottom: 15px;
    color: $color-pink;
}
</style>
