<template>
    <div class="catalog-product-list">
        <!-- <div class="catalog-product-list__item">
            <catalog-accessories-card></catalog-accessories-card>
        </div> -->
        <div 
            class="catalog-product-list__item" 
            v-for="(val, index) in productsList" 
            :key="index"
        >
            <catalog-product-card
                :product="val"
            >
            </catalog-product-card>
        </div>
        <!-- <transition name="fade">
            <div v-if="getSumbitStatus" class="form-spinner">
                <Spinner />
            </div>
        </transition> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter } from 'nuxt-property-decorator';
import CatalogProductCard from './CatalogProductCard.vue';
import CatalogAccessoriesCard from './CatalogAccessoriesCard.vue';
import { ICatalog, ICatalogProducts } from '~/types/catalog.interface';
import { EStatus } from '~/constants/status';
import Spinner from '~/components/Spinner.vue';

@Component({
    components: {
        CatalogProductCard,
        CatalogAccessoriesCard,
        Spinner
    }
})
export default class CatalogProductList extends Vue {
    @Getter('page-catalog/getData') public catalogData!: ICatalog;
    @Getter('page-catalog/getStatus') public status!: EStatus;

    public get productsList(): ICatalogProducts[] | [] {
        return this.catalogData?.products || [];
    }

    public get getSumbitStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }
}
</script>

<style lang="scss" scoped>
.catalog-product-list {
    position: relative;
    margin-bottom: 30px;
    &__item {
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}

.form-spinner {
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
</style>
