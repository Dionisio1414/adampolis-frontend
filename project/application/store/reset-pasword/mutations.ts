import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    UPDATE_STATUS(state, payload: EStatus) {
        state.status = payload;
    },
    UPDATE_ERROR(state, payload: any) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
} as MutationTree<IState>