import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { ICustomerRequestBody } from '~/types/checkout.interface';
import VueI18n from 'vue-i18n';

export default {
    async setShipping({ commit, dispatch }, { payload, cartToken }: ICustomerRequestBody): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('ACTUALIZE_CUSTOMER');
            const { data } = await $axios.post(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/checkout/${cartToken}/shipping`,
                { ...payload }
            );
            await dispatch('cart/fetchCartData', null, { root: true });
            await dispatch('payment-methods/fetchPaymentMethods', { cartToken }, { root: true });

            commit('ACTUALIZE_CUSTOMER_SUCCESS', data);
        } catch(e: any) {
            commit('ACTUALIZE_CUSTOMER_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
