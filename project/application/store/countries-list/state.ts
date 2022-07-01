import { ICountryList } from '~/types/countries-list.interface';

export interface IState {
    countriesList: ICountryList[]
}

export default (): IState => {
    return {
        countriesList: []
    }
}

