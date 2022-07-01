import { MutationTree } from 'vuex';
import { IShopMenuRoot } from '~/types/shop-menu.interface';
import { IState } from './state';

export default {
    UPDATE_SHOP_MENU(state, payload: IShopMenuRoot) {
        state.shopMenu = payload;
    }
} as MutationTree<IState>;
