export interface ICountryList {
    items: ICountryListItem[];
}

export interface ICountryListItem {
    code: string;
    name: string;
}

export interface IFormatedCountriesList {
    label: string;
    value: string;
}
