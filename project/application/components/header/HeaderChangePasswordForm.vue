<template>
    <form class="form">
        <div class="form-row">
            <div class="form-col">
                <label class="form-label">{{ $t('modals.registration.contacts.mail') }}</label>
                <input
                    v-model="formFields.email"
                    class="form-control"
                    :class="{'form-control--invalid': ($v.formFields.email.$invalid && $v.formFields.email.$dirty) || (error && error.errors && error.errors.email) }"
                    type="text"
                    name=""
                    @focus="errorLoaderHandler"
                    @change="errorLoaderHandler"
                />
                <FormControlErrors
                    v-if="$v.formFields.email.$invalid && $v.formFields.email.$dirty"
                    :validations="$v.formFields.email"
                    validationType="validations.modals.registrationPopup"
                />
                <FormControlServerErrors
                    v-if="error && error.errors && error.errors.email"
                    :validations="error.errors.email"
                />
            </div>
        </div>
        <div class="form-error" v-if="error && error.message && loader">
            {{ error.message }}
        </div>
    </form>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, mixins, Inject } from 'nuxt-property-decorator';
import { IFormChangePassword } from '~/types/form-registration.interface';
import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';

const validations: any = {
    formFields: {
        email: { email, required }
    }
}

@Component({
    validations,
    components: {
        FormControlErrors,
        FormControlServerErrors
    },
    computed: {
        ...mapGetters({
            error: 'modal-auth/getError'
        })
    }
})
export default class HeaderChangePasswordForm extends mixins(validationMixin) {
    @Inject('CHANGE_PASSWORD_SUBMIT')
    public submitForm!: (formValue: IFormChangePassword) => void
    public error: any;
    public loader: boolean = true;
    public formFields: IFormChangePassword = {
        email: ''
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
            this.submitForm(this.formFields);
        } else {
            console.log('validate');
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
        flex: 1;
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
