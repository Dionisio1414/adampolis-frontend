import { IDictionary } from './dictionary.interface';

export interface IMenuItem {
    children: IMenuItem[];
    id: number;
    level: number;
    position: number;
    taxon: ITaxon;
    translations: IDictionary<IMenuTranslation>;
    type: string;
    image: IMenuImage;
}

export interface IMobileMenuCategories {
    code: string;
    id: number;
    items: IMenuItem[];
    showMenu: string;
    type: string;
}

export interface IMenuImage {
    id: number;
    path: string;
}

export interface IMenuTranslation {
    id: number;
    locale: string;
    title: string;
    url?: string;
}

export interface ITaxonTranslations {
    name: string;
    slug: string;
}

export interface ITaxon {
    children: ITaxon[];
    code: string;
    translations: IDictionary<ITaxonTranslations>;
}

export interface IMenuType {
    id: number;
    type: string;
    level: number;
    position: number;
    children: any[];
    page?: IMenuPage;
    translations: IDictionary<IMenuTranslation>;
}

export interface IMenuPage {
    id: number;
    code: number;
    translations: IDictionary<ITaxonTranslations>;
}

export interface ITypeLinkPage {
    caption: IMenuTranslation;
    page: ITaxonTranslations;
}
