import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IVueI18n } from 'vue-i18n';
import { IProfileCreditLinePayload } from '~/types/profile-data.interface';

export default {
    async fetchProfileCreditLine({ commit }): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_PROFILE_CREDIT_LINE');
            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/profile/credit-line`);
            commit('FETCH_PROFILE_CREDIT_LINE_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_PROFILE_CREDIT_LINE_ERROR', e?.response?.data);
        }
    },
    async requestCreditLine({ commit }, payload: IProfileCreditLinePayload): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('REQUEST_CREDIT_LINE');
            const { data } = await $axios.post(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/request-credit-line`,
                { ...payload }
            );

            console.log('data', data);
            
            commit('REQUEST_CREDIT_LINE_SUCCESS', data?.message);
        } catch(e: any) {
            commit('REQUEST_CREDIT_LINE_ERROR', e?.response?.data);
        }
    },
} as ActionTree<IState, IRootState>;
