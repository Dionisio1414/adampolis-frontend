import { EStatus } from '~/constants/status';

export interface IState {
    error: Error | null,
    status: EStatus
}

export default (): IState => {
    return {
        error: null,
        status: EStatus.INIT
    }
}