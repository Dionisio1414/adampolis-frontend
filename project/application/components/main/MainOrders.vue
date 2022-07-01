<template>
    <section class="main-orders">
        <div 
            class="main-orders__title"
            v-html="$sanitize($t('MainOrders.title'))"
        >
        </div>
        <div class="main-orders__wrapper">
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
                        <div 
                            class="orders-list__body-error"
                            v-html="$sanitize($t('OrdersPage.table.errorText'))"
                        >
                        </div>
                    </template>
                    <transition name="fade">
                        <div
                            v-if="processingStatus"
                            class="spinner"
                        >
                            <Spinner></Spinner>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import MainOrdersItem from '~/components/main/MainOrdersItem.vue';
import OrdersCard from '~/components/orders/OrdersCard.vue';
import OrdersTableHeader from '~/components/orders/OrdersTableHeader.vue';
import { EStatus } from '~/constants/status';
import { IOrders } from '~/types/orders.interface';
import Spinner from '~/components/Spinner.vue';

@Component({
    components: { 
        MainOrdersItem,
        OrdersCard,
        OrdersTableHeader,
        Spinner
    }
})
export default class ComponentMainOrders extends Vue {
    @Prop({ default: () => [] }) public orders!: IOrders[];
    @Prop() public status!: EStatus;

    public get processingStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-orders {

    &__title {
        flex: 1;
        color: $color-black;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 27px;
        margin: 0 0 23px 0;
        display: flex;
        align-items: center;
        &:last-child {
            flex: initial;
            flex-direction: column;
            color: transparent;
            visibility: hidden;
            height: 0;
            pointer-events: none;
        }
    }

    &__wrapper {
        overflow-x: auto;
    }

    .orders-list {
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
    }
}
</style>
