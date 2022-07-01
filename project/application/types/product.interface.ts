import { IDictionary } from "./dictionary.interface";

export interface IProduct {
    name: string,
    code: string,
    sku: string,
    quantity: string,
    prices: {
        withtax: {
            price: number | null,
            oldPrice: number | null
        },
        withouttax: {
            price: number | null,
            oldPrice: number | null
        }
    }
}

export interface IProductInner {
    id: number;
    code: string;
    slug: string;
    oemProduct: boolean;
    displayName: string;
    externalCode: string;
    isOnSale: boolean;
    isDeposit: boolean;
    quantityPerPackage: number;
    analogs?: IProductInner[];
    vehicles: IProductInnerVehicle[];
    images?: string[];
    image?: string;
    priceWithTax: number;
    priceWithoutTax: number;
    stockTotal: number;
    discount?: number;
    priceWithTaxDiscount?: number,
    priceWithoutTaxDiscount?: number,
    manufacturer?: IProductInnerManufacturer;
    attributes?: IProductInnerAttribute[];
    files?: IProductInnerFile[];
    stock?: IProductInnerStock[];
    taxon: IProductInnerTaxon;
    set?: IProductInner[];
    deposit?: IProductDeposit;
    additionalArticles?: string;
    tecDocName?: string;
}

export interface IProductDeposit {
    amount: number;
    vatInclude: boolean;
}

export interface IProductInnerVehicle {
    manufacturer: string;
    model: string;
    type: string;
    yearFrom: string;
    yearTo: string;
    powerKw: string;
    powerHp: string;
}

export interface IProductInnerStock {
    location: {
        name: string;
        slug: string;
    };
    stock: number;
}

export interface IProductInnerAttribute {
    name: string;
    type: string;
    value: string | number;
}

export interface IProductInnerFile {
    mimeType: string;
    path: string;
}

export interface IProductInnerManufacturer {
    name: string;
    image: string;
}

export interface IProductInnerTaxon {
    id: number;
    code: string;
    name: string;
    slug: string;
    breadcrumbs?: IProductInnerBreadcrumbs[];
}

export interface IProductInnerBreadcrumbs {
    id: number;
    code: string;
    name: string;
    slug: string;
}