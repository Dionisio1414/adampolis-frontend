import { EStatus } from '~/constants/status';
import { IDictionary } from '~/types/dictionary.interface';

export interface IState {
    status: EStatus;
    error: Error | null;
    data: IDictionary<IDictionary<string>>;
}

export default (): IState => ({
    status: EStatus.INIT,
    error: null,
    data: {}
})
