<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.companyInfo.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.company_name') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.companyName"
                            type="text"
                            name=""
                            :class="{
                                'form-control--invalid':
                                    $v.formData.companyName.$invalid && $v.formData.companyName.$dirty
                            }"
                        />
                        <FormControlErrors
                            v-if="$v.formData.companyName.$invalid && $v.formData.companyName.$dirty"
                            :validations="$v.formData.companyName"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.companyName && loader"
                            :validations="error.errors.companyName"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.company_code') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.companyCode"
                            type="text"
                            name=""
                            :class="{
                                'form-control--invalid':
                                    $v.formData.companyCode.$invalid && $v.formData.companyCode.$dirty
                            }"
                        />
                        <FormControlErrors
                            v-if="$v.formData.companyCode.$invalid && $v.formData.companyCode.$dirty"
                            :validations="$v.formData.companyCode"
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
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.pvm_code') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.vatCode"
                            type="text"
                            name=""
                            :class="{
                                'form-control--invalid': $v.formData.vatCode.$invalid && $v.formData.vatCode.$dirty
                            }"
                        />
                        <FormControlErrors
                            v-if="$v.formData.vatCode.$invalid && $v.formData.vatCode.$dirty"
                            :validations="$v.formData.vatCode"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.vatCode && loader"
                            :validations="error.errors.vatCode"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.phone_number') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.phoneNumber"
                            type="text"
                            name=""
                            :class="{
                                'form-control--invalid':
                                    $v.formData.phoneNumber.$invalid && $v.formData.phoneNumber.$dirty
                            }"
                        />

                        <FormControlErrors
                            v-if="$v.formData.phoneNumber.$invalid && $v.formData.phoneNumber.$dirty"
                            :validations="$v.formData.phoneNumber"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.phoneNumber && loader"
                            :validations="error.errors.phoneNumber"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.country') }}</label>
                        <multiselect
                            class="form-control catalog-sorting__form-control"
                            v-model="formData.companyAddress.countryCode"
                            :allow-empty="true"
                            :options="countriesList"
                            :placeholder="$t('ProfilePage.modals.companyInfo.country')"
                            label="label"
                            track-by="label"
                            :class="{
                                'form-control--invalid':
                                    $v.formData.companyAddress.countryCode.$invalid &&
                                    $v.formData.companyAddress.countryCode.$dirty
                            }"
                        >
                            <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                        </multiselect>
                    </div>
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.city') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.companyAddress.city"
                            type="text"
                            name=""
                            :class="{
                                'form-control--invalid':
                                    $v.formData.companyAddress.city.$invalid && $v.formData.companyAddress.city.$dirty
                            }"
                        />
                        <FormControlErrors
                            v-if="$v.formData.companyAddress.city.$invalid && $v.formData.companyAddress.city.$dirty"
                            :validations="$v.formData.companyAddress.city"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.companyAddress.city && loader"
                            :validations="error.errors.companyAddress.city"
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.address') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.companyAddress.street"
                            type="text"
                            name=""
                            :class="{
                                'form-control--invalid':
                                    $v.formData.companyAddress.street.$invalid &&
                                    $v.formData.companyAddress.street.$dirty
                            }"
                        />
                        <FormControlErrors
                            v-if="
                                $v.formData.companyAddress.street.$invalid && $v.formData.companyAddress.street.$dirty
                            "
                            :validations="$v.formData.companyAddress.street"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.companyAddress.street && loader"
                            :validations="error.errors.companyAddress.street"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.postal_code') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.companyAddress.postcode"
                            type="text"
                            name=""
                            :class="{
                                'form-control--invalid':
                                    $v.formData.companyAddress.postcode.$invalid &&
                                    $v.formData.companyAddress.postcode.$dirty
                            }"
                        />
                        <FormControlErrors
                            v-if="
                                $v.formData.companyAddress.postcode.$invalid &&
                                    $v.formData.companyAddress.postcode.$dirty
                            "
                            :validations="$v.formData.companyAddress.postcode"
                            validationType="validations.modals.registrationPopup"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.companyAddress.postcode && loader"
                            :validations="error.errors.companyAddress.postcode"
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
                :btnSubmitTitle="$t('ProfilePage.buttons.update')"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import { Component, Prop, Action, mixins, Getter, Emit } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import Multiselect from 'vue-multiselect';

import { IProfileData, IProfileForm, IProfileUpdateRequest } from '@/types/profile-data.interface';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import numberValidators from '~/utils/number-validators';
import Spinner from '~/components/Spinner.vue';

import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';
import { ICountryList, ICountryListItem, IFormatedCountriesList } from '~/types/countries-list.interface';

const validations: any = {
    formData: {
        companyName: { required },
        companyCode: { required },
        phoneNumber: { ...numberValidators() },
        vatCode: { required },
        companyAddress: {
            countryCode: { required },
            city: { required },
            postcode: { required },
            street: { required }
        }
    }
};

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
export default class ComponentModalCompanyInfo extends mixins(validationMixin) {
    @Getter('modal-update-profile/getError') error!: string;
    @Getter('modal-update-profile/getStatus') status!: EStatus;
    @Getter('countries-list/getCountriesList') countries!: ICountryList;

    @Action('modal-update-profile/updateProfile') updateProfile!: (formData: IProfileUpdateRequest) => Promise<void>;

    @Prop() public modalData!: IProfileData;

    public formData: IProfileForm = {
        companyName: '',
        companyCode: '',
        vatCode: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        companyAddress: {}
    };

    public get countriesList(): IFormatedCountriesList[] {
        const countries = this.countries;
        if (countries.items && countries.items.length) {
            return countries.items.map((item: ICountryListItem) => ({ label: item.name, value: item.code }));
        } else {
            return [];
        }
    }

    public get isProcessing(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public getCountryCode(): string {
        //@ts-ignore
        return this.formData.companyAddress.countryCode?.value;
    }

    public mounted(): void {
        this.formData = { ...(this.modalData as IProfileForm) };

        if (this.modalData?.companyAddress?.countryCode && this.countriesList?.length) {
            let countryCode = this.modalData.companyAddress.countryCode;

            if (this.formData && this.formData.companyAddress) {
                this.formData.companyAddress.countryCode = this.countriesList.find(elem => elem.value === countryCode);
            }
        }
    }

    public async submit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            const body = { ...this.formData } as IProfileForm;
            delete body.id;

            if (body && body.companyAddress) body.companyAddress.countryCode = this.getCountryCode;
            await this.updateProfile({ body, id: this.formData.id });

            if (this.status === EStatus.SUCCESS) {
                this.close();
                this.$notify({
                    type: EMessageTypes.SUCCESS,
                    title: 'Data was updated'
                });
            } else {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: 'Something went wrong'
                });
            }
        }
    }

    @Emit('close') public close(): void {}
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

::v-deep {
    .modal-footer {
        padding-left: 0;
        padding-right: 0;
    }
}
</style>
