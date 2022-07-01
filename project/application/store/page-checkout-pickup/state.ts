import { EStatus } from '~/constants/status';
import { IPickupData } from '~/types/checkout.interface';

export interface IState {
    status: EStatus;
    statusPickup: EStatus;
    error: Error | null;
    tokenValue: string | null;
    pickupData: IPickupData | null;
}

export default (): IState => ({
    status: EStatus.INIT,
    statusPickup: EStatus.INIT,
    error: null,
    tokenValue: null,
    pickupData: null
});
