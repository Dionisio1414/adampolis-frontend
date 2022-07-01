import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_SEARCH(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_SEARCH_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    FETCH_SEARCH_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.data = null;
    }
} as MutationTree<IState>;
