import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    ADD_PROFILE_ADDRESS(state) {
        state.status = EStatus.PROCESSING;
        state.message = '';
        state.error = null;
    },
    ADD_PROFILE_ADDRESS_SUCCESS(state, payload: string) {
        state.status = EStatus.SUCCESS;
        state.message = payload;
        state.error = null;
    },
    ADD_PROFILE_ADDRESS_ERROR(state, payload: any) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.message = payload.message;
    },
    EDIT_PROFILE_ADDRESS(state) {
        state.status = EStatus.PROCESSING;
        state.message = '';
        state.error = null;
    },
    EDIT_PROFILE_ADDRESS_SUCCESS(state, payload: string) {
        state.status = EStatus.SUCCESS;
        state.message = payload;
        state.error = null;
    },
    EDIT_PROFILE_ADDRESS_ERROR(state, payload: any) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.message = payload.message;
    },
} as MutationTree<IState>;
