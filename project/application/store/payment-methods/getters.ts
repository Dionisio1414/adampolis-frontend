import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getPaymentMethods(state) {
        return state.paymentMethods;
    },
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status;
    }
} as GetterTree<IState, IRootState>;
