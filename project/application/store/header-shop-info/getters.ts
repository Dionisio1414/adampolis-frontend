import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IShopInfo } from '~/types/shop-info.interface';
import { IState } from './state';

export default {
    getShopInfo(state): IShopInfo | null {
        return state.shopInfo;
    }
} as GetterTree<IState, IRootState>
