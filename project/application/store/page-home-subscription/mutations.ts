import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    SUBMIT_SUBSCRIPTION(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    SUBMIT_SUBSCRIPTION_SUCCESS(state, payload: EStatus) {
        state.status = payload;
    },
    SUBMIT_SUBSCRIPTION_ERROR(state, payload: any) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
} as MutationTree<IState>