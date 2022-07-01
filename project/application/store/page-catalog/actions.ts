import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n from 'vue-i18n';

import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

import { IUpdateFieldPayload } from '~/types/update-field-payload.interface';
import { formSerializer } from '~/utils/catalog-serialize';
import catalogFormValueFilter from '~/utils/catalog-form-value-filter';
import { ICatalogAttributes, ICatalogForm } from '~/types/catalog.interface';
import { IDictionary } from '~/types/dictionary.interface';

export default {
    async fetchCatalog({ commit, dispatch, getters }, { slug, formValue, reset = false }): Promise<void> {
        const currentLang: string = (this.app.i18n as VueI18n).locale;
        const $axios: NuxtAxiosInstance = this.$axios;

        try {
            commit('FETCH_CATALOG');

            const attributesMap: IDictionary<ICatalogAttributes> = getters['attributesMap'];
            const formValueFiltered: Partial<ICatalogForm> = catalogFormValueFilter(formValue, attributesMap);
            const params: string = formSerializer(formValueFiltered);
            
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/shop-api/${currentLang}/products/taxon/${slug}${params ? '?' + params : ''}`
            );

            commit('FETCH_CATALOG_SUCCESS', data);

            dispatch('page-catalog-form/fillForm', { catalog: data, reset }, { root: true });

        } catch(e: any) {
            commit('FETCH_CATALOG_ERROR', e?.response?.data);
        }
    },
    upadteFormField({ commit }, payload: IUpdateFieldPayload<any>) {
        commit('SET_FORM_FIELD', payload);
    },
} as ActionTree<IState, IRootState>;
