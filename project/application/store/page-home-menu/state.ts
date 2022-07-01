import { IShopMenuRoot } from '~/types/shop-menu.interface';

export interface IState {
    shopMenu: IShopMenuRoot | null
}

export default (): IState => ({
    shopMenu: null
})
