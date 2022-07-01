<template>
    <div class="orders-list__header">
        <div 
            v-for="(val, index) in headers"
            :key="index"
            class="orders-list__header-col"
        >
            <div class="orders-list__th" :data-sort="val.attribute" @click="fetchOrdersHandler">{{ $t(val.title) }}</div>
            <i v-show="val.title && val.title.length" class="icon icon--sort orders-list__icon"></i>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component , Action } from 'nuxt-property-decorator';
import { IOrdersHeaders, IOrdersQuery } from '~/types/orders.interface';

@Component({})
export default class ComponentOrdersTableHeader extends Vue {
    @Action('page-profile-orders/fetchOrders') public sortOrders!: (payload: IOrdersQuery) => Promise<void>;

    public headers: IOrdersHeaders[] = [
        {
            title: 'OrdersPage.table.header.date',
            attribute: 'date'
        },
        {
            title: 'OrdersPage.table.header.id',
            attribute: 'number'
        },
        {
            title: 'OrdersPage.table.header.priceVat',
            attribute: 'totalSum'
        },
        {
            title: 'OrdersPage.table.header.deliveryType',
            attribute: ''
        },
        {
            title: 'OrdersPage.table.header.payment',
            attribute: 'payment'
        },
        {
            title: 'OrdersPage.table.header.shipmentStatus',
            attribute: 'shipment'
        },
    ];
    public currentField: string = '';
    public sortType: boolean = false;

    public async fetchOrdersHandler(e: any): Promise<any> {
        this.currentField = e.target.dataset.sort;
        this.sortType = !this.sortType;

        await this.sortOrders({
            page: 1,
            query: {
                field: this.currentField,
                order: this.sortType ? 'asc' : 'desc',
                limit: 5 
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.orders-list {
    &__header {
        background: $color-dark-grey;
        display: grid;
        grid-template-columns: .75fr 1.15fr 1fr 1.4fr 1.25fr 1.4fr 1.5fr;
        grid-gap: 17px;
        border: 1px solid rgba(203,208,216,0.6);
        border-radius: 4px 4px 0 0;
        padding: 10px;
        @include media-lg {
            display: none;
        }
        &-col {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }
    &__icon {
        font-size: 16px;
    }
    &__th {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        line-height: 18px;
        white-space: nowrap;
    }
}
</style>
