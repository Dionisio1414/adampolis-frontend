import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    UPDATE_PROFILE(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    UPDATE_PROFILE_SUCCESS(state, payload: string) {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    UPDATE_PROFILE_ERROR(state, payload: any) {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
