import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getPickupData(state) {
        return state.pickupData;
    },
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status
    },
    getStatusPickup(state) {
        return state.statusPickup
    }
} as GetterTree<IState, IRootState>;
