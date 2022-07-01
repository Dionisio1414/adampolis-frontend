<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.deliveryAddress.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-title">{{ $t('ProfilePage.modals.deliveryAddress.contact_subtitle') }}</div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.name') }}</label>
                        <input
                            v-model="formData.firstName"
                            class="form-control"
                            type="text"
                            :class="{
                                'form-control--invalid': 
                                    ($v.formData.firstName.$invalid && $v.formData.firstName.$dirty) ||
                                    (error && error.errors && error.errors.firstName && processingStatus)
                            }"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formData.firstName.$invalid && $v.formData.firstName.$dirty"
                            :validations="$v.formData.firstName"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.firstName && processingStatus"
                            :validations="error.errors.firstName"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.surname') }}</label>
                        <input
                            v-model="formData.lastName"
                            class="form-control"
                            type="text"
                            :class="{
                                'form-control--invalid': 
                                    ($v.formData.lastName.$invalid && $v.formData.lastName.$dirty) ||
                                    (error && error.errors && error.errors.lastName && processingStatus)
                            }"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formData.lastName.$invalid && $v.formData.lastName.$dirty"
                            :validations="$v.formData.lastName"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.lastName && processingStatus"
                            :validations="error.errors.lastName"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.email') }}</label>
                        <input
                            v-model="formData.email"
                            class="form-control"
                            type="text"
                            :class="{
                                'form-control--invalid': 
                                    ($v.formData.email.$invalid && $v.formData.email.$dirty) ||
                                    (error && error.errors && error.errors.email && processingStatus)
                            }"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formData.email.$invalid && $v.formData.email.$dirty"
                            :validations="$v.formData.email"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.email && processingStatus"
                            :validations="error.errors.email"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.newContact.phone_number') }}</label>
                        <input
                            v-model="formData.phoneNumber"
                            class="form-control"
                            type="text"
                            :class="{
                                'form-control--invalid':
                                    ($v.formData.phoneNumber.$invalid && $v.formData.phoneNumber.$dirty) ||
                                    (error && error.errors && error.errors.phoneNumber && processingStatus)
                            }"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                        />
                        <FormControlErrors
                            v-if="$v.formData.phoneNumber.$invalid && $v.formData.phoneNumber.$dirty"
                            :validations="$v.formData.phoneNumber"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.phoneNumber && processingStatus"
                            :validations="error.errors.phoneNumber"
                        />
                    </div>
                </div>
                <div class="form-title">{{ $t('ProfilePage.modals.deliveryAddress.address_subtitle') }}</div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.companyInfo.country') }}</label>
                        <multiselect
                            v-model="country"
                            class="form-control catalog-sorting__form-control"
                            :class="{
                                'form-control--invalid': $v.country.$invalid && $v.country.$dirty
                            }"
                            :allow-empty="true"
                            :options="countriesList"
                            :placeholder="$t('MainFilter.vin.placeholder')"
                            label="label"
                            track-by="label"
                            @select="errorLoaderHandler"
                        >
                            <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                        </multiselect>
                        <FormControlErrors
                            v-if="$v.country.$invalid && $v.country.$dirty"
                            :validations="$v.country"
                            validationType="validations.modals.registrationPopup"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.companyInfo.city') }}</label>
                        <input
                            v-model="companyAddress.city"
                            class="form-control"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                            :class="{
                                'form-control--invalid':
                                    ($v.companyAddress.city.$invalid && $v.companyAddress.city.$dirty) ||
                                    (error && error.errors && error.errors.city && processingStatus)
                            }"
                        />
                        <FormControlErrors
                            v-if="$v.companyAddress.city.$invalid && $v.companyAddress.city.$dirty"
                            :validations="$v.companyAddress.city"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.city && processingStatus"
                            :validations="error.errors.city"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.companyInfo.address') }}</label>
                        <input
                            v-model="companyAddress.street"
                            class="form-control"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                            :class="{
                                'form-control--invalid':
                                    ($v.companyAddress.street.$invalid && $v.companyAddress.street.$dirty) ||
                                    (error && error.errors && error.errors.street && processingStatus)
                            }"
                        />
                        <FormControlErrors
                            v-if="$v.companyAddress.street.$invalid && $v.companyAddress.street.$dirty"
                            :validations="$v.companyAddress.street"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.street && processingStatus"
                            :validations="error.errors.street"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.companyInfo.postal_code') }}</label>
                        <input
                            v-model="companyAddress.postcode"
                            class="form-control"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                            :class="{
                                'form-control--invalid':
                                    ($v.companyAddress.postcode.$invalid && $v.companyAddress.postcode.$dirty) ||
                                    (error && error.errors && error.errors.postcode && processingStatus)
                            }"
                        />
                        <FormControlErrors
                            v-if="$v.companyAddress.postcode.$invalid && $v.companyAddress.postcode.$dirty"
                            :validations="$v.companyAddress.postcode"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.postcode && processingStatus"
                            :validations="error.errors.postcode"
                        />
                    </div>
                </div>
                <transition name="fade">
                    <div v-if="isProcessing" class="form-spinner">
                        <Spinner></Spinner>
                    </div>
                </transition>
            </div>
        </template>
        <template #footer>
            <modal-footer
                @cancel="close"
                @submit="submit"
                :disabled="isProcessing"
                :btnCancelTitle="$t('ProfilePage.buttons.cancel')"
                :btnSubmitTitle="$t('ProfilePage.buttons.submit')"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import { Component, Prop, Getter, mixins, Action, Emit } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import Multiselect from 'vue-multiselect';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import Spinner from '~/components/Spinner.vue';

import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import numberValidators from '~/utils/number-validators';

import { IAddressForm, ICompanyAddress } from '~/types/profile-data.interface';
import { ICountryList, ICountryListItem, IFormatedCountriesList } from '~/types/countries-list.interface';

import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';

const validations: any = {
    formData: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phoneNumber: { ...numberValidators() }
    },
    companyAddress: {
        city: { required },
        street: { required },
        countryCode: { required },
        postcode: { required }
    },
    country: { required }
};

interface IEditForm {
    body: ICustomerRequestBody;
    id?: number;
}

interface IFormData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}

interface ICustomerRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    countryCode: string;
    postcode: string;
    street: string;
}

@Component({
    validations,
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter,
        Multiselect,
        FormControlErrors,
        FormControlServerErrors,
        Spinner
    }
})
export default class ComponentModalDeliveryAddress extends mixins(validationMixin) {
    @Getter('countries-list/getCountriesList') public countries!: ICountryList;

    @Getter('modal-addresses-form/getError') public error!: Error;
    @Getter('modal-addresses-form/getStatus') public status!: EStatus;
    @Getter('modal-addresses-form/getMessage') public message!: string;

    @Action('modal-addresses-form/addProfileAddress') public addProfileAddress!: (payload: ICustomerRequestBody) => Promise<void>;
    @Action('modal-addresses-form/editProfileAddress') public editProfileAddress!: (payload: IEditForm) => Promise<void>;

    @Prop() public address!: IAddressForm;
    @Prop() public isEdit!: boolean;

    public processingStatus: boolean = false;

    public formData: IFormData = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    };

    public companyAddress: ICompanyAddress = {
        city: '',
        countryCode: '',
        postcode: '',
        street: ''
    };

    public country: IFormatedCountriesList | undefined = {
        label: '',
        value: ''
    };

    public get isProcessing(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public get countriesList(): IFormatedCountriesList[] {
        const countries: ICountryList = this.countries;
        if (countries.items && countries.items.length) {
            return countries.items.map((item: ICountryListItem) => ({ label: item.name, value: item.code }));
        } else {
            return [];
        }
    }

    public errorLoaderHandler(): void {
        if(this.error && this.error.message) {
            this.processingStatus = false;
        }
    }

    public mounted(): void {
        if(this.isEdit) {
            const { firstName, lastName, email, phoneNumber, city, street, countryCode, postcode } = this.address;
            this.companyAddress = {
                city,
                street,
                countryCode,
                postcode
            };
            this.formData = {
                firstName,
                lastName,
                email,
                phoneNumber
            };
            this.country = this.countriesList.find(elem => elem.value === this.address.countryCode);
        }
    }

    public async submit(): Promise<void> {
        const body = { 
            ...this.formData, 
            ...this.companyAddress,
            countryCode: this.country?.value || 'LT' 
        };
        
        this.$v.$touch();
        this.processingStatus = true;
        this.companyAddress.countryCode = this.country?.value;

        if(!this.$v.$invalid) {
            if(this.isEdit) {
                const { id } = this.address;
                await this.editProfileAddress({ body, id });
            } else {
                await this.addProfileAddress(body);
            }

            if(this.status === EStatus.SUCCESS) {
                this.close();
                this.$notify({
                    type: EMessageTypes.SUCCESS,
                    title: this.$t('ProfilePage.deliveryDetails.modals.add_address_label').toString()
                });
            } else {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: this.message
                });
            }
        }
    }

    @Emit('close')
    public close(): void {}
}
</script>
<style lang="scss" scoped>
.form-spinner {
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.errors-list {
    margin-top: 5px;
}
</style>
