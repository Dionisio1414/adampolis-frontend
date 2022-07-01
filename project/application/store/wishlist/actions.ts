import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import VueI18n from 'vue-i18n';

export default {
    async fetchWishList({ commit }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_WISHLIST');
            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/wishlist/`);
            commit('FETCH_WISHLIST_SUCCESS', data);
        } catch(e) {
            commit('FETCH_WISHLIST_ERROR', e?.response?.data);
        }
    },
    resetWishList({ commit }) {
        commit('RESET_WISH_LIST')
    },
    async addWishListItem({ commit, getters }, { productId }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const wishlistToken: string = getters['getWishlistToken'];
        try {
            commit('ADD_WISHLIST_ITEM');
            const { data } = await $axios.post(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/wishlist/`,
                {
                    productId,
                    wishlistToken
                }
            );
            commit('ADD_WISHLIST_ITEM_SUCCESS', data);
        } catch (e) {
            commit('ADD_WISHLIST_ITEM_ERROR', e?.response?.data);
        }
    },
    async removeWishListItem({ commit, getters }, { productId }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const wishlistToken: string = getters['getWishlistToken'];

        try {
            commit('REMOVE_WISHLIST_ITEM');
            const { data } = await $axios.delete(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/wishlist/`,
                {
                    params: {
                        productId,
                        wishlistToken
                    }
                }
            );
            commit('REMOVE_WISHLIST_ITEM_SUCCESS', data);
        } catch (e) {
            commit('REMOVE_WISHLIST_ITEM_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;
