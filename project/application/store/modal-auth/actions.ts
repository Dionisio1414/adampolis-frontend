import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { EStatus } from '~/constants/status';
import { IActionSetTokenPayload } from '~/types/action-set-token-payload.interface';
import { IFormLogin, IFormRegistrationCompany } from '~/types/form-registration.interface';
import dayjs from 'dayjs';
import { COOKIE_POLICY_EXPIRATION } from '~/constants/cookiePolicyToken';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';

export default {
    async onRegister({ commit }, payload: IFormRegistrationCompany): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('UPDATE_REGISTER');
            await $axios.post(
                `${this.app.$config.apiURL}/shop-api/register`,
                { ...payload }
            );
            commit('UPDATE_REGISTER_SUCCESS');
        } catch(e: any) {
            console.dir(e?.response?.data);
            commit('UPDATE_REGISTER_ERROR', e?.response?.data);
        }
    },
    async onVerifyAccount({ commit, dispatch }, token: IActionSetTokenPayload) {
        //@ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            await dispatch('onUpdateStatus', EStatus.PROCESSING);
            const { data } = await $axios.get(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/verify-account?token=${token}`,
            );
            await dispatch('onUpdateStatus', EStatus.SUCCESS);
            commit('UPDATE_VERIFY_ACCOUNT_FLAG', data);
        } catch(e: any) {
            console.log('error', e?.response?.data);
            await dispatch('onUpdateStatus', EStatus.ERROR);

            commit('UPDATE_ERROR', e?.response?.data);
        }
    },
    async onCompanyInfo({ commit }, code: string): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('UPDATE_COMPANY_INFO');
            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/company/info?code=${code}`);
            commit('UPDATE_COMPANY_INFO_SUCCESS', data);
        } catch(e: any) {
            if(e.response.status === 400) {
                commit('UPDATE_COMPANY_INFO_SUCCESS', null);
                return;
            }
            commit('UPDATE_COMPANY_INFO_ERROR', e?.response?.data);
        }
    },
    onUpdateStatus({ commit }, payload: string) {
        commit('UPDATE_REGISTRTION_STATUS', payload)
    },
    onClearError({ commit }) {
        commit('CLEAR_ERROR');
    },
    async onLogin({ commit, dispatch }, { email, password, remember }: IFormLogin): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            await dispatch('auth/clearToken', null, { root: true })
            await dispatch('onUpdateStatus', EStatus.PROCESSING);
            const { data } = await $axios.post(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/login`,
                {
                    email,
                    password
                }
            );

            await dispatch('onUpdateStatus', EStatus.SUCCESS);
            //@ts-ignore
            this.$cookies.set(
                'authToken',
                data.token,
                {
                    expires: remember ? dayjs().add(COOKIE_POLICY_EXPIRATION).toDate() : undefined,
                    path: '/'
                },
            );
            await dispatch('auth/setToken', { token: data.token }, { root: true })
            await dispatch('wishlist/fetchWishList', null, { root: true });

            commit('UPDATE_LOGIN_TOKEN', data.token);

        } catch(e: any) {
            console.log('error', e?.response?.data);
            await dispatch('onUpdateStatus', EStatus.ERROR);

            commit('UPDATE_ERROR', e?.response?.data);
        }
    },
} as ActionTree<IState, IRootState>;
