import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    ACTUALIZE_CUSTOMER(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    ACTUALIZE_CUSTOMER_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.customer = payload;
        state.error = null;
    },
    ACTUALIZE_CUSTOMER_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
} as MutationTree<IState>;
