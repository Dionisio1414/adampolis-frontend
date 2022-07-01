import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    FETCH_PICKUP_DATA(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_PICKUP_DATA_SUCCESS(state, payload) {
        state.status = EStatus.SUCCESS;
        state.pickupData = payload;
        state.error = null;
    },
    FETCH_PICKUP_DATA_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    SET_PICKUP_DATA(state) {
        state.statusPickup = EStatus.PROCESSING;
        state.error = null;
    },
    SET_PICKUP_DATA_SUCCESS(state) {
        state.statusPickup = EStatus.SUCCESS;
        state.error = null;
    },
    SET_PICKUP_DATA_ERROR(state, payload) {
        state.statusPickup = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
