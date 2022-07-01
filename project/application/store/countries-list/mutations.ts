import { MutationTree } from 'vuex';
import { IState } from './state';
import { ICountryList } from '~/types/countries-list.interface';

export default {
    UPDATE_COUNTRIES_LIST(state, payload: ICountryList[]) {
        state.countriesList = payload;
    }
} as MutationTree<IState>
