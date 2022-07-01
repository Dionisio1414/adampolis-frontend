<template>
    <div
        class="analog-card__item"
        :class="{ 'analog-card__item--active': active }"
    >
        <div class="analog-card__price">{{ $n(analog.priceWithoutTax, 'currency') }}</div>
        <div class="analog-card__info">
            <div class="analog-card__picture-container">
                <div 
                    v-if="isImage" 
                    class="analog-card__picture"
                >
                    <img
                        class="img-responsive"
                        :src="analog.manufacturer.image"
                        :alt="analog.manufacturer.name"
                    >
                </div>
            </div>
            <div class="analog-card__text">{{ stockTotal }} {{ $t('MainProduct.quantity') }}.</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { IProductInner } from '~/types/product.interface';

@Component({})
export default class ComponentAnalogsListItem extends Vue {
    @Prop() public analog!: IProductInner;
    @Prop() public active!: boolean;

    public get stockTotal(): number {
        return this.analog?.stockTotal >= 0 && this.analog?.stockTotal ? this.analog.stockTotal : 0;
    }

    public get isImage(): boolean {
        return !!(this.analog?.manufacturer?.image);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/triangle';

.analog-card {
    &__item {
        position: relative;
        background: $color-white;
        display: flex;
        align-items: stretch;
        border-radius: 4px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);
        border: 2px solid transparent;
        min-height: 40px;
        cursor: pointer;
        &:not(:last-child) {
            margin-bottom: 10px;
        }

        &--active {
            border-color: $color-accent-orange;
            &::before {
                content: '';
                position: absolute;
                right: 100%;
                top: 50%;
                transform: translateY(-50%);
                @include css-triangle(left, $color-accent-orange, 17px, 10px);
            }

            .analog-card__price {
                background: $color-accent-orange;
            }
        }
    }

    &__price {
        display: inline-flex;
        align-items: center;
        background: $color-light-grey;
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        padding: 0 17px;
        flex: 0 1 35%;
        margin: -2px 0 -2px -2px;
        border-radius: 4px 0 0 4px;
        color: $color-dark-blue;
    }

    &__text {
        flex: 0 1 50%;
        font-size: 12px;
        line-height: 18px;
        text-align: right;
        color: $color-default;
    }

    &__picture-container {
        flex: 0 1 50%;
    }

    &__picture {
        max-width: 100px;
    }

    &__info {
        display: flex;
        align-items: center;
        flex: 0 1 65%;
        padding: 0 10px;
    }
    
}
</style>