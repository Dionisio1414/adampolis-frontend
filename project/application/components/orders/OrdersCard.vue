<template>
  <div class="order-card">
      <div class="order-card__col">
          <div class="description">
              <div class="description__caption d-block d-lg-none">
                {{ $t('OrdersPage.table.header.date') }}
              </div>
              <time>
                {{ order.date }}
              </time>
          </div>
      </div>
      <div class="order-card__col">
          <div class="description">
              <div class="description__caption d-block d-lg-none">
                {{ $t('OrdersPage.table.header.id') }}
              </div>
              {{ order.number }}
          </div>
      </div>
      <div class="order-card__col">
          <div class="description">
              <div class="description__caption d-block d-lg-none">
                {{ $t('OrdersPage.table.header.priceVat') }}
              </div>
              {{ order.totalSum }}
          </div>
      </div>
      <div class="order-card__col">
          <div class="description">
              <div class="description__caption d-block d-lg-none">
                {{ $t('OrdersPage.table.header.deliveryType') }}
              </div>
              {{ order.shipmentType }}
          </div>
      </div>
      <div class="order-card__col">
        <div class="description">
            <div class="description__caption d-block d-lg-none">
                {{ $t('OrdersPage.table.header.payment') }}
            </div>
            <template v-if="order.paymentMethod">
                {{ order.paymentMethod }}
            </template>
            <template v-else>
                -
            </template>
            <!-- <template v-else>
                Banko pavedimo
                <a href="#" class="description__link">{{ $t('OrdersPage.table.buttons.descriptionLink') }}</a>
                <div class="description__wait">{{ $t('OrdersPage.table.description.waitText') }}</div>
            </template> -->
        </div>
      </div>
      <div class="order-card__col">
          <div class="description">
            <div class="description__caption d-block d-lg-none">
                {{ $t('OrdersPage.table.header.shipmentStatus') }}
            </div>
            {{ order.shipmentState }}
          </div>
      </div>
      <div class="order-card__col">
        <div class="actions">
            <NuxtLink
                v-if="isPaidStatus"
                class="btn btn--label-blue actions__btn" 
                :to="`/order?id=${order.id}`"
            >
                {{ $t('OrdersPage.table.buttons.viewOrder') }}
            </NuxtLink>
            <button 
                v-else
                class="btn btn--label-grey-border actions__btn" 
                type="button"
            >
                {{ $t('OrdersPage.table.buttons.invoice') }}
            </button>
            <button 
                class="btn btn--label-dark actions__btn"
                type="button"
            >
                {{ $t('OrdersPage.table.buttons.repeatOrder') }}
            </button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'nuxt-property-decorator';
import { IOrders } from '~/types/orders.interface';
import { EOrderStatus } from '~/constants/order-status';

@Component({})
export default class ComponentOrderCard extends Vue {
    @Prop()
    public readonly order!: IOrders;

    public get isPaidStatus(): boolean {
        return this.order.paymentState === EOrderStatus.PAID;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.order-card {
    display: grid;
    grid-template-columns: 0.75fr 1.15fr 1fr 1.4fr 1.25fr 1.4fr 1.5fr;
    grid-gap: 17px;
    padding: 15px 10px;
    @include media-lg {
        display: flex;
        flex-direction: column;
        grid-gap: unset;
        padding: 15px 15px 20px 15px;
    }
    &__col {
        &:not(:last-child) {
            @include media-lg {
                margin-bottom: 15px;
            }
        }
    }
    .description {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        line-height: 18px;
        &__caption {
            text-transform: uppercase;
            font-size: 12px;
            font-weight: 600;
            line-height: 18px;
            color: #000;
            margin-bottom: 5px;
        }
        &__link {
            color: $color-pink;
        }
        &__wait {
            color: $color-search-bg;
        }
    }
}

.actions {
    &__btn {
        display: block;
        width: 100%;
        @include media-lg {
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
            padding: 9px 0;
        }
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .description {
        &__caption {
            margin-bottom: 0;
        }
    }
}
</style>
