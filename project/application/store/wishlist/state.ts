import { EStatus } from '~/constants/status';
import { IProductInner } from '~/types/product.interface';

export interface IState {
    products: IProductInner[] | [],
    statusWishListInit: EStatus;
    statusWishListAdd: EStatus;
    statusWishListRemove: EStatus;
    error: Error | null;
    wishListToken: string | null;
}

export default (): IState => ({
    products: [],
    statusWishListInit: EStatus.INIT,
    statusWishListAdd: EStatus.INIT,
    statusWishListRemove: EStatus.INIT,
    error: null,
    wishListToken: null,
});
