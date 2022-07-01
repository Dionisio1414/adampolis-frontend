import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IProfileVehicleData } from '~/types/profile-data.interface';
import { IState } from './state';

export default {
    FETCH_PROFILE_VEHICLE(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_PROFILE_VEHICLE_SUCCESS(state, payload: IProfileVehicleData) {
        state.status = EStatus.SUCCESS;
        state.vehicles = payload;
        state.error = null;
    },
    FETCH_PROFILE_VEHICLE_ERROR(state, payload: Error) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.vehicles = null;
    },
    ADD_PROFILE_VEHICLE(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    ADD_PROFILE_VEHICLE_SUCCESS(state) {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    ADD_PROFILE_VEHICLE_ERROR(state, payload: Error) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.vehicles = null;
    },
    EDIT_PROFILE_VEHICLE(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    EDIT_PROFILE_VEHICLE_SUCCESS(state) {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    EDIT_PROFILE_VEHICLE_ERROR(state, payload: Error) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.vehicles = null;
    },
    DELETE_PROFILE_VEHICLE(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    DELETE_PROFILE_VEHICLE_SUCCESS(state) {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    DELETE_PROFILE_VEHICLE_ERROR(state, payload: Error) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.vehicles = null;
    }
} as MutationTree<IState>;
