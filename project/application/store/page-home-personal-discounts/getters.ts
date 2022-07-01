import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getDiscounts(state) {
        return state.discounts;
    },
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status;
    }
} as GetterTree<IState, IRootState>;
