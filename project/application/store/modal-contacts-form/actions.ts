import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
export default {
    async addProfileAddress({ dispatch, commit }, payload): Promise<void> {
        //@ts-ignore
        const currentLang: string = this.app.i18n.locale;
        //@ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('ADD_PROFILE_ADDRESS');

            const { data } = await $axios.post(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/customer/new`,
                { ...payload }
            );
            commit('ADD_PROFILE_ADDRESS_SUCCESS', data.message);
            await dispatch('page-profile-data/fetchProfileData', null, { root: true });
        } catch (e) {
            commit('ADD_PROFILE_ADDRESS_ERROR', e?.response?.data);
        }
    },
    async editProfileAddress({ dispatch, commit }, payload): Promise<void> {
        //@ts-ignore
        const currentLang: string = this.app.i18n.locale;
        //@ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('EDIT_PROFILE_ADDRESS');

            const { data } = await $axios.patch(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/customer/${payload.id}`,
                { ...payload.body }
            );
            commit('EDIT_PROFILE_ADDRESS_SUCCESS', data.message);
            await dispatch('page-profile-data/fetchProfileData', null, { root: true });
        } catch (e) {
            commit('EDIT_PROFILE_ADDRESS_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
