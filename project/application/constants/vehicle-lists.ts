import { IProfileVehicleWeightCategories } from "~/types/profile-data.interface";

export const TYPES_LIST: string[] = [
    'traktorius',
    'šiukšliavežis',
    'platforma / važiuoklė',
    'betono maišyklė',
    'vilkikas',
    'autobusas',
    'bendro naudojimo transporto priemonė',
    'Autobuso važiuoklė',
    'kabina su varikliu',
    'furgonas / universalas',
    'tractor',
    'trarius'
];

export const WEIGHT_CATEGORIES: IProfileVehicleWeightCategories[] = [
    {
        code: 'to_3_5',
        title: 'iki 3.5 t.'
    },
    {
        code: 'from_3_5_to_5',
        title: '3.5-5 t.'
    },
    {
        code: 'up_5',
        title: 'virš 5 t.'
    },
    {
        code: 'from_3_5_to_6',
        title: '3.5-6 t.'
    },
    {
        code: 'from_6_to_10',
        title: '6-10 t.'
    },
    {
        code: 'from_10_to_16',
        title: '10-16 t.'
    },
    {
        code: 'up_16',
        title: 'virš 16 t.'
    }
];