import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { EStatus } from '~/constants/status';

export default {
    isStatus(state): EStatus {
        return state.status;
    },
    getError(state) {
        return state.error;
    }
} as GetterTree<IState, IRootState>;
