<template>
    <form
        class="form"
        @submit.prevent="triggerForm"
    >
        <div class="form-row">
            <div class="form-col">
                <label class="form-label">{{ $t('modals.registration.contacts.mail') }}</label>
                <input
                    v-model="formFields.email"
                    class="form-control"
                    :class="{
                        'form-control--invalid': ($v.formFields.email.$invalid && $v.formFields.email.$dirty) || (error && error.message && loader) 
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
        </div>
        <div class="form-row">
            <div class="form-col">
                <label class="form-label">{{ $t('modals.registration.contacts.password') }}</label>
                <SwitchablePasswordInput
                    id="password"
                    :inputClassNames="{ 'form-control--invalid': ($v.formFields.password.$invalid && $v.formFields.password.$dirty) || (error && error.message && loader) }"
                    v-model="formFields.password"
                    @componentBlur="touchField('password')"
                    @componentFocus="errorLoaderHandler"
                />
                <FormControlErrors
                    v-if="$v.formFields.password.$invalid && $v.formFields.password.$dirty"
                    :validations="$v.formFields.password"
                    validationType="validations.modals.registrationPopup.password"
                />
                <div class="form-error" v-if="error && error.message && loader">
                    {{ error.message }}
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <input
                    v-model="remember"
                    id="category_2"
                    type="checkbox"
                    class="form-checkbox"
                    @focus="errorLoaderHandler"
                    @change="errorLoaderHandler"
                />
                <label for="category_2" class="form-label">
                    {{ $t('modals.login.rememberUser') }}
                </label>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { Component, mixins, Inject, InjectReactive } from 'nuxt-property-decorator';
import { IFormLogin } from '~/types/form-registration.interface';
import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';
import passwordValidations from '~/utils/password-validators';
import SwitchablePasswordInput from '~/components/SwitchablePasswordInput.vue';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';

const validations: any = {
    formFields: {
        email: { email, required },
        password: { ...passwordValidations() }
    }
}

@Component({
    validations,
    components: {
        SwitchablePasswordInput,
        FormControlErrors,
        FormControlServerErrors
    }
})
export default class HeaderLoginForm extends mixins(validationMixin) {
    @Inject('LOGIN_SUBMIT') public submitForm!: (formValue: IFormLogin) => void
    @InjectReactive('LOGIN_ERROR') public error: any;

    public loader: boolean = true;
    public remember: boolean = false;

    public formFields: IFormLogin = {
        email: '',
        password: ''
    }

    public touchField(fieldName: string): void {
        this.$v.formFields[fieldName]!.$touch();
    }

    public errorLoaderHandler(): void {
        if(this.error && this.error.message) {
            this.loader = false;
        }
    }

    public triggerForm(): void {
        this.loader = true;
        this.$v.$touch();
        if(!this.$v.$invalid) {
            this.submitForm({...this.formFields, remember: this.remember});
        } 

        return;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.form {
    &-group {
        .form-checkbox {
            + .form-label {
                &::before {
                    width: 18px;
                    height: 18px;
                    border-radius: 4px;
                    border-color: rgba(203, 208, 216, 0.6);
                }
            }
            &:checked {
                + .form-label {
                    &::before {
                        background-color: $color-pink;
                        border-color: $color-pink;
                        border-radius: 4px;
                    }
                }
            }
        }
    }
    &-row {
        &:not(:last-child) {
            margin-bottom: 20px;
        }
        .form-group {
            .form-label {
                font-weight: normal;
            }
        }
    }
    &-col {
        flex: 1;
        .errors-list {
            margin-top: 8px;
        }
    }
    &-label {
        font-weight: 600;
        line-height: 19px;
        margin-bottom: 5px;
        color: #253a49;
    }
    &-error {
        font-size: 12px;
        margin-top: 5px;
        text-align: right;
        color: $color-pink;
    }
}
</style>
