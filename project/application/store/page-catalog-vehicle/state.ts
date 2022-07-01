import { EStatus } from '~/constants/status';

export interface IState {
    status: EStatus;
}

export default (): IState => ({
    status: EStatus.INIT,
})
