import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getPrivacyPolicy(state) {
        return state.data;
    },
} as GetterTree<IState, IRootState>;
