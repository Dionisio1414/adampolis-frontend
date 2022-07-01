<template>
    <form class="form">
        <div class="form-row">
            <div class="form-col">
                <label class="form-label">{{ $t('modals.resetPassword.newPasswordLabel') }}</label>
                <SwitchablePasswordInput
                    id="new-password"
                    :inputClassNames="{ 'form-control--invalid': $v.formFields.password.first.$invalid && $v.formFields.password.first.$dirty }"
                    v-model.trim="formFields.password.first"
                    @componentBlur="touchField('first')"
                    @componentFocus="errorLoaderHandler"
                />
                <FormControlErrors
                    v-if="$v.formFields.password.first.$invalid && $v.formFields.password.first.$dirty"
                    :validations="$v.formFields.password.first"
                    validationType="validations.modals.registrationPopup.password"
                />
            </div>
            <div class="form-col">
                <label class="form-label">{{ $t('modals.resetPassword.repeatPasswordLabel') }}</label>
                <SwitchablePasswordInput
                    id="repeat-password"
                    :inputClassNames="{ 'form-control--invalid': $v.formFields.password.$invalid && $v.formFields.password.$dirty }"
                    v-model.trim="formFields.password.second"
                    @componentBlur="touchField('second')"
                    @componentFocus="errorLoaderHandler"
                />
                <FormControlErrors
                    v-if="$v.formFields.password.second.$invalid && $v.formFields.password.second.$dirty"
                    :validations="$v.formFields.password.second"
                    validationType="validations.modals.registrationPopup.password"
                />
            </div>
        </div>
        <div class="form-error" v-if="error && error.message && loader">
            {{ error.message }}
        </div>
    </form>
</template>

<script lang="ts">
import { Component, mixins, Inject, Getter } from 'nuxt-property-decorator';
import { IResetPassword } from '~/types/form-reset-password.interface';
import { validationMixin } from 'vuelidate';
import { sameAs } from 'vuelidate/lib/validators';
import passwordValidations from '~/utils/password-validators';
import FormControlErrors from '~/components/FormControlErrors.vue';
// import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import SwitchablePasswordInput from '~/components/SwitchablePasswordInput.vue';

const validations: any = {
    formFields: {
        password: {
            first: { ...passwordValidations() },
            second: {
                ...passwordValidations(),
                sameAsPassword: sameAs('first')
            }
        }
    }
}

@Component({
    validations,
    components: {
        FormControlErrors,
        // FormControlServerErrors,
        SwitchablePasswordInput
    }
})
export default class HeaderResetPasswordForm extends mixins(validationMixin) {
    @Getter('modal-auth/getError') public error: any;
    @Inject('RESET_PASSWORD_SUBMIT') public submitForm!: (formValue: IResetPassword) => void;
    
    public loader: boolean = true;
    public formFields: IResetPassword = {
        password: {
            first: '',
            second: ''
        }
    }

    public errorLoaderHandler(): void {
        if(this.error && this.error.message) {
            this.loader = false;
        }
    }

    public touchField(fieldName: string): void {
        this.$v.formFields!.password![fieldName]!.$touch();
    }

    public triggerForm(): void {
        this.loader = true;
        this.$v.$touch();
        if(!this.$v.$invalid) {
            this.submitForm(this.formFields);
        } else {
            return;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.form {
    &-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .form-group {
            flex: 1 1 100%;
            .form-label {
                font-weight: normal;
            }
        }
    }
    &-col {
        flex: 0 1 calc(50% - 20px);
        .errors-list {
            margin-top: 8px;
        }
    }
    &-block {
        margin-bottom: 30px;
        .form-row {
            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }
    &-title {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        margin-bottom: 20px;
        color: #253a49;
    }
    &-label {
        font-weight: 600;
        line-height: 19px;
        margin-bottom: 5px;
        color: #253a49;
    }
    &-error {
        font-size: 12px;
        margin-bottom: 15px;
        color: $color-pink;
    }
}
</style>
