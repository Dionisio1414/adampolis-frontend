import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { EStatus } from '~/constants/status';
import { IDictionary } from '~/types/dictionary.interface';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';

export default {
    async deactivateAccount({ dispatch, commit }: any, payload: IDictionary<string>): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('DEACTIVATE_ACCOUNT');
            const { data } = await $axios.post(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/erase`,
                { ...payload }
            );
            await dispatch('auth/onLogout', null, { root: true });

            commit('DEACTIVATE_ACCOUNT_SUCCESS', data.message);
        } catch(e: any) {
            commit('DEACTIVATE_ACCOUNT_ERROR', e?.response?.data);
        }
    },
} as ActionTree<IState, IRootState>;
