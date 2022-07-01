import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IProfileCreditLine } from '~/types/profile-data.interface';
import { IState } from './state';

export default {
    FETCH_PROFILE_CREDIT_LINE(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_PROFILE_CREDIT_LINE_SUCCESS(state, payload: IProfileCreditLine) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    FETCH_PROFILE_CREDIT_LINE_ERROR(state, payload: Error) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.data = null;
    },
    REQUEST_CREDIT_LINE(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    REQUEST_CREDIT_LINE_SUCCESS(state, payload: string) {
        state.status = EStatus.SUCCESS;
        state.message = payload;
        state.error = null;
    },
    REQUEST_CREDIT_LINE_ERROR(state, payload: Error) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
} as MutationTree<IState>;
