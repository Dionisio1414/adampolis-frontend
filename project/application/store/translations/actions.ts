import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n, { IVueI18n } from 'vue-i18n';

import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';
import { IDictionary } from '~/types/dictionary.interface';
import { IActionPayloadWithLocale } from '~/types/action-payload-with-locale.interface';

export default {
    async fetchTranslations({ commit }, { _locale }: IActionPayloadWithLocale): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_TRANSLATIONS');
            const { data }: { data: IDictionary<string> } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${_locale}/translations/front`
            );

            const i18n: VueI18n & IVueI18n = this.app.i18n as VueI18n & IVueI18n;
            i18n.setLocaleMessage(_locale, data);
            
            commit('FETCH_TRANSLATIONS_SUCCESS', { _locale, data });
        } catch(e: any) {
            console.dir(e);
            commit('FETCH_TRANSLATIONS_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
