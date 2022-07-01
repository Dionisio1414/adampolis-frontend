import { EStatus } from '~/constants/status';
import { IProductInner } from '~/types/product.interface';

export interface IState {
    data: IProductInner | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    data: null,
    status: EStatus.INIT,
    error: null
});
