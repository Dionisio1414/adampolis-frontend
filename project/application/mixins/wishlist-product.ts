import Vue from 'vue';
import { Component, Action, Getter, Prop } from 'nuxt-property-decorator';
import { IWishListPayload } from '~/types/wishlist.interface';
import { IDictionary } from '~/types/dictionary.interface';
import { IProductInner } from '~/types/product.interface';
import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';

@Component({})
export default class MixinWishlistProduct extends Vue {
    @Prop() public product!: IProductInner;

    @Getter('wishlist/idsSet') idsSet!: IDictionary<boolean>;
    @Getter('wishlist/getWishListAddStatus') addToWishListStatus!: EStatus;
    @Getter('wishlist/getWishListRemoveStatus') removeToWishListStatus!: EStatus;

    @Getter('auth/isAuthorized') isAuthorized!: boolean;

    @Action('wishlist/addWishListItem') public addWishListItem!: (payload: IWishListPayload) => Promise<void>;
    @Action('wishlist/removeWishListItem') public removeWishListItem!: (payload: IWishListPayload) => Promise<void>;

    public get inWishList(): boolean {
        return !!this.idsSet[this.product.id];
    }

    public get disabledFavoriteButton(): boolean {
        return this.addToWishListStatus === EStatus.PROCESSING || this.removeToWishListStatus === EStatus.PROCESSING;
    }

    public async toggleFavorite(favorite: boolean): Promise<any> {
        const payload: IWishListPayload = { favorite, productId: this.product.id };
        if(favorite) {
            await this.removeWishListItem({ ...payload });
            this.$notify({
                type: EMessageTypes.INFO,
                title: `${this.$t('WishList.removedFromWishlist')}`
            });
        } else {
            await this.addWishListItem({ ...payload });
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: `${this.$t('WishList.addedToWishlist')}`
            });
        }
    }
    
}
