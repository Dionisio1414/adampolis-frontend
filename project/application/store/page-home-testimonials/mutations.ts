import { MutationTree } from 'vuex';
import { ITestimonial } from '~/types/testimonial.interface';
import { IState } from './state';

export default {
    UPDATE_TESTIMONIALS(state, { items }: { items: ITestimonial[] }): void {
        state.testimonial = items;
    }
} as MutationTree<IState>;
