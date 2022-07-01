import { MutationTree } from 'vuex';
import { IBannerImage } from '~/types/banner-image.interface';
import { IState } from './state';

export default {
    UPDATE_MAIN_BANNERS(state, { images }: { images: IBannerImage[] }): void {
        state.mainBanner = images;
    }
} as MutationTree<IState>;
