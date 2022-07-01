export interface ICatalog {
    taxon: ICatalogTaxon;
    manufacturers?: ICatalogManufacturers[] | [];
    attributes?: ICatalogAttributes[] | [];
    products?: ICatalogProducts[] | [];
    meta: ICatalogMeta;
}

export interface ICatalogTaxon {
    id: number;
    code: string;
    name: string;
    slug: string;
    breadcrumbs?: ICatalogBreadcrumbs[];
}

export interface ICatalogBreadcrumbs {
    id: number;
    code: string;
    name: string;
    slug: string;
}

export interface ICatalogMeta {
    limit: number;
    current: number;
    totalCount: number;
    totalPages: number;
    nextPage: number;
}

export interface ICatalogManufacturers {
    id: number;
    name: string;
}

export interface ICatalogAttributes {
    id: number;
    code: string;
    type: string;
    name: string;
    range?: {
        min: number;
        max: number;
    }
    values: ICatalogAttributeValues[] | [];
    configuration?: ICatalogAttributeConfiguration[] | [];
}

export interface ICatalogAttributeValues {
    key: string | number;
    doc_count: string | number;
}

export interface ICatalogAttributeConfiguration {
    key: string | number;
    name: string | number;
}

export interface ICatalogProducts {
    id: number;
    code: string;
    slug: string;
    oemProduct: boolean;
    displayName: string;
    externalCode: string;
    description?: string;
    isOnSale: boolean;
    analogs: any[];
    vehicles: ICatalogVehicle[] | [];
    priceWithTax: number;
    priceWithoutTax: number;
    image?: string;
    attributes?: ICatalogProductAttribute[] | [];
    manufacturer?: ICatalogProductManufacturer;
    files?: ICatalogProductFiles[] | [];
    stockTotal: number;
    stock: ICatalogProductsStock[] | []
}

export interface ICatalogProductsStock {
    location: {
        name: string;
        slug: string;
    };
    stock: number;
}

export interface ICatalogProductManufacturer {
    name: string;
    image: string;
}

export interface ICatalogProductAttribute {
    name: string;
    type: string;
    value: number | boolean;
}

export interface ICatalogVehicle {
    manufacturer: string;
    model: string;
    type: string;
    yearFrom: string;
    powerKw: number;
    powerHp: number;
}

export interface ICatalogProductFiles {
    mimeType: string;
    path: string;
}

export interface ICatalogForm {
    page: number;
    limit: number;
    'article_manufacturers[]': Array<number>;
    [key: string]: number | number[] | string[] | string;
}

export interface IRange {
    code: string | number;
    value: Array<number>;
    min: number;
    max: number;
    disabled?: false;
    name: string;
}

export interface ICatalogAttributeData {
    code: string | number;
    type: string;
    list: ICatalogAttributeValues[] | ICatalogAttributeConfiguration[];
}

export interface ICatalogFillForm {
    catalog: ICatalog;
    reset?: boolean;
}

export interface ISortLimit {
    label: string;
    value: number;
}

export interface ISortBy {
    label: string;
    value: string;
}

