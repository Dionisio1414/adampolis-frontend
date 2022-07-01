import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n from 'vue-i18n';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    async fetchProduct({ commit }, payload): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_PRODUCT');

            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/product/${payload}`
            );

            commit('FETCH_PRODUCT_SUCCESS', data);

        } catch(e: any) {
            commit('FETCH_PRODUCT_ERROR', e?.response?.data);
        }
    },
} as ActionTree<IState, IRootState>;
