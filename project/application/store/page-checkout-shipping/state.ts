import { EStatus } from '~/constants/status';
import { ICustomer } from '~/types/profile-data.interface';

export interface IState {
    status: EStatus;
    error: Error | null;
    tokenValue: string | null;
    customer: ICustomer | null;
}

export default (): IState => ({
    status: EStatus.INIT,
    error: null,
    tokenValue: null,
    customer: null
});
