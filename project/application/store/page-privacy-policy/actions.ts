import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    async fetchPrivacyPolicy({ commit }): Promise<void> {
        //@ts-ignore
        const currentLang: string = this.app.i18n.locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_PRIVACY_POLICY');
            const { data } = await $axios.get(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/pages/privacy-policy`
            );
            commit('FETCH_PRIVACY_POLICY_SUCCESS', data);
        } catch (e) {
            commit('FETCH_PRIVACY_POLICY_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
