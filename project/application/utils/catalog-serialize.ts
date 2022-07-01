import { ICatalogForm } from "~/types/catalog.interface";

export const manufacturersSerialize = (list: Array<number>) => {
    return list.map(value => `article_manufacturers[]=${value}`).join('&') || '';
}

export const formSerializer = (formValue: Partial<ICatalogForm>, fields: string[] = []) => {
    const { page, limit, ...obj } = formValue;
    const result: string[] = [];

    if(limit) result.unshift(`limit=${limit}`);
    if(page) result.unshift(`page=${page}`);

    Object.entries({ ...obj }).forEach(([key, values]): void => {

        if (values && typeof values === 'object' && (values as any).length) {
            (values as any || []).forEach((element: number | string) => {
                result.push(`${key}=${element}`)
            });
        } else if (typeof values === 'number' || typeof values === 'string') {
            result.push(`${key}=${values}`)
        }
    })

    return result.join('&');
}

