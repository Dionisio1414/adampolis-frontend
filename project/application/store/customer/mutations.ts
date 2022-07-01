import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_CUSTOMER(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_CUSTOMER_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.customer = payload;
        state.error = null;
    },
    FETCH_CUSTOMER_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    ADD_CUSTOMER(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    ADD_CUSTOMER_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.customer = { ...state.customer, ...payload };
        state.error = null;
    },
    ADD_CUSTOMER_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
