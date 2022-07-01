import { EStatus } from '~/constants/status';

export interface IState {
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    status: EStatus.INIT,
    error: null
});
