import { EStatus } from '~/constants/status';
import { IOrders, IOrdersMeta, IOrdersFilter } from '~/types/orders.interface';

export interface IState {
    data: IOrders[] | [];
    order: IOrders | null;
    meta: IOrdersMeta | {};
    filter: IOrdersFilter | {};
    status: EStatus;
    status_order: EStatus;
    error: Error | null;
    error_order: Error | null;
}

export default (): IState => ({
    data: [],
    order: null,
    meta: {},
    filter: {},
    status: EStatus.INIT,
    status_order: EStatus.INIT,
    error: null,
    error_order: null
});
