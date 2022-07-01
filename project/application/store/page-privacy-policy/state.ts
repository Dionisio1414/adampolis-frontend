import { EStatus } from '~/constants/status';
import { IPage } from '~/types/page.interface';

export interface IState {
    status: EStatus;
    data: IPage | null;
}

export default (): IState => ({
    status: EStatus.INIT,
    data: null
});
