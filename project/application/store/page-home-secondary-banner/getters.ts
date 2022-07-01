import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    getSecondaryBanner({ secondaryBanner }) {
        if (secondaryBanner.length) {
            return secondaryBanner;
        } else {
            return [];
        }
    }
} as GetterTree<IState, IRootState>
