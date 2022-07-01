import Vue from 'vue'
import { MutationTree } from 'vuex';
import initialState, { IState } from './state';
import { IUpdateFieldPayload } from '~/types/update-field-payload.interface';
import { ICatalogForm } from '~/types/catalog.interface';

export default {
    SET_FORM_FIELD: (state, { field, value }: IUpdateFieldPayload<any>) => {
        // @ts-ignore
        Vue.set(state.form, field, value)
    },
    UPDATE_FORM_VALUE: (state, payload: Partial<ICatalogForm>) => {
        state.form = { ...state.form, ...payload };
    },
    SET_FORM_VALUE: (state, payload: ICatalogForm) => {
        state.form = payload;
    },
    CLEAR: (state) => {
        state.form = initialState().form;
    }
} as MutationTree<IState>;

