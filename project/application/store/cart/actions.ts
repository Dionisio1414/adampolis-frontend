import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtCookies } from 'cookie-universal-nuxt';
import dayjs from 'dayjs';
import { COOKIE_POLICY_EXPIRATION } from '~/constants/cookiePolicyToken';

export default {
    async createCart({ commit, dispatch }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('CREATE_CART');
            const { data } = await $axios.post(`${this.app.$config.apiURL}/shop-api/carts`);
            this.$cookies.set(
                'cartToken',
                data.tokenValue,
                {
                    expires: dayjs().add(COOKIE_POLICY_EXPIRATION).toDate(),
                    path: '/'
                },
            );
            await dispatch('setCartToken', data.tokenValue);
            commit('CREATE_CART_SUCCESS');
        } catch(e: any) {
            commit('CREATE_CART_ERROR', e?.response?.data);
        }
    },
    setCartToken({ commit }, token) {
        if(token)
            commit('SET_CART_TOKEN', { token });
        else
            commit('SET_CART_TOKEN', { token: null });
    },
    setCartTokenFromCookies({ dispatch }) {
        const $cookies: NuxtCookies = this.$cookies;
        const token = $cookies.get('cartToken');
        dispatch('setCartToken', token);
    },
    clearCartToken({ commit }) {
        const $cookies: NuxtCookies = this.$cookies;
        $cookies.remove('cartToken');
        commit('SET_CART_TOKEN', { token: null });
        commit('CLEAR_CART_DATA');
    },
    async addCartItem({ commit, getters, dispatch }, { productCode, quantity }): Promise<void> {
        // processig && token
        try {
            const $axios: NuxtAxiosInstance = this.$axios;
            let tokenValue: string = getters['getToken'];

            if (!tokenValue) {
                await dispatch('createCart')
            }

            tokenValue = getters['getToken'];

            commit('ADD_CART_ITEM');
            const { data } = await $axios.post(
                `${this.app.$config.apiURL}/shop-api/carts/${tokenValue}/items`,
                {
                    productCode,
                    quantity
                }
            );
            commit('ADD_CART_ITEM_SUCCESS', data);
        } catch(e: any) {
            commit('ADD_CART_ITEM_ERROR', e?.response?.data);
        }
    },
    async fetchCartData({ commit, getters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const tokenValue = getters['getToken'];
        
        try {
            commit('FETCH_CART');
            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/carts/${tokenValue}`);
            commit('FETCH_CART_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_CART_ERROR', e?.response?.data);
        }
    },
    async changeQuantity({ getters, commit }, { id, quantity }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const tokenValue = getters['getToken'];

        try {
            commit('CHANGE_QUANTITY');
            const { data } = await $axios.put(
                `${this.app.$config.apiURL}/shop-api/carts/${tokenValue}/items/${id}`,
                { quantity }
            );
            commit('CHANGE_QUANTITY_SUCCESS', data);
        } catch(e: any) {
            commit('CHANGE_QUANTITY_ERROR', e?.response?.data);
        }
    },
    async removeCartItem({ commit, getters }, id): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const tokenValue = getters['getToken'];

        try {
            commit('REMOVE_CART_ITEM');
            const { data } = await $axios.delete(
                `${this.app.$config.apiURL}/shop-api/carts/${tokenValue}/items/${id}`
            );
            commit('REMOVE_CART_ITEM_SUCCESS', data);
        } catch(e: any) {
            commit('REMOVE_CART_ITEM_ERROR', e?.response?.data);
        }
    }
} as ActionTree<IState, IRootState>;