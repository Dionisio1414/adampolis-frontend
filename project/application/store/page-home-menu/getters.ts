import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IShopMenu } from '~/types/shop-menu.interface';
import { IState } from './state';

export default {
    getTopHeader(state) {
        if (state.shopMenu?.items) {
            return state
                .shopMenu
                .items
                .filter((item: IShopMenu) => item.type === 'top');
        } else {
            return {};
        }
    },
    getBigCategories(state) {
        if (state.shopMenu?.items) {
            return state
                .shopMenu
                .items
                .filter((item: IShopMenu) => item.type === 'bigCategories');
        } else {
            return {};
        }
    },
    getFooter(state) {
        if (state.shopMenu?.items) {
            return state
                .shopMenu
                .items
                .filter((item: IShopMenu) => item.type === 'footer');
        } else {
            return {};
        }
    },
    getPartners(state) {
        if (state.shopMenu?.items) {
            return state
                .shopMenu
                .items
                .filter((item: IShopMenu) => item.type === 'partners');
        } else {
            return {};
        }
    },
    getSecondaryCategories(state) {
        if (state.shopMenu?.items) {
            return state
                .shopMenu
                .items
                .filter((item: IShopMenu) => item.type === 'secondaryCategories');
        } else {
            return {};
        }
    },
    getMainMenu(state) {
        if (state.shopMenu?.items) {
            return state
                .shopMenu
                .items
                .filter((item: IShopMenu) => item.type === 'main');
        } else {
            return {};
        }
    }
} as GetterTree<IState, IRootState>
