import { IMenuItem } from './header-menu.interface';

export interface IShopMenuRoot {
    items: IShopMenu[]
}

export interface IShopMenu {
    id: number;
    code: string;
    type: string;
    shopMenu: string;
    items: IMenuItem[];
}
