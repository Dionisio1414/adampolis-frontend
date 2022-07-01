import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    getTestimonials(state) {
        return state.testimonial;
    }
} as GetterTree<IState, IRootState>
