import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IProductInner } from '~/types/product.interface';

export default {
    getWishListProducts(state) {
        return state.products;
    },
    getError(state) {
        return state.error;
    },
    getWishListInitStatus(state) {
        return state.statusWishListInit;
    },
    getWishListAddStatus(state) {
        return state.statusWishListAdd;
    },
    getWishListRemoveStatus(state) {
        return state.statusWishListRemove;
    },
    getWishlistToken(state) {
        return state.wishListToken;
    },
    idsSet: state => {
        const result: any = {};
        (state.products || []).forEach((p: IProductInner) => result[p.id] = true)
        return result;
      }
} as GetterTree<IState, IRootState>;
