export interface IVehicleModels {
    id: number;
    year_of_construction_from: string;
    year_of_construction_to: string;
    favourite: boolean;
    name: string;
}

export interface IVehileModifications {
    id: number;
    year_of_constr_from: string;
    year_of_constr_to: string;
    type_name: string;
    full_name: string;
}

export interface IVehicleTaxons {
    id: number;
    name: string;
    slug: string;
}

export interface IVehicleManufacturers {
    id: number;
    name: string;
    favourite: boolean;
    description?: string;
}

export interface IVehicle {
    id: number;
    type: string;
    yearFrom: string;
    yearTo: string;
    powerKw: string;
    powerHp: string;
    manufacturer?: IVehicleFields;
    model?: IVehicleFields;
}

export interface IVehicleFields {
    id: number;
    name: string; 
}

export interface IVehicleByVin {
    id: number;
    type_name: string;
    full_name: string;
    year_of_constr_from: string;
    year_of_constr_to: string;
    model: IVehicleManufacturers;
    manufacturer: IVehicleModels;
}

export interface IVehicleAutocompleteData {
    data: IVehicleByVin[]
}