<template>
    <main class="page checkout">
        <div v-if="!isSuccess" class="container">
            <div class="row">
                <div class="col">
                    <StepsBar 
                        :steps="steps" 
                        :currentStep="currentStep"
                    >
                    </StepsBar>
                </div>
            </div>
            <div class="checkout__block row">
                <div v-if="isMobile" class="checkout__order col-12">
                    <CheckoutOrderInfoMobile>
                    </CheckoutOrderInfoMobile>
                </div>
                <div class="col-12 col-lg-9">
                    <CheckoutWrapper 
                        :currentStep="currentStep"
                    >
                    </CheckoutWrapper>
                </div>
                <div v-if="!isMobile" class="col-12 col-lg-3">
                    <CheckoutOrderInfo>
                    </CheckoutOrderInfo>
                </div>
            </div>
        </div>
        <div class="container" v-else>
            <div class="row">
                <div class="col">
                    <CheckoutSuccess></CheckoutSuccess>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { Component, Provide, mixins, Getter, ProvideReactive, Watch, Action } from 'nuxt-property-decorator';
import { StepsBar } from '~/components';
import { CheckoutWrapper, CheckoutSuccess, CheckoutOrderInfo, CheckoutOrderInfoMobile } from '~/components/checkout';
import MixinWindowSize from '~/mixins/window-size';
import { ICart } from '~/types/cart.interface';
import { EStatus } from '~/constants/status';
import { ICustomer } from '~/types/profile-data.interface';
import { IPickupData } from '~/types/checkout.interface';
import { IPaymentMethods, IPaymentPayBy } from '~/types/payment-methods';
import { IOrders } from '~/types/orders.interface';

@Component({
    layout: 'checkout',
    components: {
        StepsBar,
        CheckoutWrapper,
        CheckoutSuccess,
        CheckoutOrderInfo,
        CheckoutOrderInfoMobile
    }
})
export default class PageCheckout extends mixins(MixinWindowSize) {
    @Getter('customer/getCustomer') public customer!: ICustomer;
    @Getter('customer/getError') public customerError!: any;

    @Getter('page-checkout-pickup/getPickupData') public getPickupData!: IPickupData;
    @Getter('page-checkout-pickup/getStatusPickup') public pickupStatus!: EStatus;
    @Getter('page-checkout-shipping/getStatus') public shippingStatus!: EStatus;
    
    @Getter('payment-methods/getPaymentMethods') public paymentMethods!: IPaymentMethods[] | null;

    @Getter('payment-pay-by/getError') public paymentError!: any;
    @Getter('payment-pay-by/getStatus') public paymentStatus!: EStatus;
    @Getter('payment-pay-by/getPaymentData') public paymentData!: IPaymentPayBy | null;

    @Getter('cart/getToken') public cartToken!: string | null;

    @Getter('auth/isAuthorized') public isAuthorized!: boolean;

    @Getter('cart/getCartData') public cartData!: ICart;
    @Getter('cart/getStatus') public status!: EStatus;

    @Getter('page-profile-orders/getStatusOrder') public orderStatus!: EStatus;
    @Getter('page-profile-orders/getErrorOrder') public orderError!: any;
    @Getter('page-profile-orders/getOrderData') public orderItem!: IOrders | null;

    @Action('page-profile-orders/fetchOrderByNumber') public fetchOrderByNumber!: (payload: IPaymentPayBy) => Promise<void>;

    public steps: Array<string> = [
        this.$t('CheckoutPage.stepTabs.delivery').toString(), 
        this.$t('CheckoutPage.stepTabs.payment').toString(),  
        this.$t('CheckoutPage.stepTabs.orderPlaced').toString()
    ];
    public currentStep: number = 0;

    @Provide('CHECKOUT_NEXT_STEP')
    public handleNextStep(): void {
        if (this.currentStep === this.steps.length - 1) return;
        this.currentStep++;
        window.scrollTo(0, 0);
    }

    @Provide('CHECKOUT_PREV_STEP')
    public handlePrevStep(): void {
        if (!this.currentStep) return;
        this.currentStep--;
        window.scrollTo(0, 0);
    }

    @ProvideReactive('CUSTOMER_ERROR')
    public get provideCustomerError(): any {
        return this.customerError;
    }

    @ProvideReactive('CART_TOKEN')
    public get provideCartToken(): string | null {
        return this.cartToken;
    }

    @ProvideReactive('IS_AUTHORIZED')
    public get provideAuthStatus(): boolean {
        return this.isAuthorized;
    }

    @ProvideReactive('CUSTOMER_DATA')
    public get provideCustomerData(): ICustomer {
        return this.customer;
    }

    @ProvideReactive('PICKUP_DATA')
    public get providePickupData(): IPickupData {
        return this.getPickupData;
    }

    @ProvideReactive('PICKUP_STATUS')
    public get providePickupStatus(): EStatus {
        return this.pickupStatus;
    }

    @ProvideReactive('SHIPPING_STATUS')
    public get provideShippingStatus(): EStatus {
        return this.shippingStatus;
    }

    @ProvideReactive('PAYMENT_STATUS')
    public get providePaymentStatus(): EStatus {
        return this.paymentStatus;
    }

    @ProvideReactive('PAYMENT_ERROR')
    public get providePaymentError(): any {
        return this.paymentError;
    }

    @ProvideReactive('CART_DATA')
    public get provideCartData(): ICart {
        return this.cartData;
    }

    @ProvideReactive('PAYMENT_METHODS')
    public get providePaymentMethods(): IPaymentMethods[] | null {
        return this.paymentMethods;
    }

    @ProvideReactive('PAYMENT_DATA')
    public get providePaymentData(): IPaymentPayBy | null {
        return this.paymentData;
    }

    @ProvideReactive('ORDER_STATUS')
    public get provideOrderStatus(): EStatus {
        return this.orderStatus;
    }

    @ProvideReactive('ORDER_ERROR')
    public get provideOrderError(): any {
        return this.orderError;
    }

    @ProvideReactive('ORDER_ITEM')
    public get provideOrderItem(): IOrders | null {
        return this.orderItem;
    }

    public get isSuccess(): boolean {
        return this.currentStep === 2;
    }

    public nextStep(): void {
        this.currentStep++;
    }

    @Watch('$route.query.orderNumber')
    public async routeQueryCheckout(order_nr: string): Promise<any> {
        await this.fetchOrderByNumber({ order_nr });
        this.nextStep();
    } 

    async asyncData({ store, error, query }: any): Promise<any> {
        try {
            if(query.orderNumber) {
                await store.dispatch('page-profile-orders/fetchOrderByNumber', { order_nr: query.orderNumber });
                return {
                    currentStep: 2
                }
            } 

            await Promise.all([
                store.dispatch('cart/fetchCartData'),
                store.dispatch('countries-list/fetchCoutriesList')
            ]);
            const cartToken: string = store.getters['cart/getToken'];
            
            await Promise.all([
                store.dispatch('customer/fetchCustomer', { cartToken }),
                store.dispatch('page-checkout-pickup/fetchPickupData', { cartToken }),
                store.dispatch('payment-methods/fetchPaymentMethods', { cartToken }),
            ]);

            return {
                currentStep: 0
            }

        } catch (e: any) {
            if(e?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(e);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout {
    padding-top: 10px;
    padding-bottom: 80px;
    &__header {
        margin: 20px 0;
    }

    &__block {
        margin-top: 20px;
    }

    &__order {
        margin-bottom: 20px;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout {
        padding-top: 30px;
    }
}
</style>
