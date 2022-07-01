import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IProfileContracts } from '~/types/profile-data.interface';
import { IState } from './state';

export default {
    FETCH_PROFILE_CONTRACTS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_PROFILE_CONTRACTS_SUCCESS(state, payload: IProfileContracts) {
        state.status = EStatus.SUCCESS;
        state.data = payload;
        state.error = null;
    },
    FETCH_PROFILE_CONTRACTS_ERROR(state, payload: Error) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.data = null;
    }
} as MutationTree<IState>;
