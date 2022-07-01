import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IDictionary } from '~/types/dictionary.interface';
import { ICatalogAttributes } from '~/types/catalog.interface';
import { EProductAttributeTypes } from '~/constants/product-attribute-types';

export default {
    getError(state) {
        return state.error;
    },
    getStatus(state) {
        return state.status;
    },
    getData(state) {
        return state.data;
    },
    attributesMap(state) {
        const result: IDictionary<ICatalogAttributes> = {};

        if (state.data?.attributes) {
            state
                .data
                .attributes
                .forEach(attr => {
                    if (attr.type === EProductAttributeTypes.FLOAT) {
                        const minKey = `attributes[attribute_${attr.code}][min]`
                        const maxKey = `attributes[attribute_${attr.code}][max]`

                        result[minKey] = attr;
                        result[maxKey] = attr;
                    } else {
                        const key = `attributes[attribute_${attr.code}][]`
                        result[key] = attr;
                    }
                })
        }

        return result;
    }
} as GetterTree<IState, IRootState>;
