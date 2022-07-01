import { IBannerImage } from '~/types/banner-image.interface';

export interface IState {
    secondaryBanner: IBannerImage[]
}

export default (): IState => ({
    secondaryBanner: []
})
