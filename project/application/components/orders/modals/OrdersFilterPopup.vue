<template>
    <modal-window>
        <template #header>
            <modal-header @close='close'>
                <template #title>
                    {{ $t('OrdersPage.filterPopup.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <form @submit.prevent="applyFilter" class="form form-filter">
                <div class="form-filter__wrapper">
                    <div class="form-filter__list">
                        <div class="form-filter__list-item">
                            <Accordion>
                                <template #title>{{ $t('OrdersPage.filterPopup.date') }}</template>
                                <template #content>
                                    <div class="dates">
                                        <div class="dates__item">
                                            <div class="dates__label">{{ $t('OrdersPage.filterPopup.from') }}</div>
                                            <div class="dates__field">
                                                <date-picker
                                                    v-model="form.dateFrom"
                                                    format="YYYY-MM-DD"
                                                    type="date"
                                                    valueType="format"
                                                    placeholder="Select date"
                                                >
                                                </date-picker>
                                            </div>
                                        </div>
                                        <div class="dates__item">
                                            <div class="dates__label">{{ $t('OrdersPage.filterPopup.until') }}</div>
                                            <div class="dates__field">
                                                <date-picker
                                                    v-model="form.dateTo"
                                                    format="YYYY-MM-DD"
                                                    type="date"
                                                    valueType="format"
                                                    placeholder="Select date"
                                                >
                                                </date-picker>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </Accordion>
                        </div>
                        <div class="form-filter__list-item">
                            <Accordion>
                                <template #title>{{ $t('OrdersPage.filterPopup.paymentType') }}</template>
                                <template #content>
                                    <OrdersModalList
                                        type="payments"
                                        :list="filter.payments"
                                        @values="onChangeValue"
                                    >
                                    </OrdersModalList>
                                </template>
                            </Accordion>
                        </div>
                        <div class="form-filter__list-item">
                            <Accordion>
                                <template #title>{{ $t('OrdersPage.filterPopup.shipmentStatus') }}</template>
                                <template #content>
                                    <OrdersModalList
                                        type="shipments"
                                        :list="filter.shipments"
                                        @values="onChangeValue"
                                    >
                                    </OrdersModalList>
                                </template>
                            </Accordion>
                        </div>
                    </div>
                    <div class="form-filter__block mt-auto">
                        <button type="submit" class="btn btn--pink form-filter__button">{{ $t('OrdersPage.filterPopup.applyFilters') }}</button>
                    </div>
                    <div class="form-filter__block d-flex justify-content-center">
                        <button 
                            type="button" 
                            class="btn btn--default btn--inline-flex btn--delete"
                            @click="resetFilter"
                        >
                            <i class="icon icon--delete"></i>
                            {{ $t('OrdersPage.filterPopup.clearFilters') }}
                        </button>
                    </div>
                </div>
                 <transition name="fade">
                    <div
                        v-if="getSumbitStatus"
                        class="spinner"
                    >
                        <Spinner/>
                    </div>
                </transition>
            </form>
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Getter, Action } from 'nuxt-property-decorator';
import ModalWindow from '~/components/modals/ModalWindow.vue';
import ModalHeader from '~/components/modals/ModalHeader.vue';
import Spinner from '~/components/Spinner.vue';
import Accordion from '~/components/Accordion.vue';
import OrdersModalList from '../OrdersModalList.vue';
import { IOrdersFilter, IOrdersFilterData, IOrdersQuery, IQuery } from '~/types/orders.interface';
import { EStatus } from '~/constants/status';

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        Spinner,
        Accordion,
        OrdersModalList
    }
})
export default class ComponentOrdersFilterPopup extends Vue {
    @Getter('page-profile-orders/getOrdersFilter') public filter!: IOrdersFilter;
    @Getter('page-profile-orders/getStatus') public status!: EStatus;
    @Action('page-profile-orders/fetchOrders') public fetchOrders!: (payload: IOrdersQuery) => Promise<void>;
    
    @Prop()
    public modal!: any;

    public form: IQuery = {
        dateFrom: '',
        dateTo: '',
        payments: [],
        shipments: []
    }

    public get getSumbitStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public onChangeValue(data: IOrdersFilterData): void {
        const { type, value } = data;
        
        if(type === 'payments') this.form.payments = value;
        else this.form.shipments = value;
    }

    public async applyFilter(): Promise<any> {
        await this.fetchOrders({ 
            page: 1, 
            query: {  
                ...this.form,
                limit: 5 
            } 
        });
        this.close();
    }

    public async resetFilter(): Promise<any> {
        await this.fetchOrders({ 
            page: 1, 
            query: {} 
        });
        this.form = {
            dateFrom: '',
            dateTo: '',
            payments: [],
            shipments: []
        }
        this.close();
    }

    public close(): void {
        this.modal.hideAll();
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.filter-popup {
    .modal-window {
        margin: 0;
        min-height: 100vh;
        height: 100vh;
    }
}

.form-filter {
    position: relative;
    height: calc(100vh - 58px);
    &__list {
        overflow-x: hidden;
        overflow-y: auto;
        margin-bottom: 15px;
        &-item {
             &:not(:last-child) {
                margin-bottom: 15px;
            }
        }
    }
    &__block {
        &:last-child {
            margin-top: 15px;
        }
    }
    &__button {
        width: 100%;
    }
    &__wrapper {
        display: flex;
        flex-direction: column;
        height: calc(100% - 58px);
    }
}

.dates {
    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
    &__label {
        flex: 0 1 calc(10% - 5px);
        font-weight: bold;
        line-height: 22px;
        color: $color-dark-blue;
    }
    &__field {
        flex: 0 1 calc(90% - 5px);
    }
}

.mx-datepicker {
    width: 100%;
}

</style>