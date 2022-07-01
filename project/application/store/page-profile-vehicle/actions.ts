import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ActionTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IVueI18n } from 'vue-i18n';
import { IProfileVehiclePayload, IProfileVehiclePayloadParams } from '~/types/profile-data.interface';

export default {
    async fetchProfileVehicle({ commit }): Promise<void> {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_PROFILE_VEHICLE');
            const { data } = await $axios.get(`${this.app.$config.apiURL}/shop-api/${currentLang}/profile/vehicles`);
            commit('FETCH_PROFILE_VEHICLE_SUCCESS', data);
        } catch(e: any) {
            commit('FETCH_PROFILE_VEHICLE_ERROR', e?.response?.data);
        }
    },
    async addProfileVehicle({ commit, dispatch }, payload: IProfileVehiclePayload) {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('ADD_PROFILE_VEHICLE');
            await $axios.post(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/vehicles/new`,
                { ...payload }
            );
            await dispatch('fetchProfileVehicle', null)

            commit('ADD_PROFILE_VEHICLE_SUCCESS');
        } catch(e: any) {
            commit('ADD_PROFILE_VEHICLE_ERROR', e?.response?.data);
        }
    },
    async editProfileVehicle({ commit, dispatch }, { payload, vehicleID } : IProfileVehiclePayloadParams) {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('EDIT_PROFILE_VEHICLE');
            await $axios.patch(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/profile/vehicles/${vehicleID}`,
                { ...payload }
            );
            await dispatch('fetchProfileVehicle', null)

            commit('EDIT_PROFILE_VEHICLE_SUCCESS');
        } catch(e: any) {
            commit('EDIT_PROFILE_VEHICLE_ERROR', e?.response?.data);
        }
    },
    async deleteProfileVehicle({ commit, dispatch }, vehicleId: number) {
        const currentLang: string = (this.app.i18n as IVueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('DELETE_PROFILE_VEHICLE');
            await $axios.delete(`${this.app.$config.apiURL}/shop-api/${currentLang}/profile/vehicles/${vehicleId}`);
            await dispatch('fetchProfileVehicle', null)

            commit('DELETE_PROFILE_VEHICLE_SUCCESS');
        } catch(e: any) {
            commit('DELETE_PROFILE_VEHICLE_ERROR', e?.response?.data);
        }
    },
} as ActionTree<IState, IRootState>;
