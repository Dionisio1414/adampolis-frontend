import { IDictionary } from '~/types/dictionary.interface';

export const queryParser = (queryObject: IDictionary<any>) => {
    return Object.entries(queryObject).map(([key, value]) => `${key}=${value}`).join('&') || '';
}   
