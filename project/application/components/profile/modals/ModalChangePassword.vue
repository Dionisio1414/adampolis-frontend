<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.changePassword.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.changePassword.current_password') }}</label>
                        <SwitchablePasswordInput
                            id="password"
                            :inputClassNames="{
                                'form-control--invalid':
                                    $v.formData.oldPassword.$invalid && $v.formData.oldPassword.$dirty
                            }"
                            v-model="formData.oldPassword"
                            @componentBlur="touchField('oldPassword')"
                        />
                        <FormControlErrors
                            v-if="$v.formData.oldPassword.$invalid && $v.formData.oldPassword.$dirty"
                            :validations="$v.formData.oldPassword"
                            validationType="validations.modals.registrationPopup.password"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.oldPassword && loader"
                            :validations="error.errors.oldPassword"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.changePassword.new_password') }}</label>
                        <SwitchablePasswordInput
                            id="confirm_password"
                            :inputClassNames="{
                                'form-control--invalid':
                                    $v.formData.newPassword.$invalid && $v.formData.newPassword.$dirty
                            }"
                            v-model="formData.newPassword"
                            @componentBlur="touchField('newPassword')"
                        />
                        <FormControlErrors
                            v-if="$v.formData.newPassword.$invalid && $v.formData.newPassword.$dirty"
                            :validations="$v.formData.newPassword"
                            validationType="validations.modals.registrationPopup.password"
                        />
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors.newPassword && loader"
                            :validations="error.errors.newPassword"
                        />
                    </div>
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
import { Component, Prop, mixins, Getter, Action } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import SwitchablePasswordInput from '~/components/SwitchablePasswordInput.vue';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';

import { IDictionary } from '~/types/dictionary.interface';
import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';

import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import passwordValidations from '~/utils/password-validators';

const validations: any = {
    formData: {
        oldPassword: { ...passwordValidations(), required },
        newPassword: { ...passwordValidations(), required }
    }
};

@Component({
    validations,
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter,
        SwitchablePasswordInput,
        FormControlErrors,
        FormControlServerErrors
    }
})
export default class ComponentModalChangePassword extends mixins(validationMixin) {
    @Getter('modal-change-password/getError') public error!: string;
    @Getter('modal-change-password/getMessage') public message!: string;
    @Getter('modal-change-password/getStatus') public status!: EStatus;
    @Action('modal-change-password/changePassword') public changePassword!: (formData: IDictionary<string>) => Promise<void>;

    public formData: IDictionary<string> = {
        oldPassword: '',
        newPassword: ''
    };

    public async submit(): Promise<void> {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            await this.changePassword(this.formData);
            if (this.status === EStatus.SUCCESS) {
                this.close();
                this.$notify({
                    type: EMessageTypes.SUCCESS,
                    title: this.message
                });
            } else {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: this.message
                });
            }
        }
    }

    public touchField(fieldName: string): void {
        this.$v.formData[fieldName]!.$touch();
    }

    public close(): void {
        this.$emit('close');
    }

    public cancel(): void {
        this.$emit('close');
    }
}
</script>

<style lang="scss" scoped></style>
