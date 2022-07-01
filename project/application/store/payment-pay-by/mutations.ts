import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    SET_PAYMENT_METHOD(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    SET_PAYMENT_METHOD_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    SET_PAYMENT_METHOD_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
