import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IVueI18n } from 'vue-i18n';

export default {
    async fetchHomePersonalDiscounts({ commit }): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_HOME_PERSONAL_DISCOUNTS');
            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/products/personal-discounts`);
            commit('FETCH_HOME_PERSONAL_DISCOUNTS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_HOME_PERSONAL_DISCOUNTS_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
