import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { EStatus } from '~/constants/status';
import { ISubscribeEmail } from '~/types/subscribe-email.interface';
import { IVueI18n } from 'vue-i18n';

export default {
    async submitSubscription({ commit }, payload: ISubscribeEmail): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('SUBMIT_SUBSCRIPTION');

            await $axios.post(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/subscribe`,
                { ...payload }
            );

            commit('SUBMIT_SUBSCRIPTION_SUCCESS', EStatus.SUCCESS);
        } catch(e: any) {
            commit('SUBMIT_SUBSCRIPTION_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
