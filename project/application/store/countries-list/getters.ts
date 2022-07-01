import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    getCountriesList(state) {
        return state.countriesList;
    }
} as GetterTree<IState, IRootState>;
