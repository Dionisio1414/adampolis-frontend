<template>
    <div class="product-tab-items tab-content__item">
        <div class="product-tab-items__wrapper">
            <div class="product-tab-items__table">
                <div 
                    class="product-tab-items__row"
                    v-for="(val, index) in stock"
                    :key="index"
                >
                    <div class="product-tab-items__header text text--xs text--bold">{{ val.location.name }}</div>
                    <div>
                        <div class="product-tab-items__cell">
                            <div></div>
                            <div>{{ val.stock }} vnt.</div>
                        </div>
                    </div>
                </div>

                <!-- <div class="product-tab-items__row">
                    <div class="product-tab-items__header text text--xs text--bold">Vilnius</div>
                    <div>
                        <div class="product-tab-items__cell product-tab-items__cell--border-bottom">
                            <div>Vairo g. 11</div>
                            <div>27 vnt.</div>
                        </div>
                        <div class="product-tab-items__cell">
                            <div>Vairo g. 11</div>
                            <div>2 vnt.</div>
                        </div>
                    </div>
                </div>
                <div class="product-tab-items__row">
                    <div class="product-tab-items__header text text--xs text--bold">Radviliškis</div>
                    <div>
                        <div class="product-tab-items__cell">
                            <div>V. Bernotėno g. 5</div>
                            <div>6 vnt.</div>
                        </div>
                    </div>
                </div>
                <div class="product-tab-items__row">
                    <div class="product-tab-items__header text text--xs text--bold">Mažeikiai</div>
                    <div>
                        <div class="product-tab-items__cell">
                            <div>Gamyklos g. 33</div>
                            <div>15 vnt.</div>
                        </div>
                    </div>
                </div>
                <div class="product-tab-items__row">
                    <div class="product-tab-items__header text text--xs text--bold">Tauragė</div>
                    <div>
                        <div class="product-tab-items__cell">
                            <div>J. Tumo - Vaižganto g. 116 (Prekybos bankas)</div>
                            <div>18 vnt.</div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import { IProductInnerFile } from '~/types/product.interface';
@Component({})
export default class ComponentProductTabItems extends Vue {
    @InjectReactive('PRODUCT_INNER_STOCK')
    public stock!: IProductInnerFile[] | [];
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product-tab-items {
    padding: 0 0 0 0;
    &__wrapper {
        padding: 0px;
    }

    &__caption {
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        margin-bottom: 20px;
        color: $color-dark-blue;
    }

    &__row {
        display: grid;
        grid-template-columns: 100%;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid $color-lightest-grey;

        &:not(:last-child) {
            margin-bottom: 10px;
        }

        &:first-child {
            align-items: flex-start;
        }

        &:last-child {
            border-bottom: none;
        }
    }

    &__cell {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;

        &:first-child {
            padding-top: 15px;
        }

        &--border-bottom {
            border-bottom: 1px solid $color-lightest-grey;
            padding-top: 0;
        }
    }

    &__header {
        color: $color-dark-blue;
        padding-top: 20px;
    }
}

@media (min-width: $breakpoint-lg) {
    .product-tab-items {
        padding: 15px;

        &__wrapper {
            padding: 10px;
        }

        &__cell {
            &:first-child {
                padding-top: 0;
            }

        }

        &__row {
            grid-template-columns: 24% 1fr;
        }

        &__header {
            color: $color-dark-blue;
            padding-top: 0;
        }
    }
}
</style>
