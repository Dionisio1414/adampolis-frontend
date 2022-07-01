import { EStatus } from '~/constants/status';
import { IPaymentPayBy } from '~/types/payment-methods';

export interface IState {
    data: IPaymentPayBy | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    data: null,
    status: EStatus.INIT,
    error: null
});