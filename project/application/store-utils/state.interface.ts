import { IState as IStateAuth } from '~/store/auth/state';
import { IState as IStateCountriesList } from '~/store/countries-list/state';
import { IState as IStateHeaderShopInfo } from '~/store/header-shop-info/state';
import { IState as IStateModalAuth } from '~/store/modal-auth/state';
import { IState as IStatePageHomeBanner } from '~/store/page-home-banner/state';
import { IState as IStatePageHomeMenu } from '~/store/page-home-menu/state';
import { IState as IStatePageHomeSecondaryBanner } from '~/store/page-home-secondary-banner/state';
import { IState as IStatePageHomeTestimonials } from '~/store/page-home-testimonials/state';
import { IState as IStatePageHomeVehicle } from '~/store/page-home-vehicle/state';
import { IState as IStateResetPassword } from '~/store/reset-pasword/state';
import { IState as IStatePageHomeSubscription } from '~/store/page-home-subscription/state';
import { IState as IStatePageProfileOrders } from '~/store/page-profile-orders/state';
import { IState as IStatePageOrder } from '~/store/page-order/state';
import { IState as IStatePageStatic } from '~/store/page-static/state';
import { IState as IStatePageCatalog } from '~/store/page-catalog/state';
import { IState as IStatePageCatalogForm } from '~/store/page-catalog-form/state';
import { IState as IStatePageProduct } from '~/store/page-product/state';
import { IState as IStatePageNews } from '~/store/page-news/state';
import { IState as IStateWishlist } from '~/store/wishlist/state';
import { IState as IStateCustomer } from '~/store/customer/state';
import { IState as IStatePageCheckoutPickup } from '~/store/page-checkout-pickup/state';
import { IState as IStatePageCheckoutShipping } from '~/store/page-checkout-shipping/state';
import { IState as IStatePaymentMethods } from '~/store/payment-methods/state';

export interface IRootState {
    'auth': IStateAuth;
    'countries-list': IStateCountriesList;
    'header-shop-info': IStateHeaderShopInfo;
    'modal-auth': IStateModalAuth;
    'page-home-banner': IStatePageHomeBanner;
    'page-home-menu': IStatePageHomeMenu;
    'page-home-secondary-banner': IStatePageHomeSecondaryBanner;
    'page-home-testimonials': IStatePageHomeTestimonials;
    'page-home-vehicle': IStatePageHomeVehicle;
    'reset-password':  IStateResetPassword,
    'page-home-subscription': IStatePageHomeSubscription,
    'page-profile-orders': IStatePageProfileOrders
    'page-order': IStatePageOrder,
    'page-static': IStatePageStatic,
    'page-catalog': IStatePageCatalog,
    'page-catalog-form': IStatePageCatalogForm,
    'page-product': IStatePageProduct
    'page-news': IStatePageNews,
    'wishlist': IStateWishlist,
    'customer': IStateCustomer,
    'page-checkout-pickup': IStatePageCheckoutPickup,
    'page-checkout-shipping': IStatePageCheckoutShipping
    'payment-methods': IStatePaymentMethods
}
