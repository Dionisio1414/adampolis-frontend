import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getError(state) {
        return state.error;
    },
    getMessage(state) {
        return state.message;
    },
    getStatus(state) {
        return state.status
    }
} as GetterTree<IState, IRootState>;
