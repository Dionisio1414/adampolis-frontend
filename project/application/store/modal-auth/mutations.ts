import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    UPDATE_REGISTER(state) {
        state.status_registration = EStatus.PROCESSING;
        state.error_registration = null;
    },
    UPDATE_REGISTER_SUCCESS(state) {
        state.status_registration = EStatus.SUCCESS;
        state.error_registration = null;
    },
    UPDATE_REGISTER_ERROR(state, payload) {
        state.status_registration = EStatus.ERROR;
        state.error_registration = payload;
    },
    UPDATE_COMPANY_INFO(state) {
        state.status_company_info = EStatus.PROCESSING;
        state.error_company_info = null;
    },
    UPDATE_COMPANY_INFO_SUCCESS(state, payload) {
        state.status_company_info = EStatus.SUCCESS;
        state.companyInfo = payload;
        state.error_company_info = null;
    },
    UPDATE_COMPANY_INFO_ERROR(state, payload) {
        state.status_company_info = EStatus.ERROR;
        state.error_company_info = payload;
    },
    UPDATE_REGISTRTION_STATUS(state, payload: EStatus) {
        state.status = payload;
    },
    UPDATE_VERIFY_ACCOUNT_FLAG(state, payload: boolean) {
        state.isVerify = payload;
    },
    UPDATE_LOGIN_TOKEN(state, { token }: any) {
        state.token = token;
    },
    UPDATE_ERROR(state, payload: any) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
} as MutationTree<IState>