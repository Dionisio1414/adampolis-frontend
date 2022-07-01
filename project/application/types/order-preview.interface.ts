export interface IOrderPreview {
    id: number,
    totalQuantity: number,
    number: string,
    totalSum: number,
    totalItems: number,
    date: string,
    shipmentType: string,
    shipmentState: string,
    paymentState: string,
    status: string,
    items: IOrderPreviewItems[] | [],
    address: IOrderPreviewAddress
}

export interface IOrderPreviewAddress {
    id: number,
    phoneNumber: string,
    countryCode: string,
    city: string,
    street: string,
    postcode: string
}

export interface IOrderPreviewItems {
    cart_item_id: number,
    quantity: number,
    unitPrice: number,
    total: number,
    code: string,
    name: string
}