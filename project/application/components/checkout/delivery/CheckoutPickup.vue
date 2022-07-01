<template>
    <div class="checkout-pickup">
        <div class="checkout-pickup__wrapper">
            <div class="checkout-pickup__head">
                <div class="checkout-pickup__subheader text text--s text--bold">
                    {{ $t('CheckoutPage.pickup.chooseStore') }}
                </div>
            </div>
            <div 
                class="checkout-pickup__grid" 
                v-for="(city, i) in formatedPickupData" 
                :key="i"
            >
                <div class="text text--600">{{ i }}</div>
                <div>
                    <div 
                        class="checkout-pickup__shop" 
                        v-for="item in city" 
                        :key="item.id"
                    >
                        <div class="form-radio">
                            <input
                                :id="`address-radio-${item.city}-${item.id}`"
                                class="form-radio__field"
                                type="radio"
                                :name="`address-radio-${item.city}-${item.id}`"
                                :checked="selectedAddressId === item.id"
                                @change="selectAddress(item.id)"
                            />
                            <label :for="`address-radio-${item.city}-${item.id}`" class="form-radio__label">
                                {{ item.address }}
                            </label>
                        </div>
                        <!-- <div class="checkout-pickup__description">I-V 9-18val. VI 9-15val.</div> -->
                    </div>
                </div>
            </div>
            <div class="checkout-pickup__error">
                {{ $t('CheckoutPage.pickup.warningMessage') }}
            </div>
        </div>

        <div class="checkout-pickup__wrapper">
            <div class="checkout-pickup__head">
                <div class="checkout-pickup__subheader text text--s text--bold">
                    {{ $t('CheckoutPage.pickup.customerData') }}
                </div>
                <button 
                    v-if="isTheCompany"
                    class="btn btn--label-grey" 
                    @click="openContactModal"
                >
                    {{ $t('CheckoutPage.common.change') }}
                </button>
            </div>
            <div v-if="isTheCompany" class="checkout-pickup__grid">
                <div class="text text--xs text--600">{{ $t('CheckoutPage.pickup.companyDetails') }}</div>
                <div 
                    class="checkout-pickup__info text text--xs"
                    v-if="customer && customer.companyAddress"
                >
                    {{ customer.companyName }} <br />
                    {{ customer.companyAddress.street }}, {{ customer.companyAddress.city }}
                </div>
            </div>

            <div 
                class="checkout-pickup__grid"
                :class="{'checkout-pickup__grid--last': isTheCompany}"
                v-if="informationList && informationList.length && isTheCompany"
            >
                <div class="text text--xs text--600">{{ $t('CheckoutPage.pickup.contactPerson') }}</div>
                <div>
                    <div 
                        class="checkout-pickup__radio" 
                        v-for="customer in informationList" 
                        :key="customer.id"
                    >
                        <div class="form-radio">
                            <input
                                :id="`radio-address-${customer.id}`"
                                class="form-radio__field"
                                type="radio"
                                :name="`radio-address-${customer.id}`"
                                :checked="selectedCustomerId === customer.id"
                                @change="selectCustomer(customer.id)"
                            />
                            <label :for="`radio-address-${customer.id}`" class="form-radio__label">
                                {{ customer.fullName }}
                            </label>
                        </div>
                        <div>
                            <span>{{ customer.phoneNumber }}</span
                            ><br />
                            <a :href="`mailto:${customer.email}`">
                                {{ customer.email }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div 
                class="checkout-pickup__grid"
                :class="{'checkout-pickup__grid--last': isTheCompany}"
                v-if="informationList && informationList.length && !isTheCompany"
            >
                <div class="text text--xs text--600">{{ $t('CheckoutPage.pickup.contactPerson') }}</div>
                <div>
                    <div 
                        class="checkout-pickup__radio" 
                        v-for="address in informationList" 
                        :key="address.id"
                    >
                        <div class="form-radio">
                            <input
                                :id="`radio-address-${address.id}`"
                                class="form-radio__field"
                                type="radio"
                                :name="`radio-address-${address.id}`"
                                :checked="selectedCustomerId === address.id"
                                @change="selectCustomer(address.id)"
                            />
                            <label :for="`radio-address-${address.id}`" class="form-radio__label">
                                {{ address.firstName }} {{ address.lastName }}
                            </label>
                        </div>
                        <div>
                            <span>{{ address.phoneNumber }}</span><br />
                            <div class="email-field">
                                {{ address.email }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!informationList || !informationList.length">
                <p class="checkout-pickup__subheader text text--s text--bold">{{ $t('modals.registration.contacts.title') }}</p>
                <PickupIndividualForm 
                    ref="pickupNotAuthorizedForm" 
                    :formData="null"
                >
                </PickupIndividualForm>
            </div>
        </div>
        <div class="d-flex">
            <button 
                class="checkout-pickup__button btn btn--pink" 
                @click="continueCheckout"
            >
                {{ $t('CheckoutPage.common.continue') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Inject, InjectReactive, Action } from 'nuxt-property-decorator';
import { PickupIndividualForm } from '~/components/customer';
import ModalCustomer from '~/components/checkout/modals/ModalCustomer.vue';

import { ICustomerRequestBody, IPickupData, IPickupItem, IPickupRequest } from '~/types/checkout.interface';
import { IDictionary } from '~/types/dictionary.interface';
import { ICustomer } from '~/types/profile-data.interface';
import { MODAL_CONFIG } from '@/constants/modalConfig';

import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';

@Component({
    components: {
        PickupIndividualForm,
        ModalCustomer
    }
})
export default class ComponentCheckoutPickup extends Vue {
    @Inject('CHECKOUT_NEXT_STEP') public nextStep!: () => void;

    @InjectReactive('CUSTOMER_ERROR') public customerError!: any;
    @InjectReactive('CART_TOKEN') public cartToken!: string | null;
    @InjectReactive('IS_AUTHORIZED') public isAuthorized!: boolean;
    @InjectReactive('CUSTOMER_DATA') public customer!: ICustomer;
    @InjectReactive('PICKUP_DATA') public getPickupData!: IPickupData;
    @InjectReactive('PICKUP_STATUS') public status!: EStatus;

    @Action('page-checkout-pickup/setPickupData') public setPickupData!: (payload: ICustomerRequestBody) => Promise<void>;
    @Action('customer/addCustomer') public addCustomer!: (payload: any) => Promise<void>;

    public selectedAddressId: number | null = null;
    public selectedCustomerId: number | null = null;
    public currentChildCustomer: ICustomer | null = null;
    public $modal: any;

    public get customers(): IDictionary<ICustomer> | undefined {
        return this.customer?.customers;
    }

    public get pickupData(): IDictionary<IPickupItem> {
        return this.getPickupData?.items;
    }

    public get informationList(): any[] | IDictionary<ICustomer> | undefined {
        if(this.customer && this.customer.isCompany) {
            const { customers, addresses, ...rest } = this.customer;
            return [ rest, ...(this.customer.customers as any) ];
        } 
        
        if(this.customer && !this.customer.isCompany) {
            return this.customer?.addresses;
        }

        return undefined;
    }

    public get isTheCompany(): boolean {
        return !!(this.customer && this.customer.isCompany);
    }

    public get formatedPickupData(): IDictionary<IPickupItem[]> | [] {
        if(this.pickupData) {
            // @ts-ignore
            let cities = this.pickupData.map((elem: IPickupItem) => elem.city);
            cities = cities.filter((elem: string, i: number) => cities.indexOf(elem) === i);
            return cities.map((elem: string) => {
                return {
                    // @ts-ignore
                    [elem]: [...this.pickupData.filter((item: IPickupItem) => item.city === elem)]
                };
            })[0];
        } else {
            return [];
        }
    }

    private async authorizedSubmit(): Promise<void | boolean> {
        if(!this.selectedAddressId) {
            this.$notify({
                type: EMessageTypes.INFO,
                title: this.$t('CheckoutPage.pickup.selectStoreMessage').toString()
            });

            return false;
        }

        if(!this.selectedCustomerId) {
            this.$notify({
                type: EMessageTypes.INFO,
                title: this.$t('CheckoutPage.pickup.selectContactPersonMessage').toString()
            });

            return false;
        }

        if(this.currentChildCustomer && this.currentChildCustomer.isCompany) {
            const requestPayload: ICustomerRequestBody = {
                payload: {
                    customer: this.currentChildCustomer.id,
                    isCompany: this.currentChildCustomer.isCompany || true,
                    firstName: this.currentChildCustomer.firstName,
                    lastName: this.currentChildCustomer.lastName,
                    email: this.currentChildCustomer.email,
                    phoneNumber: this.currentChildCustomer.phoneNumber,
                    company: this.currentChildCustomer.companyName,
                    companyCode: this.currentChildCustomer.companyCode,
                    vatCode: this.currentChildCustomer.vatCode,
                    city: this.currentChildCustomer.companyAddress.city,
                    countryCode: this.currentChildCustomer.companyAddress.countryCode,
                    postcode: this.currentChildCustomer.companyAddress.postcode,
                    street: this.currentChildCustomer.companyAddress.street,
                    pointOfSale: this.selectedAddressId
                },
                cartToken: this.cartToken
            }

            console.log('requestPayload for company', requestPayload);
            
            await this.setPickupData({ ...requestPayload });

            if(this.status === EStatus.SUCCESS) {
                this.$notify({
                    type: EMessageTypes.SUCCESS,
                    title: 'Success'
                });
                this.nextStep();
            } else {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: 'Error'
                });
            }
        }

        if(this.currentChildCustomer && !this.currentChildCustomer.isCompany) {
            const requestPayload: ICustomerRequestBody = {
                payload: {
                    customer: this.customer.id,
                    isCompany: false,
                    firstName: this.currentChildCustomer.firstName,
                    lastName: this.currentChildCustomer.lastName,
                    email: this.currentChildCustomer.email,
                    phoneNumber: this.currentChildCustomer.phoneNumber,
                    pointOfSale: this.selectedAddressId
                },
                cartToken: this.cartToken
            }

            console.log('requestPayload for customer', requestPayload);
            
            await this.setPickupData({ ...requestPayload });

            if(this.status === EStatus.SUCCESS) {
                this.$notify({
                    type: EMessageTypes.SUCCESS,
                    title: 'Success'
                });
                this.nextStep();
            } else {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: 'Error'
                });
            }
        }

        return false;
    }

    private async unauthorizedSubmit(): Promise<void | boolean> {
        console.log('unauthorizedSubmit');

        const formRef: any = this.$refs.pickupNotAuthorizedForm;

        if(!this.selectedAddressId) {
            this.$notify({
                type: EMessageTypes.INFO,
                title: this.$t('CheckoutPage.pickup.selectStoreMessage').toString()
            });

            return false;
        }

        formRef.$v.$touch();
        formRef.loader = true;

        if(!formRef.$v.$invalid) {
            const body = { ...formRef.formFields, isCompany: false };

            console.log('body', body);

            if(!this.customer) await this.addCustomer({ body, cartToken: this.cartToken });

            if(this.customerError) {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: this.customerError.message
                });

                return false;
            }

            const requestPayload: ICustomerRequestBody = {
                payload: {
                    customer: this.customer.id,
                    isCompany: body.isCompany,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    phoneNumber: body.phoneNumber,
                    pointOfSale: this.selectedAddressId
                },
                cartToken: this.cartToken
            }

            console.log('requestPayload', requestPayload);

            await this.setPickupData({ ...requestPayload });
            
            if(this.status === EStatus.SUCCESS) {
                this.$notify({
                    type: EMessageTypes.SUCCESS,
                    title: 'Success'
                });
                this.nextStep();
            } else {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: 'Error'
                });
            }
        }

        return false;
    }

    public continueCheckout(): void {
        !!(this.informationList && this.informationList.length) ? this.authorizedSubmit() : this.unauthorizedSubmit();
    }

    public selectAddress(id: number): void {
        this.selectedAddressId = id;
    }

    public openContactModal(): void {
        this.$modal.show(
            ModalCustomer,
            { modal: this.$modal, isEdit: false, isCustomer: true },
            { ...MODAL_CONFIG, classes: 'modal--mobile-full' }
        );
    }

    private selectCustomerHandler(index: number | null): void {
        index !== null
            ? // @ts-ignore
              (this.currentChildCustomer = { ...this.informationList?.find((elem: any) => elem.id === index) })
            : (this.currentChildCustomer = null);
    }

    public selectCustomer(id: number): void {
        this.selectedCustomerId = id;
        this.selectCustomerHandler(id);
    }

    public mounted(): void {
        this.selectCustomerHandler(null);
    }

    public deactivated(): void {
        console.log('deactivated checkout pickup');
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-pickup {
    padding: 0 15px 20px 15px;

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
    }

    &__subheader {
        color: $color-dark-blue;
        line-height: 22px;
    }

    &__wrapper {
        border-bottom: 1px solid $color-lightest-grey;
        padding: 20px 0 20px 0;
    }

    &__grid {
        display: grid;
        grid-template-columns: 100%;

        &:not(:last-child) {
            margin-bottom: 32px;
        }

        &--last {
            margin-top: 40px;

            .checkout-pickup__radio {
                margin-top: 22px;
            }
        }
    }

    &__shop {
        &:first-child {
            margin-top: 10px;
        }
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    &__description {
        padding-left: 28px;
        color: $color-search-bg;
        margin-top: 4px;
    }

    &__info {
        color: $color-search-bg;
    }

    &__error {
        color: $color-pink;
        font-size: 12px;
        line-height: 18px;
        margin-top: 40px;
    }

    &__radio {
        &:not(:last-child) {
            margin-bottom: 20px;
        }

        span,
        .email-field,
        a {
            padding-left: 28px;
        }

        a, .email-field {
            color: $color-pink;
        }
    }

    &__button {
        width: 100%;
        margin-left: auto;
        margin-top: 22px;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-pickup {
        padding: 0;

        &__head {
            padding-bottom: 30px;
        }

        &__wrapper {
            padding: 20px 0;
        }

        &__grid {
            grid-template-columns: 34% 1fr;

            &:not(:last-child) {
                margin-bottom: 20px;
            }

            &--last {
                margin-top: 40px;

                .checkout-pickup__radio {
                    margin-top: 0;
                }
            }
        }

        &__shop {
            &:first-child {
                margin-top: 0;
            }
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }

        &__button {
            width: 160px;
            margin-top: 40px;
            margin-top: 15px;
        }
    }
}
</style>
