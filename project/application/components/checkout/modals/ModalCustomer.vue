<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.newContact.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.name') }}</label>
                        <input
                            v-model="$v.formFields.firstName.$model"
                            class="form-control"
                            type="text"
                            name=""
                            :class="{
                                'form-control--invalid': $v.formFields.firstName.$invalid && $v.formFields.firstName.$dirty
                            }"
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
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.surname') }}</label>
                        <input
                            v-model="$v.formFields.lastName.$model"
                            class="form-control"
                            :class="{
                                'form-control--invalid': $v.formFields.lastName.$invalid && $v.formFields.lastName.$dirty
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
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.email') }}</label>
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
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.phone_number') }}</label>
                        <input
                            v-model="$v.formFields.phoneNumber.$model"
                            :class="{
                                'form-control--invalid':
                                    $v.formFields.phoneNumber.$invalid && $v.formFields.phoneNumber.$dirty
                            }"
                            class="form-control"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formFields.phoneNumber.$invalid && $v.formFields.phoneNumber.$dirty"
                            :validations="$v.formFields.phoneNumber"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.phoneNumber && loader"
                            :validations="error.errors.phoneNumber"
                        />
                    </div>
                </div>
                <p class="form-title">{{ $t('ProfilePage.modals.newContact.company_data') }}</p>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.company_name') }}</label>
                        <input
                            class="form-control"
                            v-model="$v.formFields.companyName.$model"
                            :class="{
                                'form-control--invalid': $v.formFields.companyName.$invalid && $v.formFields.email.$dirty
                            }"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formFields.companyName.$invalid && $v.formFields.companyName.$dirty"
                            :validations="$v.formFields.companyName"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.companyName && loader"
                            :validations="error.errors.companyName"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.company_code') }}</label>
                        <input
                            class="form-control"
                            v-model="$v.formFields.companyCode.$model"
                            :class="{
                                'form-control--invalid':
                                    $v.formFields.companyCode.$invalid && $v.formFields.companyCode.$dirty
                            }"
                            type="text"
                            name=""
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formFields.companyCode.$invalid && $v.formFields.companyCode.$dirty"
                            :validations="$v.formFields.companyCode"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.companyCode && loader"
                            :validations="error.errors.companyCode"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('modals.registration.company.code_ndc') }}</label>
                        <input
                            class="form-control"
                            v-model="$v.formFields.vatCode.$model"
                            :class="{
                                'form-control--invalid': $v.formFields.vatCode.$invalid && $v.formFields.vatCode.$dirty
                            }"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formFields.vatCode.$invalid && $v.formFields.vatCode.$dirty"
                            :validations="$v.formFields.vatCode"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.vatCode && loader"
                            :validations="error.errors.vatCode"
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
                <div class="form-row">
                    <label class="form-label">{{ $t('ProfilePage.modals.newContact.info') }}</label>
                    <textarea v-model="notes" class="form-control" rows="8" type="text" name="" />
                </div>
            </div>
        </template>
        <template #footer>
            <modal-footer
                @cancel="cancel"
                @submit="submit"
                :btnCancelTitle="$t('ProfilePage.buttons.cancel')"
                :btnSubmitTitle="$t('ProfilePage.buttons.submit')"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import { Component, Watch, Getter, mixins, Action } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import Multiselect from 'vue-multiselect';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';

import { validationMixin } from 'vuelidate';
import { required, email, maxLength, numeric } from 'vuelidate/lib/validators';
import numberValidators from '~/utils/number-validators';

import { ICompanyAddress, ICustomer, IProfileForm } from '~/types/profile-data.interface';
import { ICountryList, ICountryListItem, IFormatedCountriesList } from '~/types/countries-list.interface';
import { EMessageTypes } from '~/constants/message-types';

const validations: any = {
    formFields: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phoneNumber: { ...numberValidators() },
        companyName: { required },
        companyCode: { required },
        vatCode: { required }
    },
    companyAddress: {
        countryCode: { required },
        city: { required },
        street: { required },
        postcode: { 
            required, 
            maxLength: maxLength(5),
            numeric 
        }
    },
    country: { required }
};

@Component({
    validations,
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter,
        Multiselect,
        FormControlErrors,
        FormControlServerErrors
    }
})
export default class ComponentModalCustomer extends mixins(validationMixin) {
    @Getter('countries-list/getCountriesList') public countries!: ICountryList;
    @Getter('customer/getError') error!: string;
    @Getter('cart/getToken') public cartToken!: string | null;
    @Getter('customer/getError') public customerError!: any;
    @Getter('customer/getCustomer') public customer!: ICustomer;

    @Action('customer/addCustomer') public addCustomer!: (payload: any) => Promise<void>;

    public formFields: IProfileForm = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        companyCode: '',
        vatCode: ''
    };
    public companyAddress: ICompanyAddress = {
        countryCode: '',
        city: '',
        street: '',
        postcode: ''
    };
    public country: IFormatedCountriesList | null | undefined = null;
    public notes: string = '';
    public loader: boolean = true;

    @Watch('country')
    public handleCountryCode(val: IFormatedCountriesList): void {
        this.companyAddress.countryCode = val.value;
    }

    public get countriesList(): IFormatedCountriesList[] {
        const countries = this.countries;
        if (countries.items && countries.items.length) {
            return countries.items.map((item: ICountryListItem) => ({ label: item.name, value: item.code }));
        } else {
            return [];
        }
    }

    public errorLoaderHandler(): void {
        if(this.error && this.loader) {
            this.loader = false;
        }
    }

    public async submit(): Promise<void | boolean> {
        this.$v.$touch();
        this.loader = true;
        if(!this.$v.$invalid) {
            const body = {
                parent: this.customer.id ? this.customer.id : null,
                ...this.formFields,
                isCompany: true,
                companyAddress: { ...this.companyAddress }
            };
            await this.addCustomer({ body, cartToken: this.cartToken });

            if(this.customerError) {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: this.customerError.message
                });

                return false;
            } else {
                this.close();
            }
        }
        
    }

    public close(): void {
        this.$emit('close');
    }

    public cancel(): void {
        this.$emit('close');
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.errors-list {
    margin-top: 8px;
}

.form-error {
    font-size: 12px;
    margin-bottom: 15px;
    color: $color-pink;
}
</style>
