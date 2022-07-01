import { EStatus } from '~/constants/status';
import { IProfileVehicleData } from '~/types/profile-data.interface';

export interface IState {
    vehicles: IProfileVehicleData | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    vehicles: null,
    status: EStatus.INIT,
    error: null
});
