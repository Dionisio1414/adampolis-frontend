import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_PRIVACY_POLICY(state) {
        state.status = EStatus.PROCESSING;
    },
    FETCH_PRIVACY_POLICY_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
    },
    FETCH_PRIVACY_POLICY_ERROR(state) {
        state.status = EStatus.ERROR;
    }
} as MutationTree<IState>;
