import { EStatus } from '~/constants/status';
import { ICatalog } from '~/types/catalog.interface';

export interface IState {
    data: ICatalog | null,
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    data: null,
    status: EStatus.INIT,
    error: null
});
