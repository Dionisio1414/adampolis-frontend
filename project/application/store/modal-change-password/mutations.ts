import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    CHANGE_PASSWORD(state) {
        state.status = EStatus.PROCESSING;
        state.message = '';
        state.error = null;
    },
    CHANGE_PASSWORD_SUCCESS(state, payload: string) {
        state.status = EStatus.SUCCESS;
        state.message = payload;
        state.error = null;
    },
    CHANGE_PASSWORD_ERROR(state, payload: any) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.message = payload.message
    }
} as MutationTree<IState>
