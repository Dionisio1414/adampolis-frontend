import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_HOME_PERSONAL_DISCOUNTS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_HOME_PERSONAL_DISCOUNTS_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.discounts = payload;
        state.error = null;
    },
    FETCH_HOME_PERSONAL_DISCOUNTS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.discounts = [];
    }
} as MutationTree<IState>;
