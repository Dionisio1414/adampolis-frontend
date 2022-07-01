import { ICatalogForm } from '~/types/catalog.interface';

export interface IState {
    form: ICatalogForm | {};
};

export default (): IState => ({
    form: {
        page: 1,
        limit: 5,
        'article_manufacturers[]': [],
        vehicle: null,
        order_by: 'price',
        sort: null,
        has_stock: null,
        vin: null
    }
});
