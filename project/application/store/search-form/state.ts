import { ISearchForm } from '~/types/search.interface';

export interface IState {
    form: ISearchForm | {};
};

export default (): IState => ({
    form: {
        q: null,
        type: null,
        page: 1,
        limit: 5,
        order_by: null,
        sort: null
    }
});
