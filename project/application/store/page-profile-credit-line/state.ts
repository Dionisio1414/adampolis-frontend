import { EStatus } from '~/constants/status';
import { IProfileCreditLine } from '~/types/profile-data.interface';

export interface IState {
    data: IProfileCreditLine | null;
    status: EStatus;
    error: Error | null;
    message: string | null;
}

export default (): IState => ({
    data: null,
    status: EStatus.INIT,
    error: null,
    message: null,
});
