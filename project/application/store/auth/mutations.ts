import { EStatus } from '~/constants/status';
import { MutationTree } from 'vuex';
import { IState } from './state';

export interface IFlagPayload {
    flag: boolean;
}

export default {
    SET_TOKEN(state) {
        state.status = EStatus.SUCCESS;
    },
    SET_AUTH_FLAG(state, payload: IFlagPayload)  {
        state.isAuthorized = payload.flag;
    }

} as MutationTree<IState>;
