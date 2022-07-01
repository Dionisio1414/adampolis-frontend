import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IProfileUpdateRequest } from '~/types/profile-data.interface';

export default {
    async updateProfile({ commit }, payload: IProfileUpdateRequest): Promise<void> {
        //@ts-ignore
        const currentLang: string = this.app.i18n.locale;
        //@ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('UPDATE_PROFILE');
            const { data } = await $axios.patch(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/customer/${payload.id}`,
                { ...payload.body }
            );
            commit('UPDATE_PROFILE_SUCCESS');
            commit('page-profile-data/FETCH_PROFILE_SUCCESS', data, { root: true });
        } catch (e) {
            commit('UPDATE_PROFILE', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
