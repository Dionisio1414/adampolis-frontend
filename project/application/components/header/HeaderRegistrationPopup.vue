<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('modals.registration.caption') }}
                </template>
                <template #description>
                    {{ $t('modals.registration.description') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <HeaderRegistrationFormTabs :currentIndex="currentIndex" @index="getIndex" />
            <keep-alive>
                <component :is="currentTabComponent" :fields="fields" :status="status" ref="form"> </component>
            </keep-alive>
            <transition name="fade">
                <div v-if="processingRequest" class="form-spinner">
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
                    {{ $t('page.buttons.regBtnText') }}
                </button>
            </div>
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Provide, ProvideReactive, Getter, Action } from 'nuxt-property-decorator';
import HeaderLegalForm from './HeaderLegalForm.vue';
import HeaderIndividualForm from './HeaderIndividualForm.vue';
import HeaderRegistrationFormTabs from './HeaderRegistrationFormTabs.vue';
import { EMessageTypes } from '~/constants/message-types';
import Spinner from '~/components/Spinner.vue';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import { EStatus } from '~/constants/status';
import { ICompanyInfro } from '~/types/company-info.interface';
import { IFormRegistrationCompany } from '~/types/form-registration.interface';

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        HeaderLegalForm,
        HeaderIndividualForm,
        HeaderRegistrationFormTabs,
        Spinner
    }
})
export default class HeaderRegistrationPopup extends Vue {
    @Getter('modal-auth/getCompanyInformation') public getCompanyInformation!: ICompanyInfro | null;
    @Getter('modal-auth/registrationError') public error!: any;
    @Getter('modal-auth/companyInfoError') public companyInfoError!: any;
    @Getter('modal-auth/registrationStatus') public status!: EStatus;
    @Getter('modal-auth/companyInfoStatus') public companyInfoStatus!: EStatus;
    
    @Action('modal-auth/onRegister') public onRegisterHandler!: (payload: IFormRegistrationCompany) => Promise<void>;
    @Action('modal-auth/onCompanyInfo') public onCompanyHandler!: (code: string) => Promise<void>;
    @Action('countries-list/fetchCoutriesList') public onCountriesList!: () => Promise<void>;

    @Prop() public modal!: any;
    @Prop() public modalName!: any;

    public currentIndex: number = 0;
    public tabItems: Array<string> = ['HeaderLegalForm', 'HeaderIndividualForm'];
    public fields: ICompanyInfro | {} = {};
    public loader: boolean = false;

    // 303341878

    public get currentTabComponent(): string {
        return this.tabItems[this.currentIndex];
    }

    public get processingRequest(): boolean {
        return this.status === EStatus.PROCESSING || this.companyInfoStatus === EStatus.PROCESSING;
    }

    @ProvideReactive('STATUS')
    public get provideStatus(): EStatus {
        return this.status;
    }

    @Provide('REGISTRATION_SUBMIT')
    public async submitForm(val: IFormRegistrationCompany): Promise<void> {
        await this.onRegisterHandler(val);
        if(this.status === EStatus.SUCCESS) {
            this.close();
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: 'Success registration'
            });
        } else {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.error?.message
            });
        }
    }

    @Provide('COMPANY_CODE_HANDLER')
    public async companyCodeHandler({ target }: any): Promise<void> {
        await this.onCompanyHandler(target.value);

        if(this.getCompanyInformation) {
            this.fields = { ...this.getCompanyInformation };
        }
    }

    public submit(): void {
        if (this.currentTabComponent === 'HeaderLegalForm') {
            (this.$refs.form as HeaderLegalForm).triggerForm();
        } else {
            (this.$refs.form as HeaderIndividualForm).triggerForm();
        }
    }

    public getIndex(index: number): void {
        this.currentIndex = index;
        if (this.currentIndex === 0) {
            (this.$refs.form as HeaderLegalForm).resetForm();
        } else {
            (this.$refs.form as HeaderIndividualForm).resetForm();
        }
    }

    public close(): void {
        this.$emit('close');
    }

    public cancel(): void {
        this.$emit('close');
    }

    public created(): void {
        this.onCountriesList();
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
    flex-wrap: wrap;
    .btn {
        flex: 0 1 100%;
        &:not(:last-child) {
            margin-bottom: 15px;
        }
        @media screen and (min-width: $breakpoint-lg) {
            min-width: 164px;
            flex: 0 1 auto;
        }
    }
}

.registration-popup {
    .modal-header {
        padding: 20px 15px;

        @media screen and (min-width: $breakpoint-lg) {
            padding: 15px 20px;
        }
    }

    .modal-window {
        ::v-deep {
            .modal-window__main {
                padding-top: 30px;
            }

            .modal-window__footer {
                border-top: 1px solid rgba(203, 208, 216, 0.6);
                padding-top: 20px;
                @media screen and (min-width: $breakpoint-lg) {
                    border-top: none;
                    padding-top: 0;
                }
            }

            .form-block {
                margin-bottom: 40px;
            }

            @media screen and (min-width: $breakpoint-lg) {
                .modal-window__main {
                    padding-top: 20px;
                }
            }
        }

    }
}
</style>
