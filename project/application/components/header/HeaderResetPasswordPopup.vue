<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('modals.resetPassword.caption') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <HeaderResetPasswordForm ref="form" />
            <transition name="fade">
                <div v-if="getSumbitStatus" class="form-spinner">
                    <Spinner></Spinner>
                </div>
            </transition>
        </template>
        <template #footer>
            <div class="actions">
                <button type="button" class="btn btn--dark-grey" @click="cancel">
                    {{ $t('page.buttons.cancelBtnText') }}
                </button>
                <button class="btn btn--primary" @click="submit">
                    {{ $t('modals.resetPassword.btnSubmitText') }}
                </button>
            </div>
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import { IPayloadResetPassword, IResetPassword } from '~/types/form-reset-password.interface';
import { Component, Prop, Provide, Action, Getter } from 'nuxt-property-decorator';
import HeaderResetPasswordForm from './HeaderResetPasswordForm.vue';
import ModalWindow from '~/components/modals/ModalWindow.vue';
import ModalHeader from '~/components/modals/ModalHeader.vue';
import Spinner from '~/components/Spinner.vue';

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        HeaderResetPasswordForm,
        Spinner
    }
})
export default class HeaderResetPasswordPopup extends Vue {
    @Getter('reset-pasword/getError') public error!: any;
    @Getter('reset-pasword/isStatus') public status!: EStatus;

    @Action('reset-pasword/onPasswordReset') public onPasswordResetHandler!: (payload: IPayloadResetPassword) => Promise<any>

    @Prop() public modal!: any;
    @Prop() public token!: string;

    public $modal: any;

    @Provide('RESET_PASSWORD_SUBMIT')
    public async submitForm(fields: IResetPassword): Promise<void> {
        await this.onPasswordResetHandler({ fields, token: this.token });
        if (this.status === EStatus.SUCCESS) {
            this.close();
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: this.$t('modals.resetPassword.succesResetPassword').toString()
            });
            this.$router.push('/');
        } else {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.error?.error?.message
            });
        }
    }

    public get getSumbitStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public submit(): void {
        (this.$refs.form as HeaderResetPasswordForm).triggerForm();
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
@import '~/assets/styles/variables';
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
.actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0 0 0;
    .btn {
        width: 100%;
        max-width: 164px;
    }
}
</style>
