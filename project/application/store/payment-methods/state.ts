import { EStatus } from '~/constants/status';
import { IPaymentMethods } from '~/types/payment-methods';

export interface IState {
    paymentMethods: IPaymentMethods[] | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    paymentMethods: null,
    status: EStatus.INIT,
    error: null
});
