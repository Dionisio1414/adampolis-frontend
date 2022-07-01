import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getCartData(state) {
        return state.data;
    },
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status;
    },
    getMessage(state) {
        return state.message;
    },
    getToken(state) {
        return state.token;
    }
} as GetterTree<IState, IRootState>;
