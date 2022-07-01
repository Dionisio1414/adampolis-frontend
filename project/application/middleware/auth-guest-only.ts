// import { Middleware } from '@nuxt/types';
// import { STORE_TOKENS } from '~/store-utils/tokens';
// import { EGetters as EAuthGetters } from '~/store/auth/getters';

// const authGuestOnlyMiddleware: Middleware = ({ redirect, store }) => {
//     const isAuthorized = store.getters[`${STORE_TOKENS.AUTH}/${EAuthGetters.IS_AUTHORIZED}`];

//     if (isAuthorized) {
//         return redirect('/');
//     }
// }

// export default authGuestOnlyMiddleware