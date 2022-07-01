import { EStatus } from '~/constants/status';
import { INewsListItems, INewsListMeta } from '~/types/news.interface';

export interface IState {
    list: INewsListItems[] | [];
    meta: INewsListMeta | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => ({
    list: [],
    meta: null,
    status: EStatus.INIT,
    error: null
});
