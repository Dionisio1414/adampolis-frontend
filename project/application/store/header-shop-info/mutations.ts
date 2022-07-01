import { MutationTree } from 'vuex';
import { IState } from './state';

export default {
    UPDATE_SHOP_INFO(state, payload: any): void {
        state.shopInfo = payload;
    }
} as MutationTree<IState>;
