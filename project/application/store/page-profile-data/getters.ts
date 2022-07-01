import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getProfileData(state) {
        return state.data;
    },
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status
    }
} as GetterTree<IState, IRootState>;
