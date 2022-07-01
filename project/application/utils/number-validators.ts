import { required, helpers } from 'vuelidate/lib/validators'

export default () => {
    return {
        required,
        number: helpers.regex('digits', /^[\+\d]+(?:[\d-.\s()]*)$/),
    };
}
