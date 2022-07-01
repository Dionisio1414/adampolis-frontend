import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';

export default {
    async fetchPage({ commit }, slug: string): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        console.log('currentLang', currentLang);
        
        try {
            commit('FETCH_PAGE_STATIC');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/pages/${slug}`,
            );
            commit('FETCH_PAGE_STATIC_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_PAGE_STATIC_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
