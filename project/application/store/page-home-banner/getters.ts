import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    getMainBanner(state) {
        return state.mainBanner;
    }
} as GetterTree<IState, IRootState>
