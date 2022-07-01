<template>
    <div class="product-tab-information tab-content__item">
        <div class="product-tab-information__wrapper">
            <div class="product-tab-information__table-container">
                <div class="product-tab-information__caption">{{ $t('ProductInner.productFeatures') }}</div>
                <table class="table product-tab-information__table">
                    <tbody>
                        <tr v-for="(val, index) in attributes" :key="index">
                            <td>{{ val.name }}</td>
                            <td>{{ val.value }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="product-tab-information__content">
                <div class="product-tab-information__caption product-tab-information__caption--second">
                    {{ $t('ProductInner.mountingSides') }}
                </div>
                <div class="product-tab-information__images">
                    <img
                        :src="require(`@/assets/images/arrow-left-circle.svg`)"
                        alt=""
                        class="product-tab-information__image img-responsive"
                    />
                    <img
                        :src="require(`@/assets/images/arrow-down-circle.svg`)"
                        alt=""
                        class="product-tab-information__image img-responsive"
                    />
                    <img
                        :src="require(`@/assets/images/arrow-right-circle.svg`)"
                        alt=""
                        class="product-tab-information__image img-responsive"
                    />
                    <img
                        :src="require(`@/assets/images/arrow-up-circle.svg`)"
                        alt=""
                        class="product-tab-information__image img-responsive"
                    />
                </div>
                <div class="product-tab-information__subcaption" v-if="productData.displayName">TECDOC: {{ productData.displayName }}</div>
                <ul class="product-tab-information__list">
                    <!-- <li class="product-tab-information__item">32310A</li> -->
                    <!-- <li class="product-tab-information__item">528983B</li> -->
                    <li class="product-tab-information__item" v-if="productData.manufacturer.name">{{ productData.manufacturer.name }}</li>
                    <!-- <li class="product-tab-information__item">Montavimo tipas: sumontuota</li> -->
                    <!-- <li class="product-tab-information__item">Tepimas: su nuolatiniu tepimu</li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import { IProductInner, IProductInnerAttribute } from '~/types/product.interface';
@Component({})
export default class ComponentProductTabInformation extends Vue {
    @InjectReactive('PRODUCT_INNER_ATTRIBUTES') public attributes!: IProductInnerAttribute[] | null;
    @InjectReactive('PRODUCT_DATA') public productData!: IProductInner;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product-tab-information {
    padding: 20px 0 0 0;

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    &__table-container {
        flex: 0 1 calc(53% - 60px);
    }

    &__table {
        tr {
            &:nth-child(odd) {
                background: $color-light-grey;
            }
            td {
                font-size: 12px;
                line-height: 20px;
                padding: 7px 10px;
                color: $color-default;
                &:first-child {
                    font-weight: 600;
                    color: $color-dark-blue;
                }

                &:last-child {
                    width: 51%;
                }
            }
        }
    }

    &__content {
        flex: 0 1 calc(51% - 60px);
    }

    &__caption {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        margin-bottom: 20px;
        color: $color-dark-blue;

        &--second {
            margin-top: 30px;
            font-size: 14px;
            margin-bottom: 7px;
        }
    }

    &__images {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    &__image {
        &:not(:last-child) {
            margin-right: 5px;
        }
    }

    &__subcaption {
        font-weight: 600;
        margin-bottom: 10px;
        color: $color-dark-blue;
    }

    &__item {
        font-size: 12px;
        line-height: 18px;
    }
}

@media (min-width: $breakpoint-lg) {
    .product-tab-information {
        padding: 30px 30px 30px 30px;

        &__wrapper {
            flex-direction: row;
        }

        &__content {
            flex: 0 1 calc(54% - 60px);
        }

        &__caption {
            &--second {
                margin-top: 0px;
                margin-bottom: 20px;
                font-size: 16px;
            }
        }

        &__table {
            tr {
                td {
                    font-size: 14px;

                    &:last-child {
                        width: 51%;
                    }
                }
            }
        }
    }
}
</style>
