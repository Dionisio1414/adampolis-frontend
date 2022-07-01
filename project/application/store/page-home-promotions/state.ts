import { EStatus } from '~/constants/status';
import { ICatalogProducts } from '~/types/catalog.interface';

export interface IState {
    promotions: ICatalogProducts[] | [];
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    promotions: [],
    status: EStatus.INIT,
    error: null
});
