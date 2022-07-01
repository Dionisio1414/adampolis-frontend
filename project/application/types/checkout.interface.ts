import { IDictionary } from "./dictionary.interface";
import { IProfileData } from "./profile-data.interface";

export interface IPickupData {
    items: IDictionary<IPickupItem>
}

export interface IPickupItem {
    id: number;
    code: string;
    internalName: string;
    streetName: string;
    streetNumber: string;
    address: string;
    city: string;
    phoneNumber: string;
}

export interface ICustomerRequestBody {
    // body: IProfileData;
    payload: Partial<ICheckoutDilevery>;
    cartToken?: string | null;
}

export interface IPickupRequest {
    pointOfSale: number;
    customerId: number;
    cartToken?: string | null;
}

export interface ICheckoutDilevery {
    customer: number | null;
    isCompany: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    city: string;
    street: string;
    postcode: number | string;
    notes: string;
    company: string;
    companyName: string;
    companyCode: string;
    vatCode: string;
    pointOfSale: number;
}
