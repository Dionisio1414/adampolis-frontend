import { MutationTree } from 'vuex';
import { IBannerImage } from '~/types/banner-image.interface';
import { IState } from './state';

export default {
    UPDATE_SECONDARY_BANNER(state, { images }: { images: IBannerImage[] }): void {
        state.secondaryBanner = images;
    }
} as MutationTree<IState>;

