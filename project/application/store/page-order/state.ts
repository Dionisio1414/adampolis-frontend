import { EStatus } from '~/constants/status';
import { IOrderPreview } from '~/types/order-preview.interface';

export interface IState {
    data: IOrderPreview[] | [];
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    data: [],
    status: EStatus.INIT,
    error: null
});
