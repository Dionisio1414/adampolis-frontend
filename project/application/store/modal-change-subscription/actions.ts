import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { EStatus } from '~/constants/status';
import { IDictionary } from '~/types/dictionary.interface';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    async changeSubscription({ dispatch, commit }: any, payload: IDictionary<boolean>): Promise<void> {
        //@ts-ignore
        const currentLang: string = this.app.i18n.locale;
        //@ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('CHANGE_SUBSCRIPTION', EStatus.PROCESSING);
            const { data } = await $axios.post(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/subscribe`,
                { ...payload }
            );
            commit('CHANGE_SUBSCRIPTION_SUCCESS', data.message);
            await dispatch('page-profile-data/fetchProfileData', null, { root: true });
        } catch (e) {
            commit('CHANGE_SUBSCRIPTION_ERROR', e?.response?.data);
        }
    },
}as ActionTree<IState, IRootState>;
