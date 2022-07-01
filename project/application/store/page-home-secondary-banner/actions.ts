import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';
import { IVueI18n } from 'vue-i18n';

export default {
    async fetchSecondaryBanners({ commit }): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            const { data } = await $axios.get(
                //@ts-ignore
                `${this.app.$config.apiURL}/shop-api/${currentLang}/secondary-banner`
            );
            commit('UPDATE_SECONDARY_BANNER', data);
        } catch(e: any) {
            console.log(e);
        }
    }
} as ActionTree<IState, IRootState>;
