<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('modals.changePassword.caption') }}
                </template>
                <template #description>
                    {{ $t('modals.changePassword.description') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <HeaderChangePasswordForm ref="form" />
            <transition name="fade">
                <div v-if="getSumbitStatus" class="form-spinner">
                    <Spinner />
                </div>
            </transition>
        </template>
        <template #footer>
            <div class="actions">
                <button type="button" class="btn btn--pink" @click="submit">
                    {{ $t('modals.changePassword.buttonText') }}
                </button>
            </div>
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import { Component, Prop, Provide } from 'nuxt-property-decorator';
import HeaderChangePasswordForm from './HeaderChangePasswordForm.vue';
import ModalWindow from '~/components/modals/ModalWindow.vue';
import ModalHeader from '~/components/modals/ModalHeader.vue';
import Spinner from '~/components/Spinner.vue';

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        HeaderChangePasswordForm,
        Spinner
    },
    computed: {
        ...mapGetters({
            error: 'reset-pasword/getError',
            status: 'reset-pasword/isStatus'
        })
    },
    methods: {
        ...mapActions({
            onPasswordResetHandler: 'reset-pasword/onEmailPasswordReset'
        })
    }
})
export default class HeaderChangePasswordPopup extends Vue {
    @Prop()
    public modal!: any;
    @Prop()
    public modalName!: any;

    public $modal: any;
    public status: any;
    public error: any;
    public onPasswordResetHandler: any;

    @Provide('CHANGE_PASSWORD_SUBMIT')
    public async submitForm(val: any): Promise<void> {
        await this.onPasswordResetHandler(val);
        if (this.status === EStatus.SUCCESS) {
            this.close();
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: 'Email has been sent to your inbox'
            });
        } else {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.error.message
            });
        }
    }

    public get getSumbitStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public submit(): void {
        (this.$refs.form as HeaderChangePasswordForm).triggerForm();
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
    flex-direction: column;
    align-items: center;
    padding: 30px 0 24px 0;
    .btn {
        width: 100%;
    }
}
</style>
