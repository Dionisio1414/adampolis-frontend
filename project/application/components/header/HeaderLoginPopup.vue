<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('modals.login.caption') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <HeaderLoginForm ref="form" />
            <transition name="fade">
                <div v-if="getSumbitStatus" class="form-spinner">
                    <Spinner />
                </div>
            </transition>
        </template>
        <template #footer>
            <div class="actions">
                <button type="button" class="btn btn--pink" @click="submit">
                    {{ $t('HeaderProfile.login') }}
                </button>
                <a href="#" class="link" @click.prevent="changePasswordPopup">
                    {{ $t('modals.login.forgoutPassword') }}

                </a>
            </div>
            <div class="description">
                <span class="description__text">{{ $t('modals.login.accountText') }}</span>
                <a href="#" class="description__link" @click.prevent="registrationPopup">
                    {{ $t('HeaderProfile.register') }}
                </a>
            </div>
            <div class="description" v-if="isCheckout">
                <a href="#" class="description__link" @click.prevent="goWithoutLogin">
                    Pirk be registracijos
                </a>
            </div>
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import { IFormLogin } from '~/types/form-registration.interface';
import Spinner from '~/components/Spinner.vue';
import { Component, Prop, Provide, ProvideReactive, Getter, Action, Watch } from 'nuxt-property-decorator';
import HeaderLoginForm from './HeaderLoginForm.vue';
import HeaderRegistrationPopup from '~/components/header/HeaderRegistrationPopup.vue';
import HeaderChangePasswordPopup from '~/components/header/HeaderChangePasswordPopup.vue';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        HeaderLoginForm,
        HeaderRegistrationPopup,
        HeaderChangePasswordPopup,
        Spinner
    }
})
export default class HeaderLoginPopup extends Vue {
    @Getter('modal-auth/isStatus') public status!: EStatus;
    @Getter('modal-auth/getError') public error!: any;
    @Action('modal-auth/onLogin') public onLoginHandler!: (val: IFormLogin) => Promise<void>;
    @Action('modal-auth/onClearError') public onClearError!: () => void;

    @Prop()
    public modal!: any;
    @Prop({ default: false })
    public isCheckout!: boolean;

    public $modal: any;

    @ProvideReactive('LOGIN_ERROR')
    public get loginError(): any {
        return this.error;
    }

    @Watch('status')
    public onWatchStatus(status: EStatus) {
        const currentPage = this.$route.path;
        console.log('currentPage', currentPage);
        
        if(status === EStatus.SUCCESS && currentPage === '/basket') this.$router.push('/checkout');
        if(status === EStatus.SUCCESS && currentPage !== '/basket' && currentPage === '/') this.$router.push('/profile/');
    }

    @Provide('LOGIN_SUBMIT')
    public async submitForm(val: IFormLogin): Promise<void> {
        await this.onLoginHandler(val);
        if (this.status === EStatus.SUCCESS) {
            this.close(false);
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: 'Success auth'
            });
        } else {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.error.message
            });
        }
    }

    public submit(): void {
        (this.$refs.form as HeaderLoginForm).triggerForm();
    }

    public close(redirect: boolean = false): void {
        this.onClearError();
        this.$emit('close', { redirect });
    }

    public cancel(): void {
        this.onClearError();
        this.$emit('close');
    }

    public get getSumbitStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public changePasswordPopup(): void {
        this.$modal.show(
            HeaderChangePasswordPopup,
            {
                modal: this.$modal
            },
            {
                resizable: false,
                adaptive: true,
                draggable: false,
                scrollable: true,
                height: 'auto',
                minWidth: 0,
                maxWidth: 388,
                shiftY: 0.5,
                transition: 'modal',
                overlayTransition: 'fade',
                clickToClose: true,
                classes: 'change-password-popup modal--mobile-full'
            }
        );
    }

    public registrationPopup(): void {
        this.$modal.show(
            HeaderRegistrationPopup,
            {
                modal: this.$modal
            },
            {
                resizable: false,
                adaptive: true,
                draggable: false,
                scrollable: true,
                height: 'auto',
                minWidth: 0,
                maxWidth: 590,
                shiftY: 0.5,
                transition: 'modal',
                overlayTransition: 'fade',
                clickToClose: true
            }
        );
    }

    public goWithoutLogin(): void {
        this.close(true);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.login-popup {
    .modal-header {
        padding: 20px 15px;
        border-bottom: none;

        @media screen and (min-width: $breakpoint-lg) {
            padding: 30px;
        }
    }

    .modal-window {
        ::v-deep {
            .modal-window__main {
                padding: 20px 15px 0px 15px;
            }

            @media screen and (min-width: $breakpoint-lg) {
                .modal-window__main {
                    padding: 0 30px;
                }
            }
        }
    }
}

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
    border-bottom: 1px solid $color-medium-gray;
    margin-bottom: 25px;
    .btn {
        width: 100%;
        margin-bottom: 20px;
    }
    .link {
        font-size: 12px;
        line-height: 17px;
        color: $color-search-bg;
    }
}

.description {
    text-align: center;
    &__text {
        margin-right: 10px;
    }
    &__link {
        font-size: 14px;
        line-height: 19px;
        color: $color-pink;
    }
}
</style>
