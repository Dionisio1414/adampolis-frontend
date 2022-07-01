<template>
    <div class="basket-main">
        <div class="basket-main__top">
            <div class="caption">
                {{ $t('BasketPage.basketBlock.basketLengthTitle') }}:
                <span class="caption__digit">{{ cartQuantity }}</span>
            </div>
        </div>
        <div class="basket-main__table">
            <div class="table-header">
                <div class="table-header__col">
                    {{ $t('BasketPage.basketBlock.table.header.product') }}
                </div>
                <!-- <div class="table-header__col">
                    {{ $t('BasketPage.basketBlock.table.header.warehouse') }}
                </div> -->
                <div class="table-header__col">
                    {{ $t('BasketPage.basketBlock.table.header.quantity') }}
                </div>
                <div class="table-header__col">
                    {{ $t('BasketPage.basketBlock.table.header.pricePerUnit') }}
                </div>
                <div class="table-header__col">
                    {{ $t('BasketPage.basketBlock.table.header.price') }}
                </div>
                <div class="table-header__col"></div>
            </div>
            <div class="table-body">
                <BasketCard
                    v-for="item in cartItems"
                    :key="item.id"
                    :item="item"
                    @removeItem="remove"
                    @changeItem="counterHanlder"
                >
                </BasketCard>
            </div>
        </div>
        <div class="basket-main__information">
            <div class="basket-main__information-col">
                <div class="picture"></div>
                <div class="description">
                    <strong class="description__bolder">{{ $t('BasketPage.basketBlock.freeText') }}</strong>
                    {{ $t('BasketPage.basketBlock.freeShippingText') }}
                    <strong class="description__bolder">100 €</strong>
                </div>
            </div>
            <div class="basket-main__information-col">
                <div class="price price-goods">
                    <span class="price-label">{{ $t('BasketPage.basketBlock.priceOfGoods') }}:</span>
                </div>
                <div class="price price-amount">
                    <span class="price-label">{{ $t('BasketPage.basketBlock.amountOfGoods') }}:</span>
                </div>
            </div>
            <div class="basket-main__information-col">
                <div class="price price-goods">
                    <span class="price-digit">{{ $n(priceWithoutTax, 'currency') }}</span>
                </div>
                <div class="price price-amount">
                    <span class="price-digit price-digit--accent">{{ $n(priceWithTax, 'currency') }}</span>
                </div>
            </div>
        </div>
        <div class="basket-main__actions">
            <NuxtLink to="/" class="btn btn--dark-grey basket-main__actions-btn">
                <i class="icon icon-arr-left--white"></i>
                {{ $t('BasketPage.basketBlock.btnMoreText') }}
            </NuxtLink>
            <button 
                @click="checkUserStatus" 
                class="btn btn--pink basket-main__actions-btn"
                :disabled="!isCartItems || cartStatus"
            >
                {{ $t('BasketPage.basketBlock.btnContinueText') }}
            </button>
        </div>
        <transition name="fade">
            <div v-if="cartStatus" class="spinner">
                <Spinner></Spinner>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'nuxt-property-decorator';
import BasketCard from './BasketCard.vue';
// import HeaderLoginPopup from '~/components/header/HeaderLoginPopup.vue';
import Spinner from '~/components/Spinner.vue';

import { ICartItem, ICartProductChangeData, ICartTotals } from '~/types/cart.interface';
// import { MODAL_CONFIG } from '~/constants/modalConfig';
import { EStatus } from '~/constants/status';

@Component({
    components: { BasketCard, Spinner }
})
export default class ComponentBasketBlock extends Vue {
    @Prop({ default: () => [] }) public cartItems!: ICartItem[];
    @Prop() public readonly cartQuantity!: number;
    @Prop() public cartTotals!: ICartTotals;
    @Prop() public readonly status!: EStatus;
    @Prop() public readonly isAuthorized!: boolean;

    public $modal: any;
    public localePath!: (value: string) => string;

    @Emit('removeItem')
    public remove(id: number): number {
        return id;
    }

    @Emit('changeItem')
    public counterHanlder(data: ICartProductChangeData): ICartProductChangeData {
        return data;
    }

    public get priceWithTax(): number {
        if(this.cartTotals && this.cartTotals.total) {
            return this.cartTotals.total;
        }

        return 0;
    }

    public get priceWithoutTax(): number {
        if(this.cartTotals && this.cartTotals.total && this.cartTotals.taxes) {
            return this.cartTotals.total - this.cartTotals.taxes;
        }

        return 0;
    }

    public get cartStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public get isCartItems(): boolean {
        return !!(this.cartItems.length);
    }

    // public checkUserStatus(): void {
    //     if (!this.isAuthorized) {
    //         this.$modal.show(
    //             HeaderLoginPopup,
    //             {
    //                 modal: this.$modal,
    //                 isCheckout: true
    //             },
    //             {
    //                 ...MODAL_CONFIG,
    //                 maxWidth: 388
    //             },
    //             {
    //                 'before-close': this.beforeClose
    //             }
    //         );
    //     } else {
    //         this.goToCheckout();
    //     }
    // }

    public checkUserStatus(): void {
        this.goToCheckout();
    }

    public goToCheckout(): void {
        this.$router.push(this.localePath('/checkout'));
    }

    // public beforeClose(modal: any): void {
    //     if (modal.params && modal.params.redirect) {
    //         this.goToCheckout();
    //     }
    // }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.spinner {
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

.basket {
    &-main {
        position: relative;
        background: $color-white;
        border-radius: 4px;
        border: 1px solid rgba(203, 208, 216, 0.6);
        padding: 30px;
        margin-bottom: 30px;
        @include media-lg {
            padding: 0;
        }
        &__top {
            margin-bottom: 20px;
            @include media-lg {
                padding: 20px 15px;
                margin-bottom: 0;
                border-bottom: 1px solid rgba(203, 208, 216, 0.6);
            }
        }
        &__table {
            margin-bottom: 35px;
            @include media-lg {
                margin-bottom: 20px;
            }
        }
        &__information {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 30px;
            @include media-lg {
                margin-bottom: 20px;
                padding: 0 15px;
            }
            &-col {
                &:first-child {
                    display: flex;
                    align-items: center;
                    flex: 0 1 calc(50% - 5px);
                    @include media-lg {
                        flex: 0 1 100%;
                        border-bottom: 1px solid rgba(203, 208, 216, 0.6);
                        padding-bottom: 20px;
                        margin-bottom: 20px;
                    }
                }
                &:nth-child(2) {
                    flex: 0 1 calc(42% - 5px);
                    @include media-lg {
                        flex: 0 1 calc(80% - 5px);
                    }
                }
                &:last-child {
                    flex: 0 1 calc(8% - 5px);
                    @include media-lg {
                        flex: 0 1 calc(20% - 5px);
                        .price {
                            text-align: right;
                        }
                    }
                }
            }
        }
        &__actions {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            @include media-lg {
                flex-direction: column-reverse;
                padding: 0 15px 15px 15px;
            }
        }
    }
}

.basket-main__actions-btn {
    &.btn--pink {
        min-width: 160px;
    }
    &.btn--dark-grey {
        padding-left: 25px;
        padding-right: 25px;
    }
    @include media-sm {
        flex: 0 1 100%;
    }
    &:not(:last-child) {
        @include media-lg {
            margin-top: 15px;
            margin-bottom: 15px;
        }
    }
}

.icon {
    width: 6px;
    height: 9px;
    margin-right: 2px;
}

.caption {
    font-size: 20px;
    font-weight: bold;
    line-height: 27px;
    &__digit {
        color: $color-pink;
    }
}

.table {
    &-header {
        display: grid;
        grid-template-columns: 35% repeat(auto-fit, minmax(100px, 1fr));
        background: $color-dark-grey;
        border-radius: 4px 4px 0 0;
        border: 1px solid rgba(203, 208, 216, 0.6);
        padding: 13px 20px;
        @include media-lg {
            display: none;
        }
        &__col {
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
            color: $color-dark-blue;
        }
    }
    &-body {
        border-left: 1px solid rgba(203, 208, 216, 0.6);
        border-right: 1px solid rgba(203, 208, 216, 0.6);
        border-bottom: 1px solid rgba(203, 208, 216, 0.6);
        border-radius: 0 0 4px 4px;
        @include media-lg {
            border-right: none;
            border-left: none;
            border-radius: 0;
        }
        .basket-card {
            &:not(:last-child) {
                border-bottom: 1px solid rgba(203, 208, 216, 0.6);
            }
        }
    }
}

.picture {
    background-image: url('~assets/images/truck.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 48px;
    height: 29px;
    margin-right: 20px;
    @include media-lg {
        background-size: contain;
        width: 98px;
        margin-right: 0;
    }
}

.description {
    max-width: 280px;
    @include media-lg {
        max-width: 100%;
        font-size: 12px;
        padding-left: 5px;
    }
}

.price {
    text-align: right;
    @include media-lg {
        text-align: unset;
    }
    &-goods {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;
        @include media-lg {
            margin-bottom: 0;
        }
    }
    &-amount {
        font-size: 20px;
        line-height: 27px;
    }
}

.price-digit {
    font-size: 14px;
    &--accent {
        font-size: 20px;
        font-weight: bold;
        color: $color-pink;
    }
}
</style>
