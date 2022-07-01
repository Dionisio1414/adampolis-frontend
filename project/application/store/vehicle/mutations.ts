import Vue from 'vue';

import { MutationTree } from 'vuex';
import { IState } from './state';
import { EStatus } from '~/constants/status';
import { IVehicleByVin } from '~/types/vehicle.interface';
import { IUpdateFieldPayload } from '~/types/update-field-payload.interface';

export default {
    FETCH_VEHICLE_BY_VIN(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_VEHICLE_BY_VIN_SUCCESS(state, { items }: { items: IVehicleByVin[] }) {
        state.status = EStatus.SUCCESS;
        state.vin = items;
        state.error = null;
    },
    FETCH_VEHICLE_BY_VIN_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.vin = [];
        state.error = payload;
    },
    FETCH_VEHICLE_BY_ID(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_VEHICLE_BY_ID_SUCCESS(state, id: number | string) {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    FETCH_VEHICLE_BY_ID_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    FETCH_VEHICLE_MANUFACTURERS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_VEHICLE_MANUFACTURERS_SUCCESS(state, { items }) {
        state.status = EStatus.SUCCESS;
        state.manufacturers = items;
        state.error = null;
    },
    FETCH_VEHICLE_MANUFACTURERS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.manufacturers = [];
    },
    FETCH_VEHICLE_MODELS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_VEHICLE_MODELS_SUCCESS(state, { items, manufacturerId }) {
        state.status = EStatus.SUCCESS;
        state.models = items;
        state.error = null;
        state.manufacturerModelsCache[manufacturerId] = items;
    },
    FETCH_VEHICLE_MODELS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.models = [];
    },
    FETCH_VEHICLE_MODIFICATIONS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_VEHICLE_MODIFICATIONS_SUCCESS(state, { items, modelId }) {
        state.status = EStatus.SUCCESS;
        state.modifications = items;
        state.error = null;
        state.vehicleModificationsCache[modelId] = items;
    },
    FETCH_VEHICLE_MODIFICATIONS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.modifications = [];
    },
    FETCH_VEHICLE_TAXONS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_VEHICLE_TAXONS_SUCCESS(state, { items, vehicle }) {
        state.status = EStatus.SUCCESS;
        state.taxons = items;
        state.error = null;
        state.vehicleTaxonsCache[vehicle] = items;
    },
    FETCH_VEHICLE_TAXONS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.taxons = [];
    },
    CLEAR_VEHICLE_FIELD(state, { field, value }: IUpdateFieldPayload<any>) {
        Vue.set(state, field, value);
    }
} as MutationTree<IState>;
