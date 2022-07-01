<template>
    <div class="customization-tab tab-content__item">
        <div class="customization-tab__wrapper">
            <catalog-accordion v-for="(val, index) in vehicles" :key="index">
                <template #title>{{ val.manufacturer }}</template>
                <template #content>
                    <div class="customization-tab__list">
                        <div class="customization-tab__item" v-for="item in vehicles.length" :key="item">
                            <div class="customization-tab__caption">
                                <!-- AUDI A4 (8D2, B5) 1.6 1994-2000 74kw 100hp -->
                                {{ tabCaption(val) }}
                            </div>
                            <div class="customization-tab__description">
                                <span class="customization-tab__code">{{ $t('CatalogPage.CarDetails.engineСode') }}:</span>
                                {{ val.model }}
                            </div>
                        </div>
                    </div>
                </template>
            </catalog-accordion>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import CatalogAccordion from '@/components/catalogs/CatalogAccordion.vue';
import { ICatalogVehicle } from '~/types/catalog.interface';

@Component({
    components: { CatalogAccordion }
})
export default class CustomizationTab extends Vue {
    @InjectReactive('CATALOG_PRODUCT_VEHICLES')
    public vehicles!: ICatalogVehicle[] | [];

    public tabCaption(vehicle: ICatalogVehicle): string {
        const caption: string = `${vehicle?.manufacturer} (${vehicle?.model}, ${vehicle?.type}) ${vehicle?.yearFrom} ${vehicle?.powerKw}kw ${vehicle?.powerHp}hp`;
        return caption || '';
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.customization-tab {
    &__wrapper {
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 320px;
    }

    &__list {
        margin-left: 16px;
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
</style>
