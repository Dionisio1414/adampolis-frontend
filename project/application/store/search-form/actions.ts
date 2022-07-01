import { ActionTree } from 'vuex';

import { IRootState } from '~/store-utils/state.interface';
import { ISearchForm } from '~/types/search.interface';
import { IUpdateFieldPayload } from '~/types/update-field-payload.interface';
import { IState } from './state';

export default {
    setFormField({ commit }, payload: IUpdateFieldPayload<any>) {
        commit('SET_FORM_FIELD', payload);
    },
    updateFormValue({ commit }, payload: Partial<ISearchForm>) {
        commit('UPDATE_FORM_VALUE', payload);
    },
    clear({ commit }): void {
        commit('clear');
    }
} as ActionTree<IState, IRootState>;
