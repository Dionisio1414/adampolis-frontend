import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    getStatus(state) {
        return state.status;
    }
} as GetterTree<IState, IRootState>
