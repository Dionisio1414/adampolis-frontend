<template>
    <div class="product-details">
        <Tabs :current-index="currentIndex" :tabs="tabItems" @change="changeTab"></Tabs>
        <div class="product-details__content">
            <keep-alive>
                <component 
                    :is="currentTabComponent"
                >
                </component>
            </keep-alive>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import { Tabs } from '~/components';
import {
    ProductTabInformation,
    ProductTabCustomization,
    ProductTabDocuments,
    ProductTabSetItems,
    ProductTabDelivery,
    ProductTabItems,
    ProductTabAdditionalArticles
} from '~/components/product-tabs';
import { IProductInner, IProductInnerAttribute, IProductInnerFile, IProductInnerVehicle } from '~/types/product.interface';

@Component({
    components: {
        Tabs,
        ProductTabInformation,
        ProductTabCustomization,
        ProductTabDocuments,
        ProductTabSetItems,
        ProductTabDelivery,
        ProductTabItems,
        ProductTabAdditionalArticles
    }
})
export default class ComponentProductDetails extends Vue {
    @InjectReactive('PRODUCT_INNER_ATTRIBUTES') public attributes!: IProductInnerAttribute[] | [];
    @InjectReactive('PRODUCT_INNER_VEHICLES') public vehicles!: IProductInnerVehicle[] | [];
    @InjectReactive('PRODUCT_INNER_FILES') public files!: IProductInnerFile[] | [];
    @InjectReactive('PRODUCT_INNER_STOCK') public stock!: IProductInnerFile[] | [];
    @InjectReactive('PRODUCT_INNER_SET') public set!: IProductInner[] | [];
    @InjectReactive('PRODUCT_INNER_ADDITIONAL_ARTICLES') public additionalArticles!: string | null;

    public currentIndex: number = 0;

    public get tabs(): string[] {
        let result: string[] = [];
        
        if(this.attributes && this.attributes.length) result.push('ProductTabInformation');
        if(this.files && this.files.length) result.push('ProductTabDocuments');
        if(this.vehicles && this.vehicles.length) result.push('ProductTabCustomization');
        if(this.stock && this.stock.length) result.push('ProductTabItems');
        if(this.set && this.set.length) result.push('ProductTabSetItems');
        if(this.additionalArticles) result.push('ProductTabAdditionalArticles');

        return result;
    }

    public get tabItems(): string[] {
        let result: string[] = [];

        if(this.attributes && this.attributes.length) result.push('ProductTabs.informationTabText');
        if(this.files && this.files.length) result.push('ProductTabs.documentsTabText');
        if(this.vehicles && this.vehicles.length) result.push('ProductTabs.customizationTabText');
        if(this.stock && this.stock.length) result.push('ProductTabs.itemsTabText');
        if(this.set && this.set.length) result.push('ProductTabs.setItemsTabText');
        if(this.additionalArticles) result.push('ProductTabs.additionalArticlesTabText');

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

.product-details {
    border-radius: 0 0 4px 4px;

    &__content {
        background: $color-white;
        border-left: 1px solid rgba($color-grey, $alpha: 0.6);
        border-right: 1px solid rgba($color-grey, $alpha: 0.6);
        border-bottom: 1px solid rgba($color-grey, $alpha: 0.6);
    }
}
</style>
