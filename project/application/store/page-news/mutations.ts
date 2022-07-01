import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { INewsListItems, INewsListMeta } from '~/types/news.interface';
import { IState } from './state';

export default {
    FETCH_NEWS_LIST(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_NEWS_LIST_SUCCESS(state, { data: { items, meta }, paginate }: { data: { items: INewsListItems[], meta: INewsListMeta }, paginate: boolean }) {
        state.status = EStatus.SUCCESS;
        state.error = null;
        if(!paginate) {
            state.list = items;
            state.meta = meta;
        } else {
            state.list = [ ...state.list, ...items ];
            state.meta = meta;
        }
    },
    FETCH_NEWS_LIST_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;