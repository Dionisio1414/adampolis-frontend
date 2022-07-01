import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';

export default {
    async fetchPaymentMethods({ commit }, { cartToken }: { cartToken: string | null }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_PAYMENT_METHODS');
            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/payment/${cartToken}/methods`);
            commit('FETCH_PAYMENT_METHODS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_PAYMENT_METHODS_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
