import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_PROFILE(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_PROFILE_SUCCESS(state, payload: any) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    FETCH_PROFILE_ERROR(state, payload: any) {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
