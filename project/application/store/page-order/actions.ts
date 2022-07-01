import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    async fetchOrderPreview({ commit }, id: number | string): Promise<void> {
        //@ts-ignore
        const currentLang: string = this.app.i18n.locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_ORDER_PREVIEW');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/orders/${id}`
            );

            commit('FETCH_ORDER_PREVIEW_SUCCESS', data);
        } catch (e) {
            commit('FETCH_ORDER_PREVIEW_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;