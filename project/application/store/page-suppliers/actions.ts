import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    async fetchSuppliers({ commit }, payload: string = 'a'): Promise<void> {
        //@ts-ignore
        const currentLang: string = this.app.i18n.locale;
        //@ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_SUPPLIERS');
            const { data } = await $axios.get(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/suppliers?symbol=${payload}`,
            );

            commit('FETCH_SUPPLIERS_SUCCESS', data.items);
        } catch (e) {
            commit('FETCH_SUPPLIERS_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
