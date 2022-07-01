import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IOrdersQuery } from '~/types/orders.interface';
import { queryParser } from '~/utils/query-parser';
import VueI18n from 'vue-i18n';
import { IPaymentPayBy } from '~/types/payment-methods';

export default {
    async fetchOrders({ commit }, payload: IOrdersQuery): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        const queryParams = queryParser(payload.query).length ? `?${queryParser(payload.query)}`: '';

        try {
            commit('FETCH_ORDERS');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/orders/list/${payload.page}${queryParams}`
            );

            commit('FETCH_ORDERS_SUCCESS', { data: data.data, meta: data.meta });
        } catch(e: any) {
            commit('FETCH_ORDERS_ERROR', e?.response?.data);
        }
    },
    async fetchOrderByNumber({ commit }, { order_nr }: IPaymentPayBy): Promise<any> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_ORDER_BY_NUMBER');
            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/orders/by-number/${order_nr}`);
            commit('FETCH_ORDER_BY_NUMBER_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_ORDER_BY_NUMBER_ERROR', e?.response?.data);
        }
    },
    async fetchOrdersFilter({ commit }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_FILTER');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/orders/order-filter-info`
            );

            commit('FETCH_FILTER_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_FILTER_ERROR', e?.response?.data);
        }
    },
} as ActionTree<IState, IRootState>;
