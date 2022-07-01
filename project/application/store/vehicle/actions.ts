import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';
import VueI18n from 'vue-i18n';
import { IUpdateFieldPayload } from '~/types/update-field-payload.interface';

export default {
    async fetchVehicleByVin({ commit }, vin: string): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        const params = {
            vin
        };

        try {
            commit('FETCH_VEHICLE_BY_VIN');

            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/vehicle/by-vin`,
                {
                    params
                }
            );

            commit('FETCH_VEHICLE_BY_VIN_SUCCESS', data);

            return data;
        } catch(e: any) {
            commit('FETCH_VEHICLE_BY_VIN_ERROR', e?.response?.data);
        }
    },

    async fetchVehicleById({ commit }, id: number | string): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_VEHICLE_BY_ID');

            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/vehicle/${id}`);

            commit('FETCH_VEHICLE_BY_ID_SUCCESS');

            return data;
        } catch(e: any) {
            commit('FETCH_VEHICLE_BY_ID_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleManufacturers({ commit, state }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            if (state.manufacturers.length) {
                return;
            }

            commit('FETCH_VEHICLE_MANUFACTURERS');

            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/vehicle/manufacturers`);

            commit('FETCH_VEHICLE_MANUFACTURERS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_VEHICLE_MANUFACTURERS_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleModels({ commit, state }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            if (state.models.length) {
                return;
            }

            commit('FETCH_VEHICLE_MODELS');

            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/vehicle/models`);

            commit('FETCH_VEHICLE_MODELS_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_VEHICLE_MODELS_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleManufacturerModels({ commit, state }, manufacturerId: number | string): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_VEHICLE_MODELS');

            const cached = state.manufacturerModelsCache[manufacturerId];

            if (cached?.length) {
                commit('FETCH_VEHICLE_MODELS_SUCCESS', { items: cached, manufacturerId });
                return;
            }

            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/vehicle/manufacturer/${manufacturerId}/models`);

            commit('FETCH_VEHICLE_MODELS_SUCCESS', { ...data, manufacturerId });
        } catch(e: any) {
            commit('FETCH_VEHICLE_MODELS_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleModifications({ commit, state }, modelId: number | string): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_VEHICLE_MODIFICATIONS');

            const cached = state.vehicleModificationsCache[modelId];

            if (cached?.length) {
                commit('FETCH_VEHICLE_MODIFICATIONS_SUCCESS', { items: cached, modelId });
                return;
            }

            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/vehicle/model/${modelId}/modifications`);

            commit('FETCH_VEHICLE_MODIFICATIONS_SUCCESS', { ...data, modelId });
        } catch(e: any) {
            commit('FETCH_VEHICLE_MODIFICATIONS_ERROR', e?.response?.data);
        }
    },
    async fetchVehicleTaxons({ commit, state }, vehicle: number | string): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;
        try {
            commit('FETCH_VEHICLE_TAXONS');

            const cached = state.vehicleTaxonsCache[vehicle];

            if (cached?.length) {
                commit('FETCH_VEHICLE_TAXONS_SUCCESS', { items: cached, vehicle });
                return;
            }

            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/vehicle/taxons`,
                {
                    params: { vehicle }
                }
            );

            commit('FETCH_VEHICLE_TAXONS_SUCCESS', { ...data, vehicle });
        } catch(e: any) {
            commit('FETCH_VEHICLE_TAXONS_ERROR', e?.response?.data);
        }
    },
    clearVehicleField({ commit }, payload: IUpdateFieldPayload<any>) {
        commit('CLEAR_VEHICLE_FIELD', payload);
    }
} as ActionTree<IState, IRootState>;
