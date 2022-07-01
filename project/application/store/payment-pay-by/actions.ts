import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';
import { IPaymentMethodPayload } from '~/types/payment-methods';

export default {
    async setPaymentMethod({ commit, dispatch }, { cartToken, code, bankCode = null }: IPaymentMethodPayload): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        const checkBankCode: string = bankCode ? `?bank_code=${bankCode}` : '';
        try {
            commit('SET_PAYMENT_METHOD');
            const { data } = await $axios.post(`${this.app.$config.apiURL}/shop-api/${currentLang}/payment/${cartToken}/pay-by/${code}${checkBankCode}`);
            await dispatch('cart/clearCartToken', null, { root: true });
            
            commit('SET_PAYMENT_METHOD_SUCCESS', data);
        } catch(e: any) {
            commit('SET_PAYMENT_METHOD_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;