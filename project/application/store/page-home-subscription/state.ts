import { EStatus } from '~/constants/status';

export interface IState {
    status: EStatus,
    error: Error | null
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null
    };
}