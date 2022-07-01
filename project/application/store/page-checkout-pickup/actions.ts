import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';
import { ICustomerRequestBody } from '~/types/checkout.interface';

export default {
    async fetchPickupData({ commit }, { cartToken }: { cartToken: string | null }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_PICKUP_DATA');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/checkout/${cartToken}/pickup`
            );
            commit('FETCH_PICKUP_DATA_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_PICKUP_DATA_ERROR', e?.response?.data);
        }
    },
    async setPickupData({ commit, dispatch }, { payload, cartToken }: ICustomerRequestBody): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('SET_PICKUP_DATA');
            const { data } = await $axios.post(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/checkout/${cartToken}/pickup`,
                { ...payload }
            );
            await dispatch('cart/fetchCartData', null, { root: true });
            await dispatch('payment-methods/fetchPaymentMethods', { cartToken }, { root: true });

            commit('SET_PICKUP_DATA_SUCCESS', data);
        } catch(e: any) {
            commit('SET_PICKUP_DATA_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
