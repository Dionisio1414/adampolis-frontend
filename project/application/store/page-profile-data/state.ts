import { EStatus } from '~/constants/status';
import { IProfileData } from '~/types/profile-data.interface';

export interface IState {
    data: IProfileData | {};
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    data: {},
    status: EStatus.INIT,
    error: null
});
