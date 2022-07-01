import { EProductAttributeTypes } from '~/constants/product-attribute-types';
import { ICatalogAttributes, ICatalogForm } from '~/types/catalog.interface';
import { IDictionary } from '~/types/dictionary.interface';

export default function catalogFormValueFilter(
    formValue: Partial<ICatalogForm>,
    attributesMap?: IDictionary<ICatalogAttributes>
): Partial<ICatalogForm> {
    if (!attributesMap) {
        return formValue;
    }

    const persistentFields: Set<string> = new Set(['page', 'limit', 'article_manufacturers[]', 'vehicle', 'order_by', 'sort', 'has_stock']);

    const result: Partial<ICatalogForm> = { ...formValue };

    Object
        .entries(formValue)
        .forEach(([field, value]) => {
            const attr = attributesMap[field];

            if (attr) {
                if (attr.type === EProductAttributeTypes.FLOAT) {
                    const isMax = field.lastIndexOf('max') != -1;

                    if (isMax) {
                        if (value === attr.range!.max) {
                            delete result[field];
                        }
                    } else {
                        if (value === attr.range!.min) {
                            delete result[field];
                        }
                    }
                } else {
                    if (!(value as number[]).length) {
                        delete result[field];
                    }
                }
            } else if (!persistentFields.has(field)) {
                delete result[field];
            }
    });

    return result;
}
