import { EStatus } from '~/constants/status';
import { ICart } from '~/types/cart.interface';

export interface IState {
    data: ICart | null;
    status: EStatus;
    error: Error | null;
    message: string;
    token: string | null;
}

// 0cf98132-77e2-41f5-a165-623793ea8f22

export default (): IState => ({
    data: null,
    status: EStatus.INIT,
    error: null,
    message: '',
    token: null
});
