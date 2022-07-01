import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    SET_DEFAULT_ADDRESS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    SET_DEFAULT_ADDRESS_SUCCESS(state) {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    SET_DEFAULT_ADDRESS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    DELETE_ADDRESS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    DELETE_ADDRESS_SUCCESS(state) {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    DELETE_ADDRESS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
