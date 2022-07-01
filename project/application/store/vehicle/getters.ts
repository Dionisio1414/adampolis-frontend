import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    getVehicleManufacturers(state) {
        return state.manufacturers;
    },
    getVehicleModel(state) {
        return state.models;
    },
    getVehicleModifications(state) {
        return state.modifications;
    },
    getVehicleTaxons(state) {
        return state.taxons;
    },
    getVehicleVin(state) {
        return state.vin;
    },
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status;
    }
} as GetterTree<IState, IRootState>
