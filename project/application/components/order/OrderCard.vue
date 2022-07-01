<template>
    <div class="order-card">
        <div class="order-card__col">
            <div class="order-card__title">{{ data.name }}</div>
            <div class="order-card__code">
                {{ $t('OrdersPreview.orderCode') }}:
                <span class="code">{{ data.code }}</span>
            </div>
        </div>
        <div class="order-card__col">
            <div class="order-card__sum">
                {{ data.total }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
// import { IOrdersList } from '~/types/orders-list.interface'
import { IOrderPreviewItems } from '~/types/order-preview.interface';

@Component({})
export default class ComponentOrderCard extends Vue {
    @Prop()
    public data!: IOrderPreviewItems;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.order-card {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    @include media-md {
        padding: 15px 10px;
    }
    &__col {
        flex: 0 1 calc(50% - 10px);

        @include media-md {
            &:first-child {
                flex: 0 1 calc(70% - 10px);
            }

            &:last-child {
                flex: 0 1 calc(30% - 10px);
            }
        }
    }
    &__title {
        font-size: 12px;
        line-height: 18px;
        font-weight: 600;
        color: #000;
    }
    &__code {
        font-size: 12px;
        line-height: 18px;
        color: $color-search-bg;
    }
    &__sum {
        font-weight: bold;
        line-height: 19px;
        text-align: right;
        color: $color-dark-blue;
    }
}
</style>
