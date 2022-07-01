import { EStatus } from '~/constants/status';
import { IPage } from '~/types/page.interface';

export interface IState {
    page: IPage | {} | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    page: {},
    status: EStatus.INIT,
    error: null
});
