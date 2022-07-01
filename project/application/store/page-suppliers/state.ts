import { EStatus } from '~/constants/status';

export interface IState {
    data: any;
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    data: {},
    status: EStatus.INIT,
    error: null
});
