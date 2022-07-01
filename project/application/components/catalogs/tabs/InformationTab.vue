<template>
    <div class="information-tab tab-content__item">
        <div class="information-tab__wrapper">
            <div class="information-tab__table-container">
                <table class="table information-tab__table">
                    <tbody>
                        <tr v-for="(val, index) in attributes" :key="index">
                            <td>{{ val.name }}</td>
                            <td>{{ val.value }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="information-tab__content">
                <div class="information-tab__caption">Montavimo pusės</div>
                <div class="information-tab__images">
                    <img
                        :src="require(`@/assets/images/arrow-left-circle.svg`)"
                        alt=""
                        class="information-tab__image img-responsive"
                    />
                    <img
                        :src="require(`@/assets/images/arrow-down-circle.svg`)"
                        alt=""
                        class="information-tab__image img-responsive"
                    />
                    <img
                        :src="require(`@/assets/images/arrow-right-circle.svg`)"
                        alt=""
                        class="information-tab__image img-responsive"
                    />
                    <img
                        :src="require(`@/assets/images/arrow-up-circle.svg`)"
                        alt=""
                        class="information-tab__image img-responsive"
                    />
                </div>
                <div class="information-tab__subcaption" v-if="productData && productData.displayName">{{ $sanitize($t('MainProduct.tecdocNameLabel')) }}: {{ productName }}</div>
                <ul class="information-tab__list">
                    <!-- <li class="information-tab__item">32310A</li> -->
                    <!-- <li class="information-tab__item">528983B</li> -->
                    <li class="information-tab__item" v-if="productData && productData.manufacturer">{{ productData.manufacturer.name }}</li>
                    <!-- <li class="information-tab__item">Montavimo tipas: sumontuota</li> -->
                    <!-- <li class="information-tab__item">epimas: su nuolatiniu tepimu</li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import { ICatalogAttributes } from '~/types/catalog.interface';
import { IProductInner } from '~/types/product.interface';

@Component({})
export default class InformationTab extends Vue {
    @InjectReactive('CATALOG_PRODUCT_ATTRIBUTES') public attributes!: ICatalogAttributes[] | null;
    @InjectReactive('CATALOG_PRODUCT_DATA') public productData!: IProductInner;

    public get productName(): string {
        if(this.productData?.tecDocName) {
            return this.productData?.tecDocName;
        }

        return this.productData.displayName;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.information-tab {
    &__wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    &__table-container {
        flex: 0 1 calc(57% - 60px);
    }

    &__table {
        tr {
            &:nth-child(odd) {
                background: $color-light-grey;
            }
            td {
                font-size: 14px;
                line-height: 22px;
                padding: 7px 10px;
                color: $color-default;
                &:first-child {
                    font-weight: 600;
                    color: $color-dark-blue;
                }

                &:last-child {
                    width: 53%;
                }
            }
        }
    }

    &__content {
        flex: 0 1 calc(50% - 60px);
    }

    &__caption {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        margin-bottom: 20px;
        color: $color-dark-blue;
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
</style>
