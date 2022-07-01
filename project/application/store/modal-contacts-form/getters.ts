import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status;
    },
    getMessage(state) {
        return state.message;
    }
} as GetterTree<IState, IRootState>;
