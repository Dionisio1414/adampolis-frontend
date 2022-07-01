<template>
    <main class="page page-home">
        <div class="container">
            <MainSliderFilter
                @updateModifications="updateModifications"
                @updateTaxons="updateTaxons"
                @vinHandler="vinHandler"
            >
            </MainSliderFilter>
            <MainServices class="space d-none d-lg-block"></MainServices>
            <MainSuppliers class="space"></MainSuppliers>
            <MainBanners class="space"></MainBanners>
            <MainOrders 
                v-if="isAuthorized" 
                :orders="orders"
                :status="ordersStatus"
                class="space"
            >
            </MainOrders>
            <MainPromotions 
                v-if="isAuthorized && promotions && promotions.length" 
                class="space" 
                :title="$t('MainPromotions.title')"
                :linkLabel="$t('MainPromotions.showMore')"
                :params="promotions"
            >
            </MainPromotions>
            <MainPromotions 
                v-if="isAuthorized && discounts && discounts.length"
                :title="$t('MainDiscounts.title')" 
                :linkLabel="$t('MainDiscounts.showMore')"
                class="space" 
                :params="discounts" 
            >
            </MainPromotions>
            <MainCategories class="space--x2" />
            <MainFeedback 
                v-if="showTestimonials"
                :testimonialsList="testimonialsList" 
                class="space--x2" 
            >
            </MainFeedback>
        </div>
        <MainSubscription>
        </MainSubscription>
        <transition name="fade">
            <div v-if="getCatalogStatus" class="page-home__overlay">
                <div class="page-home__overlay-wrapper">
                    <Spinner class="page-home__overlay-loader"></Spinner>
                </div>
            </div>
        </transition>
    </main>
</template>

<script lang="ts">
import { Vue, Component, Getter, Action, ProvideReactive, Provide } from 'nuxt-property-decorator';
import { IVerifyAcccount } from '~/types/verify-account.interface';
import MainSliderFilter from '~/components/main/MainSliderFilter.vue';
import MainServices from '~/components/main/MainServices.vue';
import MainSuppliers from '~/components/main/MainSuppliers.vue';
import MainBanners from '~/components/main/MainBanners.vue';
import MainOrders from '~/components/main/MainOrders.vue';
import MainPromotions from '~/components/main/MainPromotions.vue';
import MainCategories from '~/components/main/MainCategories.vue';
import MainFeedback from '~/components/main/MainFeedback.vue';
import MainSubscription from '~/components/main/MainSubscription.vue';
import HeaderLoginPopup from '~/components/header/HeaderLoginPopup.vue';
import HeaderResetPasswordPopup from '~/components/header/HeaderResetPasswordPopup.vue';
import { IVehicleAutocompleteData, IVehicleByVin, IVehicleModels, IVehicleTaxons, IVehileModifications } from '~/types/vehicle.interface';
import { EStatus } from '~/constants/status';
import { ITestimonial } from '~/types/testimonial.interface';
import { ICatalogProducts } from '~/types/catalog.interface';
import { ICartProductData } from '~/types/cart.interface';
import { EMessageTypes } from '~/constants/message-types';
import { IOrders } from '~/types/orders.interface';
import Spinner from '~/components/Spinner.vue';
import { ISubscribeEmail } from '~/types/subscribe-email.interface';

@Component({
    components: {
        MainSliderFilter,
        MainServices,
        MainSuppliers,
        MainBanners,
        MainOrders,
        MainPromotions,
        MainCategories,
        MainFeedback,
        MainSubscription,
        HeaderLoginPopup,
        HeaderResetPasswordPopup,
        Spinner
    }
})
export default class PageIndex extends Vue {
    @Getter('auth/isAuthorized') public isAuthorized!: boolean;
    @Getter('modal-auth/getError') public error!: Error | null;
    @Getter('page-home-vehicle/getStatus') public vehicleStatus!: EStatus;
    @Getter('page-catalog/getStatus') public catalogStatus!: EStatus;

    @Getter('vehicle/getVehicleModel') public models!: IVehicleModels[];
    @Getter('vehicle/getVehicleModifications') public modifications!: IVehileModifications[];
    @Getter('vehicle/getVehicleTaxons') public taxons!: IVehicleTaxons[];
    @Getter('vehicle/getVehicleVin') public vin!: IVehicleByVin[];
    @Getter('vehicle/getError') public vehicleError!: Error;

    @Getter('page-home-testimonials/getTestimonials') public testimonialsList!: ITestimonial[];

    @Getter('page-home-promotions/getPromotions') public promotions!: ICatalogProducts[];
    @Getter('page-home-personal-discounts/getDiscounts') public discounts!: ICatalogProducts[];

    @Getter('cart/getStatus') public cartStatus!: EStatus;
    @Getter('cart/getToken') public cartToken!: string | null;
    @Getter('cart/getError') public cartError!: Error | null;

    @Getter('page-profile-orders/getOrdersData') public orders!: IOrders[] | [];
    @Getter('page-profile-orders/getStatus') public ordersStatus!: EStatus;

    @Getter('page-home-subscription/getStatus') public subscriptionStatus!: EStatus;
    @Getter('page-home-subscription/getError') public subscriptionError!: any;

    @Action('cart/addCartItem') public addCartItem!: (payload: ICartProductData) => Promise<void>;

    @Action('page-home-vehicle/fetchVehicleModifications') public fetchModifications!: (modelId: number | string) => Promise<void>;
    @Action('page-home-vehicle/fetchVehicleTaxons') public fetchTaxons!: (vehicle: number | string) => Promise<void>;
    @Action('page-home-vehicle/fetchVehicleByVin') public fetchVehicleByVin!: (vin: string) => Promise<void>;

    @Action('modal-auth/onVerifyAccount') public onVerify!: (token: string) => void;

    @Action('page-home-subscription/submitSubscription') public onSubmitSubscription!: (payload: ISubscribeEmail) => Promise<void>;

    public onPasswordResethandler: any;
    public $modal: any;
    public $route: any;

    public updateModifications(id: number): void {
        this.fetchModifications(id);
    }

    public updateTaxons(id: number): void {
        this.fetchTaxons(id);
    }

    public vinHandler(vin: string): void {
        this.fetchVehicleByVin(vin);
    }

    @ProvideReactive('VEHICLE_STATUS')
    public get getVehicleStatus(): boolean {
        return this.vehicleStatus === EStatus.PROCESSING;
    }

    @ProvideReactive('VEHICLE_ERROR')
    public get getVehicleError(): Error {
        return this.vehicleError;
    }

    @ProvideReactive('CATALOG_STATUS')
    public get getCatalogStatus(): boolean {
        return this.catalogStatus === EStatus.PROCESSING;
    }

    @ProvideReactive('VEHICLE_MODELS')
    public get vehicleModels(): IVehicleModels[] {
        return this.models ?? [];
    }

    @ProvideReactive('VEHICLE_MODIFICATIONS')
    public get vehicleModifications(): IVehileModifications[] {
        return this.modifications ?? [];
    }

    @ProvideReactive('VEHICLE_TAXONS')
    public get vehicleTaxons(): IVehicleTaxons[] {
        return this.taxons ?? [];
    }

    @ProvideReactive('VEHICLE_VIN')
    public get vehicleVin(): IVehicleAutocompleteData[] {
        return [ { data: this.vin ?? [] } ];
    }

    public get showTestimonials(): boolean {
        return !!this.testimonialsList.length;
    }

    @ProvideReactive('CART_STATUS')
    public get getCartStatus(): EStatus {
        return this.cartStatus;
    }

    @ProvideReactive('CART_TOKEN')
    public get getCartToken(): string | null {
        return this.cartToken;
    }

    @ProvideReactive('SUBSCRIPTION_STATUS')
    public get provideSubscriptionStatus(): EStatus {
        return this.subscriptionStatus;
    }

    @ProvideReactive('SUBSCRIPTION_ERROR')
    public get provideSubscriptionError(): any {
        return this.subscriptionError;
    }

    @Provide('ADD_CART_ITEM_SUBMIT')
    public async addCartItemSubmit({ productCode, quantity }: ICartProductData): Promise<any> {
        await this.addCartItem({ productCode, quantity });
        if(this.getCartStatus === EStatus.ERROR && this.cartError) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: (this.cartError as any)?.errors.quantity[0]
            });
        } 
    }

    @Provide('SUBMIT_SUBSCRIPTION')
    public async submitSubscriptionHandler(email: ISubscribeEmail): Promise<void> {
        await this.onSubmitSubscription({ ...email });
    }

    async asyncData({ store, error, query, app }: any): Promise<void> {
        try {
            const isAuthorized: boolean = store.getters['auth/isAuthorized'];
            const authPromises = isAuthorized ? [
                store.dispatch('page-home-promotions/fetchHomePromotions'),
                store.dispatch('page-home-personal-discounts/fetchHomePersonalDiscounts'),
                store.dispatch('page-profile-orders/fetchOrders', {
                    page: 1,
                    query: { 
                        limit: 5 
                    }
                })
            ] : [];

            await Promise.all([
                store.dispatch('page-home-vehicle/fetchVehicleModels'),
                store.dispatch('page-home-vehicle/fetchVehicleTaxons', ''),
                store.dispatch('page-home-secondary-banner/fetchSecondaryBanners'),
                store.dispatch('page-home-testimonials/fetchTestimonials'),
                store.dispatch('page-home-banner/fetchMainBanners'),
                ...authPromises
            ]);
        } catch (e: any) {
            if(e?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(e);
        }
    }

    public checkVerify(): void {
        const { action, token }: IVerifyAcccount = this.$route.query;

        switch (action) {
            case 'verification':
                this.onVerify(token);
                this.$modal.show(
                    HeaderLoginPopup,
                    {
                        modal: this.$modal,
                        queryLoader: true
                    },
                    {
                        resizable: false,
                        adaptive: true,
                        draggable: false,
                        scrollable: true,
                        height: 'auto',
                        minWidth: 0,
                        maxWidth: 388,
                        shiftY: 0.5,
                        transition: 'modal',
                        overlayTransition: 'fade',
                        clickToClose: true
                    }
                );
                break;
            case 'reset-password':
                this.$modal.show(
                    HeaderResetPasswordPopup,
                    {
                        modal: this.$modal,
                        token: token
                    },
                    {
                        resizable: false,
                        adaptive: true,
                        draggable: false,
                        scrollable: true,
                        height: 'auto',
                        minWidth: 0,
                        maxWidth: 590,
                        shiftY: 0.5,
                        transition: 'modal',
                        overlayTransition: 'fade',
                        clickToClose: true
                    }
                );
                break;
            default:
                return;
        }
    }

    public mounted(): void {
        this.checkVerify();
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.page-home {
    position: relative;
    &__overlay {
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        &-wrapper {
            position: sticky;
            top: 0;
            width: 100%;
            height: 100vh;
        }
    }
}

.space {
    margin-bottom: 40px;
    &--x2 {
        margin-bottom: 80px;
        @media (max-width: #{$breakpoint-lg - 1px}) {
            margin-bottom: 40px;
        }
    }
}
</style>
