import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getOrdersData(state) {
        return state.data;
    },
    getOrderData(state) {
        return state.order;
    },
    getOrdersMeta(state) {
        return state.meta;
    },
    getOrdersFilter(state) {
        return state.filter;
    },
    getError(state) {
        return state.error;
    },
    getErrorOrder(state) {
        return state.error_order;
    },
    getStatus(state) {
        return state.status
    },
    getStatusOrder(state) {
        return state.status_order;
    },
} as GetterTree<IState, IRootState>;
