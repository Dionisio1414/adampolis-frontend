<template>
    <div class="main-orders-item">
        <div class="main-orders-item__item">
            <div class="main-orders-item__title">{{ $t('MainOrders.date') }}:</div>
            {{ order.date }}
        </div>
        <div class="main-orders-item__cell">
            <div class="main-orders-item__title">{{ $t('MainOrders.orderId') }}:</div>
            {{ order.orderId }}
        </div>
        <div class="main-orders-item__cell">
            <div class="main-orders-item__title">{{ $t('MainOrders.price') }}:</div>
            {{ order.price }} €
        </div>
        <div class="main-orders-item__cell">
            <div class="main-orders-item__title">{{ $t('MainOrders.delivery') }}:</div>
            {{ order.delivery }}
        </div>
        <div class="main-orders-item__cell">
            <div class="main-orders-item__title">{{ $t('MainOrders.payment') }}:</div>
            {{ order.payment }}
        </div>
        <div class="main-orders-item__cell">
            <div class="main-orders-item__title">{{ $t('MainOrders.status') }}:</div>
            {{ order.status }}
        </div>
        <div class="main-orders-item__cell">
            <div class="main-orders-item__button--blue">
                <div class="main-orders-item__title flex-hidden"></div>
                {{ $t('MainOrders.viewOrder') }}
            </div>
            <div class="main-orders-item__button--dark">
                <div class="main-orders-item__title flex-hidden"></div>
                {{ $t('MainOrders.repeatOrder') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentMainOrdersItem extends Vue {
    @Prop()
    public order!: Object;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-orders-item {
    background-color: $color-white;
    display: flex;
    padding: 6px 0;
    width: 100%;

    &__cell {
        flex: 1;
        color: $color-black;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 18px;
        margin: 0;
        display: flex;
        flex-direction: column;

        &:last-child {
            flex: initial;
        }
    }

    &__title {
        display: none;
        font-weight: 600;
        min-width: 130px;
    }

    &__button {
        border-radius: 4px;
        color: $color-white;
        text-align: center;
        padding: 2px;
        cursor: pointer;

        &--blue {
            @extend .main-orders-item__button;
            background-color: $color-blue;
            margin-bottom: 10px;
        }

        &--dark {
            @extend .main-orders-item__button;
            background-color: $color-dark-blue;
        }
    }
}

@include media-md {
    .main-orders-item {
        flex-direction: column;

        &__cell {
            flex-direction: row;

            &:last-child {
                justify-content: space-between;
                margin-top: 10px;
            }
        }

        &__title {
            display: block;
        }

        &__button {
            &--blue {
                margin-bottom: 0;
            }
        }
    }
}
</style>
