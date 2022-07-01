<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.deleteAccount.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-row">
                    <p class="text">{{ $t('ProfilePage.modals.deleteAccount.message') }}</p>
                </div>
                <div class="form-row">
                    <label class="form-label">{{ $t('ProfilePage.modals.deleteAccount.email') }}</label>
                    <input
                        v-model="userEmail"
                        class="form-control"
                        type="text"
                        name=""
                        key=""
                        :class="{
                            'form-control--invalid': $v.userEmail.$invalid && $v.userEmail.$dirty
                        }"
                    />
                    <FormControlErrors
                        v-if="$v.userEmail.$invalid && $v.userEmail.$dirty"
                        :validations="$v.userEmail"
                        validationType="validations.modals.registrationPopup"
                    />
                    <FormControlServerErrors
                        v-if="error && error.errors && error.errors.newPassword"
                        :validations="error.errors"
                    />
                </div>
            </div>
            <transition name="fade">
                <div v-if="processingRequest" class="form-spinner">
                    <Spinner></Spinner>
                </div>
            </transition>
        </template>
        <template #footer>
            <modal-footer
                @cancel="cancel"
                @submit="submit"
                :btnCancelTitle="$t('ProfilePage.buttons.cancel')"
                :btnSubmitTitle="$t('ProfilePage.buttons.delete')"
                btnSubmitClass="btn--pink"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import { Component, mixins, Getter, Action } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import Spinner from '~/components/Spinner.vue';

import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';

interface IDeactivateForm {
    email: string;
}

const validations: any = {
    userEmail: { required, email }
};

@Component({
    validations,
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter,
        FormControlErrors,
        FormControlServerErrors,
        Spinner
    }
})
export default class ComponentModalDeactivateAccount extends mixins(validationMixin) {
    @Getter('modal-deactivate-account/getError') public error!: string;
    @Getter('modal-deactivate-account/getMessage') public message!: string;
    @Getter('modal-deactivate-account/getStatus') public status!: EStatus;

    @Action('modal-deactivate-account/deactivateAccount') public deactivateAccount!: (formData: IDeactivateForm) => Promise<void>;

    public userEmail: string = '';

    public get processingRequest(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public async submit(): Promise<void> {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            await this.deactivateAccount({ email: this.userEmail });

            if (this.status === EStatus.SUCCESS) {
                this.close();
                this.$router.push('/');
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

    public close(): void {
        this.$emit('close');
    }

    public cancel(): void {
        this.$emit('close');
    }
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
</style>
