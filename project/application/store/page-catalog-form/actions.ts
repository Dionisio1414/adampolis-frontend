import { ActionTree } from 'vuex';

import { IRootState } from '~/store-utils/state.interface';
import { IUpdateFieldPayload } from '~/types/update-field-payload.interface';
import { IState } from './state';
import { ICatalogFillForm, ICatalogForm } from '~/types/catalog.interface';
import { EProductAttributeTypes } from '~/constants/product-attribute-types';

export default {
    setFormField({ commit }, payload: IUpdateFieldPayload<any>): void {
        commit('SET_FORM_FIELD', payload);
    },
    updateFormValue({ commit }, payload: Partial<ICatalogForm>): void {
        commit('UPDATE_FORM_VALUE', payload);
    },
    fillForm({ commit, state }, { catalog, reset }: ICatalogFillForm) {
        const oldForm: any = reset ? {} : state.form;
        const form: any = {};

        if(oldForm['article_manufacturers[]']) { 
            form['article_manufacturers[]'] = oldForm['article_manufacturers[]'];
        } else {
            form['article_manufacturers[]'] = [];
        }

        // @ts-ignore
        (catalog.attributes || []).forEach(item => {
            if (item.type === EProductAttributeTypes.FLOAT) {
                const min: number = item.range?.min || 0;
                const max: number = item.range?.max || 0;

                const minKey = `attributes[attribute_${item.code}][min]`;
                const maxKey = `attributes[attribute_${item.code}][max]`;

                // @ts-ignore
                form[minKey] = oldForm[minKey] == null ? min : oldForm[minKey];
                // @ts-ignore
                form[maxKey] = oldForm[maxKey] == null ? max : oldForm[maxKey];
            } else {
                const key = `attributes[attribute_${item.code}][]`
                // @ts-ignore
                form[key] = oldForm[key] || [];
            }
        })

        commit('UPDATE_FORM_VALUE', form);
    },
    clear({ commit }): void {
        commit('clear');
    }
} as ActionTree<IState, IRootState>;
