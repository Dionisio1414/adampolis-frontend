import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { EStatus } from '~/constants/status';
import { ICompanyInfro } from '~/types/company-info.interface';

export default {
    isStatus(state): EStatus {
        return state.status;
    },
    companyInfoStatus(state): EStatus {
        return state.status_company_info;
    },
    registrationStatus(state): EStatus {
        return state.status_registration;
    },
    isVerify(state): boolean {
        return state.isVerify;
    },
    getCompanyInformation(state: any): ICompanyInfro {
        return state.companyInfo;
    },
    isToken(state): boolean {
        return !!state.token;
    },
    getError(state) {
        return state.error;
    },
    companyInfoError(state) {
        return state.error_company_info;
    },
    registrationError(state) {
        return state.error_registration;
    },
} as GetterTree<IState, IRootState>;
