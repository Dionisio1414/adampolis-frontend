import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IVueI18n } from 'vue-i18n';

export default {
    async addProfileAddress({ dispatch, commit }, payload): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('ADD_PROFILE_ADDRESS');

            const { data } = await $axios.post(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/address/new`,
                { ...payload }
            );
            commit('ADD_PROFILE_ADDRESS_SUCCESS', data.message);
            await dispatch('page-profile-data/fetchProfileData', null, { root: true });
        } catch(e: any) {
            commit('ADD_PROFILE_ADDRESS_ERROR', e?.response?.data);
        }
    },
    async editProfileAddress({ dispatch, commit }, payload): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('EDIT_PROFILE_ADDRESS');

            const { data } = await $axios.patch(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/address/${payload.id}`,
                { ...payload.body }
            );
            commit('EDIT_PROFILE_ADDRESS_SUCCESS', data.message);
            await dispatch('page-profile-data/fetchProfileData', null, { root: true });
        } catch(e: any) {
            commit('EDIT_PROFILE_ADDRESS_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
