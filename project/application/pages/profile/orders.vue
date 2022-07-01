<template>
    <div class="profile-orders">
        <div class="profile-orders__header">
            <h3 class="h3 profile-orders__header-caption">{{ $t('ProfilePage.tabs.orders') }}</h3>
        </div>
        <div class="profile-orders__main">
            <div class="actions">
                <div class="actions__col">
                    <OrdersSearchInput 
                        @update-search="updateSearch"
                    >
                    </OrdersSearchInput>
                </div>
                <div class="actions__col">
                    <button 
                        type="button" 
                        class="btn btn--primary d-none d-lg-block profile-orders__filter-btn"
                        @click="filterHandler"
                    >
                        {{ $t('SuppliersPage.filter') }}
                    </button>
                    <multiselect
                        class="form-control d-block d-lg-none"
                        v-model="filter"
                        :allow-empty="true"
                        :options="options"
                        :placeholder="`${$t('CatalogPage.Sorting.sortByOptions.placeholder')}`"
                        label="label"
                        track-by="label"
                        @select="onChangeSelect"
                    >
                        <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                    </multiselect>
                </div>
            </div>
            <div class="wrapper">
                <div class="orders-list">
                    <OrdersTableHeader></OrdersTableHeader>
                    <div class="orders-list__body">
                        <template v-if="orders && orders.length">
                            <OrdersCard
                                v-for="(val, index) in orders"
                                :key="index"
                                :order="val"
                            >
                            </OrdersCard>
                        </template>
                        <template v-else>
                            <div class="orders-list__body-error">
                                {{ $t('OrdersPage.table.errorText') }}
                            </div>
                        </template>
                        <transition name="fade">
                            <div
                                v-if="getSumbitStatus"
                                class="spinner"
                            >
                                <Spinner/>
                            </div>
                        </transition>
                    </div>
                </div>
                <Pagination
                    v-if="meta && meta.totalPages > 1"
                    class="orders-pagination"
                    :totalPages="meta.totalPages"
                    :currentPage="current"
                    :hideFirstAndLastPageLinks="true"
                    :hidePreviousAndNextPageLinks="false"
                    @onPageChange="onPageChange"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter, Action } from 'nuxt-property-decorator';
import OrdersSearchInput from '~/components/orders/OrdersSearchInput.vue';
import OrdersCard from '~/components/orders/OrdersCard.vue';
import OrdersTableHeader from '~/components/orders/OrdersTableHeader.vue';
import { IOrders, IOrdersQuery, IOrdersMeta } from '~/types/orders.interface';
import Multiselect from 'vue-multiselect';
import OrdersFilterPopup from '~/components/orders/modals/OrdersFilterPopup.vue';
import { MODAL_CONFIG } from '~/constants/modalConfig';
import Spinner from '~/components/Spinner.vue';
import { EStatus } from '~/constants/status';
import Pagination from '~/components/Pagination.vue';

@Component({
    components: {
        OrdersSearchInput,
        OrdersCard,
        OrdersTableHeader,
        Multiselect,
        Spinner,
        Pagination,
        OrdersFilterPopup
    },
    middleware: ['auth-user-only']
})
export default class ProfileOrders extends Vue {
    @Getter('page-profile-orders/getOrdersData') public orders!: IOrders[] | [];
    @Getter('page-profile-orders/getOrdersMeta') public meta!: IOrdersMeta | [];
    @Getter('page-profile-orders/getStatus') public status!: EStatus;
    @Action('page-profile-orders/fetchOrders') public fetchOrders!: (payload: IOrdersQuery) => Promise<void>;

    public $modal: any;
    public filter = null;
    public current: number = 1;
    public options = [
        { value: 'date', label: this.$t('OrdersPage.table.header.date') },
        { value: 'number', label: this.$t('OrdersPage.table.header.id') },
        { value: 'totalSum', label: this.$t('OrdersPage.table.header.priceVat') },
        { value: '', label: this.$t('OrdersPage.table.header.deliveryType') },
        { value: 'payment', label: this.$t('OrdersPage.table.header.payment') },
        { value: 'shipment', label: this.$t('OrdersPage.table.header.shipmentStatus') },
    ];

    public updateSearch(value: string): void {
        this.fetchOrders({ page: 1, query: { query: value, limit: 5 } });
    }
    public filterHandler(): void {
        this.$modal.show(
            OrdersFilterPopup,
            {
                modal: this.$modal,
            },
            {
                ...MODAL_CONFIG,
                maxWidth: 388,
                shiftY: 0,
                shiftX: 1,
                classes: 'filter-popup',
                transition: 'modal',
                overlayTransition: 'fade',
                scrollable: false
            }
        );
    }

    public get getSumbitStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public async onPageChange(page: number): Promise<void> {
        await this.fetchOrders({ 
            page: page, 
            query: { limit: 5 } 
        });
        this.current = page;
    }

    public onChangeSelect({ value }: any): void {
        this.fetchOrders({
            page: 1,
            query: {
                field: value,
                order: 'desc',
                limit: 5 
            }
        })
    }

    async asyncData({ store, error }: any): Promise<void> {
        try {
            await store.dispatch('page-profile-orders/fetchOrders', {
                page: 1,
                query: { limit: 5 }
            });
            await store.dispatch('page-profile-orders/fetchOrdersFilter');
        } catch (e) {
            error(e);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.profile-orders {
    background: #fff;
    border-radius: 4px;
    border: 1px solid rgba(203,208,216,0.6);
    &__header {
        border-bottom: 1px solid rgba(203,208,216,0.6);
        padding: 20px;
        @include media-lg {
            display: none;
        }
        &-caption {
            color: $color-dark-blue;
        }
    }
    &__main {
        padding: 20px;
        @include media-lg {
            padding: 0;
        }
    }
    &__filter-btn {
        width: 100%;
        max-width: 120px;
    }
}

.actions {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    @include media-lg {
        border-bottom: 1px solid rgba(203,208,216,0.6);
        padding: 15px;
        margin-bottom: 0;
    }
    &__col {
        &:first-child {
            flex: 0 1 calc(85% - 10px);
            @include media-lg {
                flex: 0 1 100%;
                margin-bottom: 15px;
            }
        }
        &:last-child {
            flex: 0 1 calc(15% - 10px);
            @include media-lg {
                flex: 0 1 100%;
            }
        }
    }
}

.wrapper {
    overflow-x: auto;
}

.orders-list {
    min-width: 850px;
    @include media-lg {
        min-width: 0;
    }
    &__body {
        position: relative;
        border-left: 1px solid rgba(203,208,216,0.6);
        border-right: 1px solid rgba(203,208,216,0.6);
        border-bottom: 1px solid rgba(203,208,216,0.6);
        border-radius: 0 0 4px 4px;
        @include media-lg {
            border: none;
        }
        .order-card {
            &:not(:last-child) {
                border-bottom: 1px solid rgba(203,208,216,0.6);
            }
        }
        &-error {
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            padding: 20px 15px;
            color: $color-grey-error;
        }
    }
    + .orders-pagination {
        margin-top: 20px;
        justify-content: center;
        @include media-lg {
            margin-bottom: 20px;
        }
    }
}

</style>
