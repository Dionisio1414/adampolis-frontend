<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.customerInformation.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.customerInformation.first_name') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.firstName"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                            :class="{
                                'form-control--invalid':
                                    $v.formData.firstName.$invalid && $v.formData.firstName.$dirty
                            }"
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
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.customerInformation.last_name') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.lastName"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                            :class="{
                                'form-control--invalid':
                                    ($v.formData.lastName.$invalid && $v.formData.lastName.$dirty) ||
                                    (error && error.errors && error.errors.lastName && processingStatus)
                            }"
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
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.companyInfo.phone_number') }}</label>
                        <input
                            class="form-control"
                            v-model="formData.phoneNumber"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                            :class="{
                                'form-control--invalid':
                                    ($v.formData.phoneNumber.$invalid && $v.formData.phoneNumber.$dirty) ||
                                    (error && error.errors && error.errors.phoneNumber && processingStatus)
                            }"
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
                    <div class="form-col">
                        <label class="form-label form-label--required">{{ $t('ProfilePage.modals.newContact.email') }}</label>
                        <input
                            v-model="formData.email"
                            class="form-control"
                            type="text"
                            @focus="errorLoaderHandler"
                            @change="errorLoaderHandler"
                            :class="{
                                'form-control--invalid': 
                                    ($v.formData.email.$invalid && $v.formData.email.$dirty) ||
                                    (error && error.errors && error.errors.email && loader)
                            }"
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
import Spinner from '~/components/Spinner.vue';

import { IProfileData, IProfileForm, IProfileUpdateRequest } from '@/types/profile-data.interface';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import numberValidators from '~/utils/number-validators';

import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';

const validations: any = {
    formData: {
        firstName: { required },
        lastName: { required },
        phoneNumber: { ...numberValidators() },
        email: { required, email },
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
export default class ComponentModalCustomerInfo extends mixins(validationMixin) {
    @Getter('modal-update-profile/getError') public error!: any;
    @Getter('modal-update-profile/getStatus') public status!: EStatus;

    @Prop() public modalData!: IProfileData;

    @Action('modal-update-profile/updateProfile') updateProfile!: (formData: IProfileUpdateRequest) => Promise<void>;

    public processingStatus: boolean = false;

    public formData: IProfileForm = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
    };

    public get isProcessing(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public errorLoaderHandler(): void {
        if(this.error && this.error.message) {
            this.processingStatus = false;
        }
    }

    public mounted(): void  {
        this.formData = { ...(this.modalData as IProfileForm) };
    }

    public async submit(): Promise<any> {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            const body = { ...this.formData } as IProfileForm;
            delete body.id;

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

::v-deep {
    .modal-footer {
        padding-left: 0;
        padding-right: 0;
    }
}
</style>
