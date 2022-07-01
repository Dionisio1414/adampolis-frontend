import { IFormatedCountriesList } from './countries-list.interface';
import { IDictionary } from './dictionary.interface';

export interface IProfileData {
    id?: number;
    isCompany?: boolean;
    companyName: string;
    companyCode: string;
    vatCode: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phoneNumber?: string;
    isManager?: boolean;
    isSubscribedToNewsletter?: boolean;
    companyAddress?: IAddress;
    customers?: ICustomer[];
    addresses?: IAddressForm[];
    defaultAddress?: Partial<IAddressForm>
    email: string;
}

export interface IProfileForm {
    companyName?: string;
    companyCode?: string;
    vatCode?: string;
    firstName: string;
    lastName: string;
    companyAddress?: IAddress;
    email?: string;
    phoneNumber?: string;
    id?: number;
}

export interface IAddress {
    id?: number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    city?: string;
    street?: string;
    postcode?: string;
    country?: string | object;
    countryCode?: string | object;
}

export interface IAddressForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    street: string;
    postcode: string;
    countryCode: string | undefined;
    country?: IFormatedCountriesList;
    id?: number;
    fullName?: string;
}

export interface ICompanyAddress {
    city: string;
    street: string;
    postcode: string;
    countryCode: string | undefined;
}

export interface IIndividualForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface ICustomer {
    companyAddress: ICompanyAddress;
    companyCode: string;
    companyName: string;
    customers?: IDictionary<ICustomer>;
    addresses?: IDictionary<ICustomer>;
    defaultAddressId: number;
    email: string;
    firstName: string;
    fullName: string;
    id?: number;
    isCompany: boolean;
    isSubscribedToNewsletter: boolean;
    lastName: string;
    phoneNumber: string;
    vatCode: string;
    notes?: string;
    position: string;
    componentKey: number;
}

export interface IProfileUpdateRequest {
    body: IProfileForm,
    id?: number; 
}

export interface IProfileCreditLine {
    creditOrderCount: number;
    creditOrderSum: number;
    limit: number;
    creditDays: number;
    allow: boolean;
}

export interface IProfileCreditLinePayload {
    amount: string;
    period: string;
}

export interface IProfileContracts {
    Code: string;
    No: string;
    Currency: string;
    ValidFrom: string;
    ValidTo: string;
    PriceType: string;
    default: string;
    files: any[]
}
export interface IProfileVehicleData {
    items: IDictionary<IProfileVehicleDataItems[]>
}

export interface IProfileVehicleDataItems {
    id: number;
    vin: string;
    constructionType: string;
    model: string;
    motorCodes: any[];
    powerHpFrom: number;
    tonnage: number;
    yearOfConstrFrom: string;
    firstRegistrationAt: string;
    firstRegistrationInLitAt: string;
    licensePlate: string;
    technicalInspectionAt: string;
    tachographInspectionAt: string;
    counterparty: string;
    note: string;
}

export interface IProfileVehiclePayload {
    vin: string | null;
    model?: IProfileVehiclePayloadModel;
    vehicleModel?: number | null;
    motorCode: string | null;
    motorCodes?: string[];
    constructionType?: string | null;
    weightCategory?: string | null;
    powerHpFrom: number | null;
    powerHp?: number | null;
    tonnage?: number | null;
    yearOfConstrFrom: string | null;
    firstRegistrationAt: string | null;
    firstRegistrationInLitAt: string | null;
    firstRegistration?: string | null;
    firstRegistrationInLit?: string | null;
    tachographInspection?: string | null;
    technicalInspection?: string | null;
    licensePlate: string | null;
    technicalInspectionAt: string | null;
    tachographInspectionAt: string | null;
    counterparty: string | null;
    note: string | null;
    translation: {
      constructionType?: string | null;
    }
  }

  export interface IProfileVehiclePayloadModel {
    id: number;
    name: string;
  }

  export interface IProfileVehicleWeightCategories {
      code: string;
      title: string;
  }

  export interface IProfileVehiclePayloadParams {
      payload: IProfileVehiclePayload;
      vehicleID: number;
  }
