import VueI18n, { IVueI18n } from 'vue-i18n';
import { IDictionary } from '~/types/dictionary.interface';
import { COOKIE_POLICY_EXPIRATION } from '~/constants/cookiePolicyToken';

export const actions = {
    async nuxtServerInit({ dispatch, rootGetters }: any, { app, query }: any) {
        if(app.$config.apiURL == undefined) {
            throw new Error('API URL is undefined');
        }

        await dispatch('translations/fetchTranslations', { _locale: app.i18n.locale || 'lt' });

        await Promise.all([
            dispatch('auth/setTokenFromCookies'),
            dispatch('cart/setCartTokenFromCookies'),
            dispatch('page-home-menu/fetchShopMenu'),
            dispatch('header-shop-info/fetchShopInfo')
        ]);

        await dispatch('cart/fetchCartData');

        if(rootGetters['auth/isAuthorized']) {
            await Promise.all([
                dispatch('page-profile-data/fetchProfileData'),
                dispatch('wishlist/fetchWishList')
            ]);
        }
    },
    async nuxtClientInit({ dispatch, rootGetters }: any, context: any) {
        const i18n: VueI18n & IVueI18n = context.app.i18n as VueI18n & IVueI18n;
        const currentLang: string = i18n.locale;
        const translates: IDictionary<string> = rootGetters['translations/getTranslationsData'][currentLang];

        if(context.query.impersonate) {
            await context.app.$cookies.set(
                'authToken',
                context.query.authToken,
                {
                    expires: context.app.$dayjs().add(COOKIE_POLICY_EXPIRATION).toDate(),
                    path: '/'
                },
            );
        }

        await dispatch('auth/setTokenFromCookies');
        await dispatch('cart/setCartTokenFromCookies');

        i18n.setLocaleMessage(currentLang, translates);
    },
    async getInitialData({ dispatch }: any) {
        await Promise.all([
            dispatch('page-home-menu/fetchShopMenu', null),
            dispatch('header-shop-info/fetchShopInfo', null)
        ]);
    }
};
