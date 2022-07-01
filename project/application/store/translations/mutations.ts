import { MutationTree } from 'vuex';
import { IState } from './state';
import { EStatus } from '~/constants/status';
import { IMutationSetMessages } from '~/types/mutation-set-messages.interface';

export default {
    FETCH_TRANSLATIONS(state) {
        state.status = EStatus.PROCESSING;
        state.error = null;
    },
    FETCH_TRANSLATIONS_SUCCESS(state, { _locale, data }: IMutationSetMessages) {
        state.status = EStatus.SUCCESS;
        state.data[_locale] = data;
        state.error = null;
    },
    FETCH_TRANSLATIONS_ERROR(state, payload) {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
