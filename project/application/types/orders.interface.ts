export interface IOrders {
    id: number;
    number: string;
    date: string;
    totalQuantity: number;
    totalItems: number;
    totalSum: number;
    shipmentType: string;
    shipmentState: string;
    paymentMethod: string;
    paymentState: string;
    status: string;
    oneCHash?: string;
    address: IOrderAddress;
    items: IOrderCard[] | [];
}

export interface IOrderCard {
    cart_item_id: number;
    quantity: number;
    unitPrice: number;
    total: number;
    code: string;
    name: string;
}

export interface IOrderAddress {
    id: number;
    country?: string;
    city: string;
    street: string;
    postcode: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    countryCode?: string;
    email?: string;
}

export interface IOrdersQuery {
    page: number | string,
    query: IQuery
}

export interface IOrdersHeaders {
    title: string,
    attribute: string
}

export interface IOrdersMeta {
    limit: number,
    current: number,
    totalCount: number,
    totalPages: number,
    nextPage?: number;
}

export interface IQuery {
    limit?: string | number,
    query?: string,
    dateFrom?: string,
    dateTo?: string,
    payments?: string[],
    shipments?: string[],
    field?: string,
    order?: string
}

export interface IOrdersFilter {
    shipments: IOrdersFIlterItem[] | [],
    payments: IOrdersFIlterItem[] | []
}

export interface IOrdersFIlterItem {
    code: string,
    name: string
}

export interface IOrdersFilterData {
    type: string,
    value: Array<string>
}