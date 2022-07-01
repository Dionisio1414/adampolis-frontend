<template>
    <div class="basket-card">
        <div class="basket-card__col">
            <div class="caption caption--bold">{{ item.product.name }}</div>
            <div class="code">{{ $t('BasketPage.basketBlock.productCodeText') }}: {{ item.product.code }}</div>
        </div>
        <!-- <div class="basket-card__col">
            <div class="caption caption--bold">
                {{ $t('BasketPage.basketBlock.table.header.warehouse') }}
            </div>
            <div class="caption">V. Bernotėno g. 5, Radviliškis</div>
        </div> -->
        <div class="basket-card__col">
            <InputProductsCounter 
                class="quantity-counter" 
                :minValue="1" 
                v-model="quantity" 
                @input="counterHandler"
            >
            </InputProductsCounter>
        </div>
        <div class="basket-card__col d-md-none d-lg-block">
            <div class="price">{{ $n(unitPrice, 'currency') }}</div>
        </div>
        <div class="basket-card__col d-md-none d-lg-block">
            <div class="price price--accent">{{ $n(item.total, 'currency') }}</div>
        </div>
        <div class="basket-card__col">
            <button type="button" class="remove d-md-none d-lg-block" @click="remove">
                <i class="icon icon--remove"></i>
            </button>

            <div class="basket-card__footer d-flex d-lg-none">
                <div class="actions">
                    <button type="button" class="actions__remove" @click="remove">
                        {{ $t('BasketPage.basketBlock.btnDeleteText') }}
                    </button>
                </div>
                <div class="prices">
                    <div class="prices__label">
                        <div class="label">{{ $t('BasketPage.basketBlock.table.header.pricePerUnit') }}:</div>
                        <div class="label">{{ $t('BasketPage.basketBlock.table.header.price') }}:</div>
                    </div>
                    <div class="prices__digit">
                        <div class="digit">{{ $n(item.taxes, 'currency') }}</div>
                        <div class="digit digit--accent">{{ $n(item.total, 'currency') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'nuxt-property-decorator';
import InputProductsCounter from '~/components/InputProductsCounter.vue';
import { ICartItem, ICartProductChangeData } from '~/types/cart.interface';

@Component({
    components: { InputProductsCounter }
})
export default class ComponentBasketCard extends Vue {
    @Prop() public item!: ICartItem;

    public quantity: number = 0;

    public get unitPrice(): number {
        return this.item.taxes / this.item.quantity;
    }

    @Emit('removeItem')
    public remove(): number {
        return this.item.id;
    }

    @Emit('changeItem')
    public counterHandler(): ICartProductChangeData {
        return { 
            quantity: this.quantity, 
            id: this.item.id 
        };
    }

    public mounted(): void { this.quantity = this.item.quantity; }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.basket-card {
    display: grid;
    grid-template-columns: 35% repeat(auto-fit, minmax(100px, 1fr));
    padding: 20px;
    @include media-lg {
        padding: 15px;
        grid-template-columns: 100%;
    }
    &__col {
        &:not(:last-child) {
            @include media-lg {
                margin-bottom: 25px;
            }
        }
        &:nth-child(3) {
            @include media-lg {
                margin-bottom: 15px;
            }
        }
    }
    &__footer {
        justify-content: space-between;
        flex-wrap: wrap;
    }
}

.remove {
    background: transparent;
    border: none;
    padding: 0;
    margin-left: auto;
    cursor: pointer;
}
.price {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    color: $color-dark-blue;
    &--accent {
        color: $color-pink;
    }
}

.actions {
    &__remove {
        background: transparent;
        border: none;
        padding: 0;
        font-size: 12px;
        line-height: 17px;
        text-decoration: underline;
        color: $color-pink;
    }
}

.caption {
    font-size: 14px;
    line-height: 22px;
    color: #000;
    &--bold {
        font-weight: bold;
        line-height: 19px;
        margin-bottom: 10px;
        color: $color-dark-blue;
        @include media-lg {
            line-height: 1;
            margin-bottom: 5px;
        }
    }
}

.quantity-counter {
    max-width: 96px;
}

.prices {
    display: flex;
    font-weight: bold;
    text-align: right;
    line-height: 19px;
    color: $color-dark-blue;
    &__label {
        margin-right: 5px;
    }
}

.icon {
    width: 24px;
    height: 24px;
}

.digit {
    &--accent {
        color: $color-pink;
    }
}
</style>
