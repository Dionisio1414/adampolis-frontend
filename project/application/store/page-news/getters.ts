import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getNewsList(state) {
        return state?.list;
    },
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status
    },
    getNewsListMeta(state) {
        return state?.meta;
    }
} as GetterTree<IState, IRootState>;