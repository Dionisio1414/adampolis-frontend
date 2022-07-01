import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    formValue(state) {
        return state.form;
    }
} as GetterTree<IState, IRootState>;
