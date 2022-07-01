import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';
import VueI18n from 'vue-i18n';

export default {
    async fetchShopMenu({ commit }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/shop-menu`
            );
            commit('UPDATE_SHOP_MENU', data);
        } catch(e: any) {
            console.log(e);
        }
    }
} as ActionTree<IState, IRootState>;
