import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IProductInner } from '~/types/product.interface';
import { IState } from './state';

export default {
    FETCH_WISHLIST(state) {
        state.statusWishListInit = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_WISHLIST_SUCCESS(state, { products, wishlistToken }: { products: IProductInner[], wishlistToken: string | null }) {
        state.statusWishListInit = EStatus.SUCCESS;
        state.products = products;
        state.wishListToken = wishlistToken;
        state.error = null;
    },
    FETCH_WISHLIST_ERROR(state, payload) {
        state.statusWishListInit = EStatus.ERROR;
        state.error = payload;
    },
    ADD_WISHLIST_ITEM(state) {
        state.statusWishListAdd = EStatus.PROCESSING;
        state.error = null;
    },
    ADD_WISHLIST_ITEM_SUCCESS(state, { products } : { products: IProductInner[] }) {
        state.statusWishListAdd = EStatus.SUCCESS;
        state.products = products;
        state.error = null;
    },
    ADD_WISHLIST_ITEM_ERROR(state, payload) {
        state.statusWishListAdd = EStatus.ERROR;
        state.error = payload;
    },
    REMOVE_WISHLIST_ITEM(state) {
        state.statusWishListRemove = EStatus.PROCESSING;
        state.error = null;
    },
    REMOVE_WISHLIST_ITEM_SUCCESS(state, { products } : { products: IProductInner[] }) {
        state.statusWishListRemove = EStatus.SUCCESS;
        state.products = products;
        state.error = null;
    },
    REMOVE_WISHLIST_ITEM_ERROR(state, payload) {
        state.statusWishListRemove = EStatus.ERROR;
        state.error = payload;
    },
    RESET_WISH_LIST(state) {
        state.products = [];
        state.wishListToken = null;
    }
} as MutationTree<IState>;
