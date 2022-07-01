import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { ICatalogProducts } from '~/types/catalog.interface';
import { IState } from './state';

export default {
    FETCH_HOME_PROMOTIONS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_HOME_PROMOTIONS_SUCCESS(state, { items }: { items: ICatalogProducts[] }) {
        state.status = EStatus.SUCCESS;
        state.promotions = items;
        state.error = null;
    },
    FETCH_HOME_PROMOTIONS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
        state.promotions = [];
    }
} as MutationTree<IState>;
