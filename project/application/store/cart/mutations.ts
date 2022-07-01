import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    CREATE_CART(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    CREATE_CART_SUCCESS(state) {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    CREATE_CART_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    SET_CART_TOKEN(state, { token }) {
        state.token = token;
    },
    CLEAR_CART_DATA(state) {
        state.data = null;
    },
    ADD_CART_ITEM(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    ADD_CART_ITEM_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    ADD_CART_ITEM_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    FETCH_CART(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_CART_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    FETCH_CART_ERROR(state, payload: any) {
        state.status = EStatus.ERROR;
        state.data = null;
        state.error = payload;
    },
    CHANGE_QUANTITY(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    CHANGE_QUANTITY_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    CHANGE_QUANTITY_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    REMOVE_CART_ITEM(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    REMOVE_CART_ITEM_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    REMOVE_CART_ITEM_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.data = payload;
    }
} as MutationTree<IState>;
