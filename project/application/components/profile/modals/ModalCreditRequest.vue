<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.creditRequest.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.creditRequest.desired_amount') }}</label>
                        <input 
                            v-model="amount" 
                            class="form-control" 
                            :class="{
                                'form-control--invalid': $v.amount.$invalid && $v.amount.$dirty
                            }"
                            type="text" 
                            name="amount"
                            @focus="$v.amount.$reset"
                            @change="$v.amount.$reset"
                        >
                        <FormControlErrors
                            v-if="$v.amount.$invalid && $v.amount.$dirty"
                            :validations="$v.amount"
                            validationType="validations.modals.registrationPopup"
                        />
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.modals.creditRequest.deferral_time') }}</label>
                        <input 
                            v-model="period" 
                            class="form-control"
                            :class="{
                                'form-control--invalid': $v.period.$invalid && $v.period.$dirty
                            }" 
                            type="text" 
                            name="period"
                            @focus="$v.period.$reset"
                            @change="$v.period.$reset"
                        >
                        <FormControlErrors
                            v-if="$v.period.$invalid && $v.period.$dirty"
                            :validations="$v.period"
                            validationType="validations.modals.registrationPopup"
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
import { Component, Emit, Prop, mixins, Action, Getter } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import FormControlErrors from '~/components/FormControlErrors.vue';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { IProfileCreditLinePayload } from '~/types/profile-data.interface';
import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';
import Spinner from '~/components/Spinner.vue';

const validations: any = {
    amount: { required },
    period: { required }
}

@Component({
    validations,
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter,
        FormControlErrors,
        Spinner
    }
})
export default class ComponentModalCreditRequest extends mixins(validationMixin) {
    @Getter('page-profile-credit-line/getError') public error!: any;
    @Getter('page-profile-credit-line/getStatus') public status!: EStatus;
    @Getter('page-profile-credit-line/getProfileCreditLineMessage') public message!: string | null;

    @Prop() public modal!: any;

    @Action('page-profile-credit-line/requestCreditLine') public requestCreditLine!: (payload: IProfileCreditLinePayload) => Promise<void>

    public amount: string = '';
    public period: string = '';

    @Emit('close') public close(): void {}

    public get isProcessing(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public async submit(): Promise<void> {
        this.$v.$touch();
        
        if(!this.$v.$invalid) {
            await this.requestCreditLine({
                amount: this.amount,
                period: this.period
            });

            switch(this.status) {
                case EStatus.SUCCESS:
                    this.close();
                    this.$notify({
                        type: EMessageTypes.SUCCESS,
                        title: this.message?.toString()
                    });
                    return;
                case EStatus.ERROR:
                    this.$notify({
                        type: EMessageTypes.DANGER,
                        title: this.error?.error?.message
                    });
                    return;
            }
        }
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

.form-error {
    font-size: 12px;
    margin-bottom: 15px;
    color: $color-pink;
}
</style>
