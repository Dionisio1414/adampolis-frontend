<template>
    <div class="catalog-card-detail">
        <Tabs :current-index="currentIndex" :tabs="tabItems" @change="changeTab"></Tabs>
        <div class="catalog-card-detail__content">
            <keep-alive>
                <component :is="currentTabComponent"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import { Tabs } from '~/components';
import InformationTab from './tabs/InformationTab.vue';
import DocumentsTab from './tabs/DocumentsTab.vue';
import CustomizationTab from './tabs/CustomizationTab.vue';
import CompleteGoodsTab from './tabs/CompleteGoodsTab.vue';
import AdditionalArticlesTab from './tabs/AdditionalArticlesTab.vue';
import { ICatalogProductAttribute, ICatalogProductFiles, ICatalogVehicle } from '~/types/catalog.interface';
import { IProductInner } from '~/types/product.interface';

@Component({
    components: {
        InformationTab,
        DocumentsTab,
        CustomizationTab,
        CompleteGoodsTab,
        AdditionalArticlesTab,
        Tabs
    }
})
export default class CatalogCardDetail extends Vue {
    @InjectReactive('CATALOG_PRODUCT_ATTRIBUTES') public attributes!: ICatalogProductAttribute[] | [];
    @InjectReactive('CATALOG_PRODUCT_VEHICLES') public vehicles!: ICatalogVehicle[] | [];
    @InjectReactive('CATALOG_PRODUCT_FILES') public files!: ICatalogProductFiles[] | [];
    @InjectReactive('CATALOG_PRODUCT_SET') public set!: IProductInner[] | [];
    @InjectReactive('CATALOG_ADDITIONAL_ARTICLES') public additionalArticles!: string | null;

    public currentIndex: number = 0;

    public get tabs(): string[] {
        const result: string[] = [];
        
        if(this.attributes && this.attributes.length) result.push('InformationTab');
        if(this.files && this.files.length) result.push('DocumentsTab');
        if(this.vehicles && this.vehicles.length) result.push('CustomizationTab');
        if(this.set && this.set.length) result.push('CompleteGoodsTab');
        if(this.additionalArticles) result.push('AdditionalArticlesTab');
        
        return result;
    }

    public get tabItems(): string[] {
        const result: string[] = [];

        if(this.attributes && this.attributes.length) result.push('CatalogPage.ProductCard.tabs.informationTabText');
        if(this.files && this.files.length) result.push('CatalogPage.ProductCard.tabs.documentsTabText');
        if(this.vehicles && this.vehicles.length) result.push('CatalogPage.ProductCard.tabs.customizationTabText');
        if(this.set && this.set.length) result.push('CatalogPage.ProductCard.tabs.completeGoodsTabText');
        if(this.additionalArticles) result.push('CatalogPage.ProductCard.tabs.additionalArticlesTabText');

        return result;
    }

    public get currentTabComponent(): string {
        return this.tabs[this.currentIndex];
    }

    public changeTab(index: number): void {
        this.currentIndex = index;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.catalog-card-detail {
    border-radius: 0 0 4px 4px;

    &__content {
        .tab-content__item {
            padding: 20px;
        }
    }
}
</style>
