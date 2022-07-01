import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';

// import { EActions as EAuthActions } from '~/store/auth/actions';
// import { STORE_TOKENS } from '~/store-utils/tokens';
// import { IRootState } from '~/store-utils/state.interface';

const AUTH_MATCH = [
    '/shop-api/login'
];

export default function(
    { $axios, store, redirect }:
    { $axios: NuxtAxiosInstance, store: Store<any>, redirect: Function }
    // { $axios: NuxtAxiosInstance, store: Store<IRootState>, redirect: Function }
) {
    $axios.onError(async error => {
        const url = (((error || {}).config || {}).url || '');

        if (AUTH_MATCH.find(str => url.indexOf(str) !== -1)) {
            throw error;
        }

        const status: number | undefined = error.response?.status;

        if (status === 401) {
            await store.dispatch('auth/onLogout');
            redirect('/');
        }

        throw error;
    });
}
