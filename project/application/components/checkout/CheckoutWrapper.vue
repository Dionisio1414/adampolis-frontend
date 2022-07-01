<template>
    <div class="checkout-wrapper " :class="{ 'card card--bordered': !isMobile }">
        <div class="checkout-wrapper__sidebar">
            <CheckoutTabs 
                :tabs="currentTabs" 
                :currentIndex="selectedTab" 
                @changeTab="changeTab"
            >
            </CheckoutTabs>
        </div>
        <div class="checkout-wrapper__content" :class="{ 'card card--bordered': isMobile }">
            <div v-if="currentTab && currentTab.name" class="checkout-wrapper__heading">{{ $t(currentTab.name) }}</div>
            <div>
                <keep-alive>
                    <component 
                        :is="currentTab.component"
                        :paymentData="paymentData" 
                    >
                    </component>
                </keep-alive>
            </div>
            <transition name="fade">
                <div v-if="submitStatus" class="checkout-wrapper__content-spinner">
                    <Spinner></Spinner>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, Watch, InjectReactive } from 'nuxt-property-decorator';
import CheckoutTabs from './CheckoutTabs.vue';
import { CheckoutDelivery, CheckoutPickup } from './delivery';
import { CheckoutBankTransfer, CheckoutPayOnline, CheckoutDeferredPurchase, CheckoutPayWithdrawal } from './payment';

import MixinWindowSize from '~/mixins/window-size';
import { IPaymentMethods } from '~/types/payment-methods';
import { EPaymentMethods } from '~/constants/payment-methods';
import Spinner from '~/components/Spinner.vue';
import { EStatus } from '~/constants/status';

export interface ITab {
    name: string;
    component: string;
    message?: string;
    code?: string;
}

@Component({
    components: {
        CheckoutTabs,
        CheckoutDelivery,
        CheckoutPickup,
        CheckoutBankTransfer,
        CheckoutPayOnline,
        CheckoutDeferredPurchase,
        CheckoutPayWithdrawal,
        Spinner
    }
})
export default class ComponentCheckoutWrapper extends mixins(MixinWindowSize) { 
    @Prop({ required: true }) public currentStep!: number;

    @InjectReactive('PAYMENT_METHODS') public paymentMethods!: IPaymentMethods[];  
    @InjectReactive('PAYMENT_STATUS') public paymentStatus!: EStatus;
    
    public selectedTab: number = 0;

    @Watch('currentStep')
    public watchCurrentStep(): void {
        this.selectedTab = 0;
    }

    public get pagesList(): Array<ITab[]> {
        const deliveryTabs: ITab[] = [
            {
                name: this.$t('CheckoutPage.tabs.delivery.name').toString(),
                component: 'CheckoutDelivery'
            },
            {
                name: this.$t('CheckoutPage.tabs.pickup.name').toString(),
                component: 'CheckoutPickup',
                message: this.$t('CheckoutPage.tabs.pickup.message').toString()
            }
        ];

        const paymentTabs = (this.paymentMethods || []).map(item => {
            switch(item.code) {
                case EPaymentMethods.BANK_TRANSFER:
                    return { 
                        name: item.name,
                        component: 'CheckoutBankTransfer',
                        code: item.code
                    }
                case EPaymentMethods.OFFLINE:
                    return { 
                        name: item.name,
                        component: 'CheckoutPayWithdrawal',
                        message: item.instructions,
                        code: item.code
                    }
                case EPaymentMethods.ONLINE:
                    return { 
                        name: item.name,
                        component: 'CheckoutPayOnline',
                        code: item.code
                    }
                case EPaymentMethods.CONTRACT_PURCHASE_POSTPONED:
                    return { 
                        name: item.name,
                        component: 'CheckoutDeferredPurchase',
                        code: item.code
                    }
            }
        }) as Array<ITab>;

        return [ deliveryTabs, paymentTabs ];
    }

    public get currentTabs(): ITab[] {
        return this.pagesList[this.currentStep];
    }

    public get currentTab(): ITab {
        return this.currentTabs[this.selectedTab];
    }

    public get paymentData(): Partial<IPaymentMethods> | undefined {
        switch(this.currentTab?.code) {
            case EPaymentMethods.BANK_TRANSFER:
                return this.paymentMethods.find(item => item.code === EPaymentMethods.BANK_TRANSFER);
            case EPaymentMethods.ONLINE:
                return this.paymentMethods.find(item => item.code === EPaymentMethods.ONLINE);
            case EPaymentMethods.OFFLINE:
                return this.paymentMethods.find(item => item.code === EPaymentMethods.OFFLINE);
            case EPaymentMethods.CONTRACT_PURCHASE_POSTPONED:
                return this.paymentMethods.find(item => item.code === EPaymentMethods.CONTRACT_PURCHASE_POSTPONED);
        }
    }

    public get isMobile(): boolean {
        return this.windowWidth < 991;
    }

    public get submitStatus(): boolean {
        return this.paymentStatus === EStatus.PROCESSING;
    }

    public changeTab(id: number): void {
        this.selectedTab = id;
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__sidebar {
        width: 100%;
        margin-bottom: 20px;
    }

    &__content {
        position: relative;
        padding: 0;
        width: 100%;
        &-spinner {
            background: rgba(255, 255, 255, 0.8);
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }

    &__heading {
        color: $color-dark-blue;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px solid $color-lightest-grey;
        padding: 20px 15px;
        line-height: 24px;
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-wrapper {
        flex-direction: row;

        &__sidebar {
            width: 50%;
            margin-bottom: 0;
        }

        &__content {
            padding: 28px 40px;
            width: 100%;
        }

        &__heading {
            padding: 0 0 28px 0;
        }
    }
}
</style>
