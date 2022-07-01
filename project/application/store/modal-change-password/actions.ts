import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IDictionary } from '~/types/dictionary.interface';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    async changePassword({ dispatch, commit }: any, payload: IDictionary<string>): Promise<void> {
        //@ts-ignore
        const currentLang: string = this.app.i18n.locale;
        //@ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('CHANGE_PASSWORD');

            const { data } = await $axios.post(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/change-password`,
                { ...payload }
            );
            commit('CHANGE_PASSWORD_SUCCESS', data.message);
        } catch (e) {
            commit("CHANGE_PASSWORD_ERROR", e?.response?.data)
        }
    }
} as ActionTree<IState, IRootState>;
