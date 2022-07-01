import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IVueI18n } from 'vue-i18n';

export default {
    async setDefaultAddress({ commit, dispatch }: any, id: number): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('SET_DEFAULT_ADDRESS');
            const { data } = await $axios.post(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/address/default/${id}`
            );

            commit('SET_DEFAULT_ADDRESS_SUCCESS');
            await dispatch('page-profile-data/fetchProfileData', null, { root: true });
        } catch(e: any) {
            commit('SET_DEFAULT_ADDRESS_ERROR', e?.response?.data);
        }
    },
    async deleteAddress({ commit, dispatch }: any, id: number): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('DELETE_ADDRESS');
            const { data } = await $axios.delete(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/address/${id}`
            );

            commit('DELETE_ADDRESS_SUCCESS');
            await dispatch('page-profile-data/fetchProfileData', null, { root: true });
        } catch(e: any) {
            commit('DELETE_ADDRESS_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
