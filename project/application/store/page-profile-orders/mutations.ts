import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_ORDERS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_ORDERS_SUCCESS(state, { data, meta }) {
        state.status = EStatus.SUCCESS;
        state.data = data;
        state.meta = meta;
        state.error = null;
    },
    FETCH_ORDERS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    FETCH_FILTER(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_FILTER_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.filter = payload;
        state.error = null;
    },
    FETCH_FILTER_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    FETCH_ORDER_BY_NUMBER(state) {
        state.status_order = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_ORDER_BY_NUMBER_SUCCESS(state, payload) {
        state.status_order = EStatus.SUCCESS;
        state.order = payload;
        state.error = null;
    },
    FETCH_ORDER_BY_NUMBER_ERROR(state, payload) {
        state.status_order = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
