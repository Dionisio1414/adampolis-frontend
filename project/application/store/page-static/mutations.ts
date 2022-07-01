import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_PAGE_STATIC(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_PAGE_STATIC_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.page = payload;
        state.error = null;
    },
    FETCH_PAGE_STATIC_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.page = null;
    }
} as MutationTree<IState>;
