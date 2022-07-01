import { required, minLength, helpers } from 'vuelidate/lib/validators'

export default () => {
    return {
        required,
        minLength: minLength(8),
        digits: helpers.regex('digits', /(.*\d.*)/),
    };
}
