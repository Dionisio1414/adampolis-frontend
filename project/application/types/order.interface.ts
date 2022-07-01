export interface IOrder {
    date: string,
    orderId: string,
    priceVat: string,
    deliveryType: string,
    payment: string | string[],
    shipment_status: string,
    isOrder?: boolean 
}