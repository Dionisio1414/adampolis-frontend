import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';

export default {
    async fetchNewsList({ commit }, { page = 1, limit = 9, paginate = false }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_NEWS_LIST');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/news/list/${page}`,
                {
                    params: { limit }
                }
            );
            commit('FETCH_NEWS_LIST_SUCCESS', { data, paginate });
        } catch(e) {
            commit('FETCH_NEWS_LIST_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;