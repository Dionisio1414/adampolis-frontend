import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getProfileCreditLine(state) {
        return state.data;
    },
    getProfileCreditLineMessage(state) {
        return state.message;
    },
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status;
    }
} as GetterTree<IState, IRootState>;
