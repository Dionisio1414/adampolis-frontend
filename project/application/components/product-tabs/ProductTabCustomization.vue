<template>
    <div class="product-tab-customization tab-content__item">
        <div class="product-tab-customization__wrapper">
            <CatalogAccordion v-for="(val, index) in vehicles" :key="index">
                <template #title>{{ val.manufacturer }}</template>
                <template #content>
                    <div class="product-tab-customization__list">
                        <div class="product-tab-customization__item" v-for="item in vehicles.length" :key="item">
                            <div class="product-tab-customization__caption">
                                {{ tabCaption(val) }}
                            </div>
                            <div class="product-tab-customization__description">
                                <span class="product-tab-customization__code">{{ $t('ProductInner.engineCode') }}:</span>
                                {{ val.model }}
                            </div>
                        </div>
                    </div>
                </template>
            </CatalogAccordion>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import CatalogAccordion from '@/components/catalogs/CatalogAccordion.vue';
import { IProductInnerVehicle } from '~/types/product.interface';

@Component({
    components: { CatalogAccordion }
})
export default class ComponentProductTabCustomization extends Vue {
    @InjectReactive('PRODUCT_INNER_VEHICLES')
    public vehicles!: IProductInnerVehicle[] | [];

    public tabCaption(vehicle: IProductInnerVehicle): string {
        const caption: string = `${vehicle?.manufacturer} (${vehicle?.model}, ${vehicle?.type}) ${vehicle?.yearFrom} ${vehicle?.powerKw}kw ${vehicle?.powerHp}hp`;
        return caption || '';
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product-tab-customization {
    padding: 30px 0 0 0;

    &__wrapper {
        overflow-x: hidden;
        overflow-y: auto;
    }

    &__list {
        margin-left: 10px;
    }

    &__item {
        border-bottom: 1px solid $color-grey;
        padding-bottom: 10px;

        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }

    &__caption,
    &__description {
        font-size: 14px;
        line-height: 19px;
    }

    &__code {
        color: $color-search-bg;
    }
}

@media (min-width: $breakpoint-lg) {
    .product-tab-customization {
        padding: 30px;
        &__list {
            margin-left: 16px;
        }
    }
}
</style>
