import { MutationTree } from 'vuex';
import { IState } from './state';
import { EStatus } from '~/constants/status';

export default {
    FETCH_CATALOG: (state) => {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_CATALOG_SUCCESS: (state, payload) => {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    FETCH_CATALOG_ERROR: (state, payload) => {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
} as MutationTree<IState>;
