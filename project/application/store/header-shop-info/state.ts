import { IShopInfo } from '~/types/shop-info.interface';

export interface IState {
    shopInfo: IShopInfo | null
};

export default (): IState => ({
    shopInfo: null
});
