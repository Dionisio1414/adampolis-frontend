<template>
    <div class="checkout-delivery">
        <div v-if="informationList" class="checkout-delivery__header">
            <div class="checkout-delivery__subheader text text--s text--bold">
                {{ $t('CheckoutPage.delivery.deliveryAddress') }}
            </div>
            <button 
                v-if="isTheCompany"
                class="btn btn--label-grey" 
                @click="openContactModal"
            >
                {{ $t('CheckoutPage.common.change') }}
            </button>
        </div>
        <div v-if="informationList && informationList.length && isTheCompany" class="checkout-delivery__addresses container-fluid-no-gutters">
            <div class="row">
                <div class="col-12 col-lg-4">
                    <div class="chackout-delivery__caption text text--600">{{ $t('CheckoutPage.delivery.home') }}</div>
                </div>
                <div class="col-12 col-lg-8">
                    <div
                        class="checkout-delivery__radio form-radio"
                        v-for="customer in informationList"
                        :key="customer.id"
                    >
                        <button 
                            class="form-radio-button"
                            :class="{'form-radio-button--checked': currentAddressId === address.id}"
                            type="button"
                            @click.stop="changeAddress(customer.id)"
                        >
                            <span class="form-radio-button__label">
                                {{ `${customer.fullName}` }}
                                <span v-if="customer.isCompany">, {{ customer.companyName }}</span> <br />
                            </span>
                            <span v-if="customer.isCompany" class="checkout-delivery__label">
                                {{
                                    `${customer.companyAddress.city} ${customer.companyAddress.postcode || ''}, ${
                                        customer.companyAddress.countryCode
                                    }`
                                }}
                                <br />
                                {{ customer.companyAddress.street }}.
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="informationList && informationList.length && !isTheCompany" class="checkout-delivery__addresses container-fluid-no-gutters">
            <div class="row">
                <div class="col-12 col-lg-4">
                    <div class="chackout-delivery__caption text text--600">{{ $t('CheckoutPage.delivery.home') }}</div>
                </div>
                <div class="col-12 col-lg-8">
                    <div
                        class="checkout-delivery__radio"
                        v-for="address in informationList"
                        :key="address.id"
                    >  
                        <button 
                            class="form-radio-button"
                            :class="{'form-radio-button--checked': currentAddressId === address.id}"
                            type="button"
                            @click.stop="changeAddress(address.id)"
                        >
                            <span class="form-radio-button__label">{{ address.firstName }} {{ address.lastName }}</span>
                            <span class="checkout-delivery__label">
                                {{
                                    `${address.city ? address.city : ''} ${ address.postcode ? `${address.postcode},` : ''} ${address.countryCode ? address.countryCode : ''}`
                                }}
                                <br />
                                {{ address.street ? `${address.street}.` : '' }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="checkout-delivery__tabs container-fluid-no-gutters">
            <div class="row">
                <div class="col-12 col-lg-4">
                    <div class="form-radio">
                        <input
                            id="radio_form_legal"
                            class="form-radio__field"
                            type="radio"
                            name="radio_form_legal"
                            @change="changeForm(0)"
                            :checked="currentFormIndex == 0"
                        />
                        <label for="radio_form_legal" class="form-radio__label">
                            {{ $t('CheckoutPage.delivery.legalPerson') }}
                        </label>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="checkout-delivery__radio  form-radio">
                        <input
                            id="radio_form_individual"
                            class="form-radio__field"
                            type="radio"
                            name="radio_form_individual"
                            @change="changeForm(1)"
                            :checked="currentFormIndex === 1"
                        />
                        <label for="radio_form_individual" class="form-radio__label">
                            {{ $t('CheckoutPage.delivery.individual') }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid-no-gutters">
            <div class="checkout-delivery__subheader checkout-delivery__subheader--last text text--s text--bold">
                {{ $t('CheckoutPage.delivery.deliveryAddress') }}
            </div>
            <CustomerLegalForm 
                ref="checkoutForm" 
                v-if="currentFormIndex === 0" 
                :formData="currentChildCustomer"
            >
            </CustomerLegalForm>
            <CustomerIndividualForm 
                ref="checkoutForm" 
                v-else 
                :formData="currentChildCustomer"
            >
            </CustomerIndividualForm>
            <div class="d-flex">
                <button 
                    class="checkout-delivery__button btn btn--pink" 
                    @click="continueCheckout"
                >
                    {{ $t('CheckoutPage.common.continue') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Inject, Action, InjectReactive } from 'nuxt-property-decorator';
import { CustomerLegalForm, CustomerIndividualForm } from '~/components/customer';
import ModalCustomer from '~/components/checkout/modals/ModalCustomer.vue';
import { MODAL_CONFIG } from '@/constants/modalConfig';
import { ICustomer } from '~/types/profile-data.interface';
import { IDictionary } from '~/types/dictionary.interface';
import { ICustomerRequestBody } from '~/types/checkout.interface';
import { EMessageTypes } from '~/constants/message-types';
import { EStatus } from '~/constants/status';
import { ICart } from '~/types/cart.interface';

@Component({
    components: {
        CustomerIndividualForm,
        CustomerLegalForm,
        ModalCustomer
    }
})
export default class ComponentCheckoutDelivery extends Vue {
    @Inject('CHECKOUT_NEXT_STEP') public nextStep!: () => void;
    
    @InjectReactive('CUSTOMER_ERROR') public customerError!: any;
    @InjectReactive('CART_TOKEN') public cartToken!: string | null;
    @InjectReactive('IS_AUTHORIZED') public isAuthorized!: boolean;
    @InjectReactive('CUSTOMER_DATA') public customer!: ICustomer;
    @InjectReactive('SHIPPING_STATUS') public status!: EStatus;
    @InjectReactive('CART_DATA') public cartData!: ICart;

    @Action('page-checkout-shipping/setShipping') public setShipping!: (payload: ICustomerRequestBody) => Promise<void>;
    @Action('customer/addCustomer') public addCustomer!: (payload: any) => Promise<void>;

    public currentFormIndex: number  = 1;
    public currentAddressId: number | null = null;
    public currentChildCustomer: Partial<ICustomer> | null = null;
    public $modal: any;

    public get informationList(): any[] | IDictionary<ICustomer> | undefined {
        if(this.customer && this.customer.isCompany) {
            const { customers, addresses, ...rest } = this.customer;
            return [ rest, ...(this.customer.customers as any) ];
        } 
        
        if(this.customer?.addresses && !this.customer.isCompany) {
            return this.customer?.addresses;
        }

        return undefined;
    }

    public get isTheCompany(): boolean {
        return !!(this.customer && this.customer.isCompany);
    }

    private async setShippingHandler(
        body: ICustomer, 
        cartToken: string | null, 
        isCompany: boolean
    ): Promise<void | boolean> {
        const customerBody: ICustomer = { ...body };
        
        if(customerBody.notes) delete customerBody.notes;

        if(!this.customer) await this.addCustomer({ body: customerBody, cartToken });

        if(this.customerError) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.customerError.message
            });

            return false;
        } 
            
        if(!isCompany) {
            console.log('not company');
            
            const requestPayload: ICustomerRequestBody = {
                payload: {
                    customer: this.customer.id,
                    isCompany,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    phoneNumber: body.phoneNumber,
                    city: body.companyAddress.city,
                    countryCode: body.companyAddress.countryCode,
                    postcode: body.companyAddress.postcode,
                    street: body.companyAddress.street
                },
                cartToken
            }

            console.log('shipping for customer', requestPayload);

            await this.setShipping({ ...requestPayload });

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
        } else {
            console.log('is company');

            const requestPayload: ICustomerRequestBody = {
                payload: {
                    customer: this.customer.id,
                    isCompany,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    phoneNumber: body.phoneNumber,
                    company: body.companyName,
                    companyCode: body.companyCode,
                    vatCode: body.vatCode,
                    city: body.companyAddress.city,
                    countryCode: body.companyAddress.countryCode,
                    postcode: body.companyAddress.postcode,
                    street: body.companyAddress.street
                },
                cartToken
            }

            if(body.notes) requestPayload.payload.notes = body.notes;

            console.log('shipping for company', requestPayload);

            await this.setShipping({ ...requestPayload });

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
            
    }

    public async continueCheckout(): Promise<void | boolean> {
        const checkoutFormRef: any = this.$refs.checkoutForm;

        checkoutFormRef.$v.$touch();
        checkoutFormRef.loader = true;
        
        if(!checkoutFormRef.$v.$invalid) {
            const cartToken: string | null = this.cartToken;
            const isCompany: boolean = !Boolean(this.currentFormIndex);
            const notes: string = checkoutFormRef.notes;
            const body = {
                ...checkoutFormRef.formFields,
                isCompany,
                companyAddress: {
                    ...checkoutFormRef.companyAddress
                }
            };

            if(notes && notes.length) body.notes = notes;

            this.setShippingHandler( 
                body, 
                cartToken,
                isCompany
            );

        }
    }

    public changeForm(index: number): void {
        this.currentAddressId = null;
        this.currentChildCustomer = null;
        this.currentFormIndex = index;
    }

    public selectCustomer(index: number | null): void {
        index !== null
            ? // @ts-ignore
              (this.currentChildCustomer = { ...this.informationList?.find((elem: any) => elem.id === index) })
            : (this.currentChildCustomer = null);
        this.currentFormIndex = this.currentChildCustomer?.isCompany ? 0 : 1;
    }

    public changeAddress(id: number): void {
        if(this.currentAddressId) {            
            this.currentAddressId = null;
            this.selectCustomer(null);
            return;
        }

        if(!this.currentAddressId) {
            this.currentAddressId = id;
            this.selectCustomer(id);
            return;
        }
    }

    public openContactModal(): void {
        this.$modal.show(
            ModalCustomer,
            { modal: this.$modal, isEdit: false, isCustomer: true },
            { ...MODAL_CONFIG, classes: 'modal--mobile-full' }
        );
    }

    private fillShippingAddress(): void {
        if(this.cartData && this.cartData.shippingAddress) {
            this.customer && this.customer.isCompany ? this.currentFormIndex = 0 : this.currentFormIndex = 1;
            this.currentChildCustomer = this.cartData.shippingAddress;
        } else {
            this.currentChildCustomer = null;
        }
    }

    public mounted(): void {
        this.selectCustomer(null);
    }

    public deactivated(): void {
        if(this.currentFormIndex === 0) {
            (this.$refs.checkoutForm as any).resetForm();
        } else {
            (this.$refs.checkoutForm as any).resetForm();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-delivery {
    padding: 20px 15px 10px 15px;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__subheader {
        color: $color-dark-blue;

        &--last {
            padding-top: 32px;
        }
    }

    &__addresses {
        border-bottom: 1px solid $color-lightest-grey;
        padding: 22px 0;
    }

    &__caption {
        font-size: 14px;
    }

    &__tabs {
        padding: 20px 0 0px 0;
    }

    &__button {
        margin-left: auto;
        width: 160px;
        width: 100%;
    }

    &__label {
        display: block;
        text-align: left;
        padding-left: 28px;
    }

    &__label,
    .form-radio__label {
        font-size: 14px;
        color: $color-dark-blue;
        line-height: 18px;
    }

    &__radio {
        &:first-child {
            margin-top: 20px;
        }
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    ::v-deep {
        .customer-individual-form {
            padding: 20px 0;
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-delivery {
        padding: 0;

        &__header {
            padding-top: 25px;
        }

        &__addresses {
            padding: 30px 0;
        }

        &__caption {
            font-size: 16px;
        }

        &__radio {
            &:first-child {
                margin-top: 0;
            }
        }

        &__tabs {
            padding: 30px 0 0px 0;
        }

        &__button {
            width: 160px;
        }
    }
}
</style>
