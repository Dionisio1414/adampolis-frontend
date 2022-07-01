import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_PAYMENT_METHODS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_PAYMENT_METHODS_SUCCESS(state, { items }) {
        state.status = EStatus.SUCCESS;
        state.paymentMethods = items;
        state.error = null;
    },
    FETCH_PAYMENT_METHODS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.paymentMethods = null;
    }
} as MutationTree<IState>;
