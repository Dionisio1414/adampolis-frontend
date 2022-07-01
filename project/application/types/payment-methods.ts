export interface IPaymentMethods {
    name: string;
    code: string;
    description?: string;
    instructions?: string;
    contractNo?: string;
    bankAccountNumber?: string;
    beneficiary?: string;
    location?: Partial<IPaymentMethodsLocation>;
}

export interface IPaymentMethodsLocation {
    id: number;
    code: string;
    internalName: string;
    phoneNumber: string;
    streetName: string;
    streetNumber: string;
    address: string;
    city: string
}

export interface IPaymentMethodPayload {
    cartToken: string | null;
    code?: string;
    bankCode?: string | null;
}

export interface IPaymentPayBy {
    redirect_url?: string;
    order_nr?: string;
}