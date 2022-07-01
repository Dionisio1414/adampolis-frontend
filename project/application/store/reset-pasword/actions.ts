import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { EStatus }  from "~/constants/status";
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IFormChangePassword } from '~/types/form-registration.interface';
import { IPayloadResetPassword } from '~/types/form-reset-password.interface';

export default {
    async onEmailPasswordReset({ commit, dispatch }, payload: IFormChangePassword): Promise<any> {
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            await dispatch('onUpdateStatus', EStatus.PROCESSING);
            const { data } = await $axios.put(
                `${this.app.$config.apiURL}/shop-api/request-password-reset`,
                { ...payload }
            );
            console.log('data email password reset', data);
            await dispatch('onUpdateStatus', EStatus.SUCCESS);
        } catch(e) {
            await dispatch('onUpdateStatus', EStatus.ERROR);

            commit('UPDATE_ERROR', e?.response?.data);
        }
    },
    async onPasswordReset({ commit, dispatch }, { fields, token }: IPayloadResetPassword): Promise<any> {
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            await dispatch('onUpdateStatus', EStatus.PROCESSING);
            const { data } = await $axios.put(
                `${this.app.$config.apiURL}/shop-api/password-reset/${token}`,
                { ...fields }
            );
            console.log('data password reset', data);
            await dispatch('onUpdateStatus', EStatus.SUCCESS);
        } catch(e) {
            await dispatch('onUpdateStatus', EStatus.ERROR);

            commit('UPDATE_ERROR', e?.response?.data);
        }
    },
    onUpdateStatus({ commit }, payload: string) {
        commit('UPDATE_STATUS', payload)
    },
    onClearError({ commit }) {
        commit('CLEAR_ERROR');
    },
} as ActionTree<IState, IRootState>;
