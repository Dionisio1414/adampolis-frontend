import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { NuxtCookies } from 'cookie-universal-nuxt';
import { IRootState } from '~/store-utils/state.interface';

import { IActionSetTokenPayload } from '~/types/action-set-token-payload.interface';
import { IState } from './state';

export default {
    setToken({ commit, dispatch }, payload: IActionSetTokenPayload) {
        const $axios: NuxtAxiosInstance = this.$axios;
        
        if(payload.token) {
            $axios.defaults.headers.Authorization = `Bearer ${payload.token}`;
            commit('SET_AUTH_FLAG', { flag: true });
            dispatch('page-profile-data/fetchProfileData', null, { root: true });
        } else {
            delete $axios.defaults.headers.Authorization;
            commit('SET_AUTH_FLAG', { flag: false });
        }

        commit('SET_TOKEN');
    },
    //@ts-ignore
    setTokenFromCookies({ dispatch }) {
        //@ts-ignore
        const $cookies: NuxtCookies = this.$cookies;
        const token = $cookies.get('authToken');
        dispatch('setToken', { token });
    },
    async onLogout({ dispatch }): Promise<void> {
        await Promise.all([
            dispatch('clearToken'),
            dispatch('getInitialData', null, { root: true }),
            dispatch('wishlist/resetWishList', null, { root: true }),
            dispatch('cart/clearCartToken', null, { root: true })
        ])
    },
    //@ts-ignore
    async clearToken({ commit }) {
        //@ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;
        //@ts-ignore
        const $cookies: NuxtCookies = this.$cookies;
        $cookies.remove('authToken');
        delete $axios.defaults.headers.Authorization;
        commit('SET_AUTH_FLAG', { flag: false });
    }
} as ActionTree<IState, IRootState>;
