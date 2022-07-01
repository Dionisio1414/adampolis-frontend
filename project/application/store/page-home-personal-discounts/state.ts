import { EStatus } from '~/constants/status';
import { ICatalogProducts } from '~/types/catalog.interface';

export interface IState {
    discounts: ICatalogProducts[] | [];
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    discounts: [],
    status: EStatus.INIT,
    error: null
});
