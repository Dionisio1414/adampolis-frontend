import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';
import { ICustomer } from '~/types/profile-data.interface';

export default {
    async fetchCustomer({ commit }, { cartToken }: { cartToken: string | null }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_CUSTOMER');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/customer/${cartToken}`
            );
            commit('FETCH_CUSTOMER_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_CUSTOMER_ERROR', e?.response?.data);
        }
    },
    async addCustomer({ commit }, { cartToken, body }: { cartToken: string | null , body: ICustomer}): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('ADD_CUSTOMER');
            const { data } = await $axios.post(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/customer/${cartToken}`,
                { ...body }
            );
            commit('ADD_CUSTOMER_SUCCESS', data);
        } catch(e: any) {
            console.dir(e);
            
            commit('ADD_CUSTOMER_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
