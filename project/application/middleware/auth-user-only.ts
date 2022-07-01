import { Middleware } from '@nuxt/types';

const authUserOnlyMiddleware: Middleware = async function ({ redirect, store }) {
    const isAuthorized = await store.getters['auth/isAuthorized'];
    if(!isAuthorized) return redirect('/');
};

export default authUserOnlyMiddleware;
