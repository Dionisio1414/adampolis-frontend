import { IDictionary } from './dictionary.interface';

export interface ICart {
    channel: string;
    currency: string;
    locale: string;
    checkoutState: string;
    items: ICartItem[];
    shippingState: string;
    tokenValue: string;
    totals: ICartTotals;
    payments?: ICartPayments[];
    shipments?: ICartShipments[];
    cartDiscounts?: any[];
    shippingAddress?: IDictionary<ICartAddress>;
    billingAddress?: IDictionary<ICartAddress>;
    couponCode?: string;
}

export interface ICartProducts {
    id: number;
    tokenValue: string;
    state: string;
    checkoutState: string;
    shippingState: string;
    totalQuantity: number;
    totalSum: number;
    totalItems: number;
    items: ICartProductsItem[];
}

export interface ICartItem {
    id: number;
    quantity: number;
    total: number;
    product: ICartItemProduct;
    taxes: number;
}

export interface ICartProductsItem {
    cart_item_id: number;
    quantity: number;
    unitPrice: number;
    total: number;
    product: {
        product_id: number,
        name: string;
        slug: string;
        code: string;
        shortDescription: string;
        image: string;
    }
}

export interface ICartItemProduct {
    code: string;
    name: string;
    slug: string;
    channelCode: string;
    description: string;
    shortDescription: string;
    averageRating: number | string;
    taxons: IDictionary<ICartItemProductTaxons>,
    variants: ICartItemProductVariants[],
    attributes: ICartItemProductAttributes[];
    associations: IDictionary<string[]>;
    images: ICartItemProductImages[];
    _links: {
        self: {
            href: string;
        }
    }
}

export interface ICartItemProductVariants {
    code: string;
    axis: string[];
    nameAxis: IDictionary<string>;
    available: boolean;
    price: ICartItemProductPrice;
    images: ICartItemProductImages
}

export interface ICartItemProductTaxons {
    main: string;
    others: string[];
}

export interface ICartItemProductImages {
    code?: string;
    path: string;
    cachedPath?: string;
}

export interface ICartItemProductPrice {
    current: number;
    currency: string;
}

export interface ICartItemProductAttributes {
    code: string;
    name: string;
    value: string;
}

export interface ICartTotals {
    total: number;
    items: number;
    taxes: number;
    shipping: number;
    promotion: number;
}

export interface ICartPayments {
    state: string;
    method: {
        code: string;
        name: string;
        description: string;
        instructions: string;
    },
    price: {
        current: number;
        currency: string;
    }
}

export interface ICartShipments {
    state: string;
    method: {
        code: string;
        name: string;
        description: string;
        price: {
            current: number;
            currency: string;
        }
    }
}

export interface ICartAddress {
    firstName: string,
    lastName: string,
    countryCode: string,
    street: string,
    city: string,
    postcode: string,
    provinceName: string,
    company: string,
    phoneNumber: string
};

export interface ICartProductData {
    productCode: string;
    quantity: number;
}

export interface ICartProductChangeData {
    quantity: number; 
    id: number;
}
