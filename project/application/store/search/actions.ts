import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';
import { ISearchForm } from '~/types/search.interface';

export default {
    async fetchSearch({ commit }, { q, type, page = 1, limit = 5 }: Partial<ISearchForm>): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_SEARCH');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/search`,
                {
                    params: {
                        q,
                        type,
                        page,
                        limit
                    }
                }
            );
            commit('FETCH_SEARCH_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_SEARCH_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
