import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IVueI18n } from 'vue-i18n';

export default {
    async fetchCoutriesList({ commit }): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/countries`
            );

            commit('UPDATE_COUNTRIES_LIST', data);
        } catch(e) {
            console.log(e);
        }
    }
} as ActionTree<IState, IRootState>;
