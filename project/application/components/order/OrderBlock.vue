<template>
    <div class="order-preview__card card card--bordered">
        <div class="order-preview__header">
            <h2 class="h2">{{ $t('OrdersPreview.title') }}</h2>
            <div class="actions">
                <a href="#" class="actions__button actions__button--download">
                    <i class="icon icon--download-pink"></i>
                    <span class="actions__button-text">{{ $t('OrdersPreview.btnDownloadText') }}</span>
                </a>
                <button type="button" class="actions__button">
                    <i class="icon icon--mail-dark actions__button-icon"></i>
                </button>
                <button type="button" class="actions__button">
                    <i class="icon icon--print actions__button-icon"></i>
                </button>
            </div>
        </div>
        <div class="order-preview__orders">
            <div class="orders">
                <div class="orders__list">
                    <template v-if="orders.items && orders.items.length">
                        <OrderCard
                            v-for="(val, index) in orders.items"
                            :key="index"
                            :data="val"
                        >
                        </OrderCard>
                    </template>
                    <template v-else>
                        <div class="orders__list-error">
                            {{ $t('OrdersPreview.errorText') }}
                        </div>
                    </template>
                </div>
                <div class="orders__footer">
                    <div class="orders__footer-total">
                        <div class="total-label">{{ $t('OrdersPreview.vatText') }} (21%)</div>
                        <div class="total-price">{{ orders.totalItems }}</div>
                    </div>
                    <div class="orders__footer-total">
                        <div class="total-label total-label--bolder">{{ $t('OrdersPreview.sumText') }}</div>
                        <div class="total-price total-price--accent">{{ orders.totalSum }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-preview__information">
            <div class="line">
                <div class="line__label">{{ $t('OrdersPreview.deliveryAddressText') }}:</div>
                <div class="line__list">
                    <div class="line__list-item" v-if="orders && orders.address">
                        <span class="description">{{ orders.address.street }}</span>
                    </div>
                    <div class="line__list-item">
                        <div class="description description--default">
                            <i class="icon icon--info-grey description__icon"></i>
                            {{ $t('OrdersPreview.parcelText') }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="line" v-if="orders && orders.paymentMethod">
                <div class="line__label">{{ $t('OrdersPreview.billingText') }}:</div>
                <div class="line__list">
                    <div class="line__list-item">
                        <span class="description">{{ orders.paymentMethod }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import OrderCard from './OrderCard.vue';
// import { IOrdersList } from '~/types/orders-list.interface'
import { IOrderPreview } from '~/types/order-preview.interface';

@Component({
    components: { OrderCard }
})
export default class ComponentOrderBlock extends Vue {
    @Prop()
    public orders!: IOrderPreview;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.order-preview {
    &__card {
        padding: 30px;
        @include media-md {
            padding: 20px 15px;
        }
    }
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        @include media-md {
            margin-bottom: 16px;
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &__orders {
        margin-bottom: 35px;
        @include media-md {
            margin-bottom: 30px;
        }
    }
}

.h2 {
    color: $color-dark-blue;
    @include media-md {
        margin-bottom: 20px;
        font-size: 18px;
    }
}

.line {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &:not(:last-child) {
        margin-bottom: 30px;
    }
    &__list {
        flex: 0 1 calc(69% - 10px);
        @include media-md {
            flex: 0 1 100%;
        }
        &-item {
            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }
    }
    &__label {
        flex: 0 1 calc(32% - 10px);
        font-weight: bold;
        line-height: 19px;
        color: $color-dark-blue;
        @include media-md {
            flex: 0 1 100%;
            margin-bottom: 10px;
        }
    }
}

.description {
    line-height: 22px;
    color: $color-search-bg;
    &--default {
        display: flex;
        align-items: center;
        color: #000;
        @include media-md {
            margin-top: 20px;
        }
    }
    &__icon {
        font-size: 20px;
        margin-right: 10px;
    }
}

.actions {
    display: flex;
    align-items: center;
    &__button {
        background: transparent;
        font-size: 12px;
        line-height: 17px;
        padding: 0;
        border: none;
        line-height: 1;
        cursor: pointer;
        &:not(:last-child) {
            margin-right: 20px;
        }
        &-text {
            text-decoration: underline;
        }
        &-icon {
            font-size: 20px;
        }
        &--download {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            color: $color-pink;
            .icon {
                font-size: 16px;
                margin-right: 10px;
            }
        }
    }
}

.orders {
    border-radius: 4px;
    border: 1px solid rgba(203, 208, 216, 0.6);
    &__list {
        .order-card {
            border-bottom: 1px solid rgba(203,208,216,0.6);
        }
        &-error {
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            padding: 20px 15px;
            color: $color-grey-error;
        }
    }
    &__footer {
        background: $color-light-grey;
        padding: 20px;
        @include media-md {
            padding: 15px 10px;
        }
        &-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:not(:last-child) {
                margin-bottom: 5px;
            }
            &:last-child {
                font-size: 16px;
                line-height: 22px;
            }
        }
    }
}

.total {
    &-label {
        &--bolder {
            font-weight: bold;
        }
    }
    &-price {
        font-weight: bold;
        &--accent {
            color: $color-pink;
        }
    }
}
</style>
