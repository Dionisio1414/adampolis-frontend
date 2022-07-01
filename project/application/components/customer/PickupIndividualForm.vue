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
import { email, required } from 'vuelidate/lib/validators';
import numberValidators from '~/utils/number-validators';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import { IProfileData, IIndividualForm, ICustomer, ICompanyAddress } from '~/types/profile-data.interface';
import { ICountryList, IFormatedCountriesList } from '~/types/countries-list.interface';

const validations: any = {
    formFields: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phoneNumber: { ...numberValidators() }
    }
};

@Component({
    validations,
    components: {
        FormControlErrors,
        FormControlServerErrors
    }
})
export default class ComponentPickupIndividualForm extends mixins(validationMixin) {
    @Getter('customer/getError') error!: string;

    @Prop() public formData!: IProfileData;
    
    public formFields: IIndividualForm = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    };
    public loader: boolean = false;

    @Watch('formData', { deep: true, immediate: true })
    public handleFormData(val: ICustomer): void {
        if (this.formData !== null) {
            const { firstName, lastName, email, phoneNumber } = val;

            this.formFields = {
                firstName,
                lastName,
                email,
                phoneNumber
            };
        }
    }

    public errorLoaderHandler(): void {
        if(this.error && this.loader) {
            this.loader = false;
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
