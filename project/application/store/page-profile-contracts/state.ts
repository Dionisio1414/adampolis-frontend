import { EStatus } from '~/constants/status';
import { IProfileContracts, IProfileData } from '~/types/profile-data.interface';

export interface IState {
    data: IProfileContracts | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    data: null,
    status: EStatus.INIT,
    error: null
});
