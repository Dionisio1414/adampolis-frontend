import { MutationTree } from 'vuex';
import { IState } from './state';
import { EStatus } from '~/constants/status';

export default {
    FETCH_VEHICLE_BY_VIN(state) {
        state.status = EStatus.PROCESSING;
    },
    FETCH_VEHICLE_BY_VIN_SUCCESS(state) {
        state.status = EStatus.SUCCESS;
    },
    FETCH_VEHICLE_BY_VIN_ERROR(state) {
        state.status = EStatus.ERROR;
    },
    FETCH_VEHICLE_BY_ID(state) {
        state.status = EStatus.PROCESSING;
    },
    FETCH_VEHICLE_BY_ID_SUCCESS(state) {
        state.status = EStatus.SUCCESS;
    },
    FETCH_VEHICLE_BY_ID_ERROR(state, payload) {
        state.status = EStatus.ERROR;
    },
    FETCH_VEHICLE_MANUFACTURERS(state) {
        state.status = EStatus.PROCESSING;
    },
    FETCH_VEHICLE_MANUFACTURERS_SUCCESS(state, { items }) {
        state.status = EStatus.SUCCESS;
    },
    FETCH_VEHICLE_MANUFACTURERS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
    },
    FETCH_VEHICLE_MODELS(state) {
        state.status = EStatus.PROCESSING;
    },
    FETCH_VEHICLE_MODELS_SUCCESS(state, { items }) {
        state.status = EStatus.SUCCESS;
    },
    FETCH_VEHICLE_MODELS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
    },
    FETCH_VEHICLE_MODIFICATIONS(state) {
        state.status = EStatus.PROCESSING;
    },
    FETCH_VEHICLE_MODIFICATIONS_SUCCESS(state, { items }) {
        state.status = EStatus.SUCCESS;
    },
    FETCH_VEHICLE_MODIFICATIONS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
    },
    FETCH_VEHICLE_TAXONS(state) {
        state.status = EStatus.PROCESSING;
    },
    FETCH_VEHICLE_TAXONS_SUCCESS(state, { items }) {
        state.status = EStatus.SUCCESS;
    },
    FETCH_VEHICLE_TAXONS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
    },
} as MutationTree<IState>;
