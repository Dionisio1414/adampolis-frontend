export interface ICheckoutError {
    items: ICheckoutErrorItem[];
}

export interface ICheckoutErrorItem {
    available: number;
    code: string;
    errorType: ECheckoutErrorType;
    message: string;
    orderItemId: number;
    productId: number;
}

export enum ECheckoutErrorType {
    PRODUCT_NOT_AVAILABLE = 'PRODUCT_NOT_AVAILABLE'
}
