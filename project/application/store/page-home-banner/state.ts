import { IBannerImage } from '~/types/banner-image.interface';

export interface IState {
    mainBanner: IBannerImage[]
}

export default (): IState => ({
    mainBanner: []
})
