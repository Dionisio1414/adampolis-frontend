import { ActionTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    async fetchVehicleByVin({ commit, dispatch }, vin: string): Promise<void> {
        try {
            commit('FETCH_VEHICLE_BY_VIN');

            const data = await dispatch('vehicle/fetchVehicleByVin', vin, { root: true });

            commit('FETCH_VEHICLE_BY_VIN_SUCCESS', data);

            return data;
        } catch(e: any) {
            commit('FETCH_VEHICLE_BY_VIN_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleById({ commit, dispatch }, id: number | string): Promise<void> {
        try {
            commit('FETCH_VEHICLE_BY_ID');

            const data = await dispatch('vehicle/fetchVehicleById', id, { root: true });

            commit('FETCH_VEHICLE_BY_ID_SUCCESS');

            return data;
        } catch(e: any) {
            commit('FETCH_VEHICLE_BY_ID_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleManufacturers({ commit, dispatch }): Promise<void> {
        try {
            commit('FETCH_VEHICLE_MANUFACTURERS');

            const data = await dispatch('vehicle/fetchVehicleManufacturers',  null, { root: true });

            commit('FETCH_VEHICLE_MANUFACTURERS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_VEHICLE_MANUFACTURERS_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleModels({ commit, dispatch }): Promise<void> {
        try {
            commit('FETCH_VEHICLE_MODELS');

            const data = await dispatch('vehicle/fetchVehicleModels',  null, { root: true });

            commit('FETCH_VEHICLE_MODELS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_VEHICLE_MODELS_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleManufacturerModels({ commit, dispatch }, manufacturerId: number | string): Promise<void> {
        try {
            commit('FETCH_VEHICLE_MODELS');

            const data = await dispatch('vehicle/fetchVehicleManufacturerModels', manufacturerId, { root: true });

            commit('FETCH_VEHICLE_MODELS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_VEHICLE_MODELS_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleModifications({ commit, dispatch }, modelId: number | string): Promise<void> {
        try {
            commit('FETCH_VEHICLE_MODIFICATIONS');

            const data = await dispatch('vehicle/fetchVehicleModifications', modelId, { root: true });

            commit('FETCH_VEHICLE_MODIFICATIONS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_VEHICLE_MODIFICATIONS_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleTaxons({ commit, dispatch }, vehicle: number | string): Promise<void> {
        try {
            commit('FETCH_VEHICLE_TAXONS');

            const data = await dispatch('vehicle/fetchVehicleTaxons', vehicle, { root: true });

            commit('FETCH_VEHICLE_TAXONS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_VEHICLE_TAXONS_ERROR', e?.response?.data);
        }
    },
} as ActionTree<IState, IRootState>;
