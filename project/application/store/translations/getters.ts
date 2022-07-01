import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    getStatus(state) {
        return state.status;
    },
    getError(state) {
        return state.error;
    },
    getTranslationsData(state) {
        return state.data;
    }
} as GetterTree<IState, IRootState>;
