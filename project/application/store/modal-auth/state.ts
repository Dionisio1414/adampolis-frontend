import { EStatus } from '~/constants/status';
import { ICompanyInfro } from '~/types/company-info.interface';

export interface IState {
    token: string | null,
    status: EStatus,
    status_company_info: EStatus,
    status_registration: EStatus,
    error: Error | null,
    error_company_info: Error | null,
    error_registration: Error | null,
    isVerify: boolean,
    companyInfo: ICompanyInfro | null;
}

export default (): IState => {
    return {
        token: null,
        status: EStatus.INIT,
        status_registration: EStatus.INIT,
        status_company_info: EStatus.INIT,
        error: null,
        error_company_info: null,
        error_registration: null,
        isVerify: false,
        companyInfo: null
    }
}
