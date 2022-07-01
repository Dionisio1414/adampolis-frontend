<template>
    <div 
        class="catalog-filter" 
        :class="{ 
            'catalog-filter--open': isOpenMobile ,
            'catalog-filter--disabled': statusDisabled
        }"
    >
        <div class="catalog-filter__mobile" @click="openMobileFilter">
            <span>
                {{ isOpenMobile ? 'Filtrai' : 'Pasirinkite automobilį' }}
            </span>
            <i v-if="!isOpenMobile" class="catalog-filter__icon icon icon--filter-black"></i>
            <i v-else class="catalog-filter__icon icon icon--close" @click.stop="closeMobileFilter"></i>
        </div>
        <div class="catalog-filter__tabs">
            <div class="catalog-filter__tab" v-if="manufacturers && manufacturers.length">
                <Accordion>
                    <template #title>Gamintojai</template>
                    <template #content>
                        <FilterManufacturersList 
                            :manufacturers="manufacturers"
                            @update-manufacturers="updateManufacturers"
                        >
                        </FilterManufacturersList>
                    </template>
                </Accordion>
            </div>
            <template v-if="attributes && attributes.length">
                <div 
                    class="catalog-filter__tab"
                    v-for="(val, index) in attributes"
                    :key="index"
                >
                    <FilterAttributesControl 
                        :attribute="val"
                        @update-attributes="updateAttributes"
                    >
                    </FilterAttributesControl>
                </div>
            </template>

            <div class="catalog-filter__tab">
                <div class="form-group">
                    <input 
                        id="category" 
                        type="checkbox" 
                        class="form-checkbox"
                        @change="updateRemnantsProducts"
                    >
                    <label for="category" class="form-label">
                        <div class="label">{{ $t('CatalogPage.SidebarFilter.remnantsText') }}</div>
                    </label>
                </div>
            </div>
            <div class="catalog-filter__tab">
                <button type="button" class="btn btn--default btn--inline-flex btn btn--delete" @click="clearFilter">
                    <i class="icon icon--delete"></i>
                    {{ $t('CatalogPage.SidebarFilter.clearFiltersText') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive, Emit } from 'nuxt-property-decorator';
import MobileRange from '~/components/MobileRange.vue';
import CatalogCategoryList from '~/components/catalogs/filters/CatalogCategoryList.vue';
import Accordion from '~/components/Accordion.vue';
import { ICatalogAttributes, ICatalogManufacturers } from '~/types/catalog.interface';
import FilterManufacturersList from './FilterManufacturersList.vue';
import FilterAttributesControl from './FilterAttributesControl.vue';
import { EStatus } from '~/constants/status';

@Component({
    components: {
        MobileRange,
        CatalogCategoryList,
        Accordion,
        FilterManufacturersList,
        FilterAttributesControl
    }
})
export default class ComponentCatalogFilter extends Vue {
    @InjectReactive('CATALOG_MANUFACTURERS') public manufacturers!: ICatalogManufacturers[] | [];
    @InjectReactive('CATALOG_ATTRIBUTES') public attributes!: ICatalogAttributes[] | [];
    @InjectReactive('CATALOG_STATUS') public status!: EStatus;
    
    public isToggleTab: boolean = false;
    public isOpenMobile: boolean = false;

    public get statusDisabled(): boolean {
        return !!(this.status === EStatus.PROCESSING);
    }

    public toggleTab(): void {
        this.isToggleTab = !this.isToggleTab;
    }

    @Emit()
    public updateManufacturers(): void {}

    @Emit()
    public updateAttributes(): void {}

    @Emit()
    public clearFilter(): void {}

    @Emit()
    public updateRemnantsProducts(event: Event): boolean {
        return (event.target as HTMLInputElement).checked;
    }

    public openMobileFilter(): void {
        this.isOpenMobile = true;
    }

    public closeMobileFilter(): void {
        this.isOpenMobile = false;
    }

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.catalog-filter {
    position: relative;
    border-radius: 4px;
    box-shadow: 0 2px 5px 0 rgba($color-black, 0.15);
    overflow: hidden;
    &--disabled {
        pointer-events: none;
        &::before {
            content: "";
            background: rgba(255, 255, 255, 0.8);
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            z-index: 100;
        }
    }
    &__tab {
        background: $color-white;
        padding: 20px;
        border-bottom: 1px solid $color-grey;
        &:last-child {
            text-align: center;
        }
    }

    &__mobile {
        display: none;
    }

    &__icon {
        width: 24px;
        height: 24px;
    }
}

@include media-lg {
    .catalog-filter {
        background: $color-white;
        padding: 15px;
        margin-bottom: 20px;

        &--open {
            position: fixed;
            box-sizing: border-box;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            z-index: 1100;
            background: $color-white;
            overflow-y: auto;
            padding: 0;

            .catalog-filter {
                &__tabs {
                    display: block;
                }

                &__mobile {
                    padding: 20px;
                    border-bottom: 1px solid $color-grey;
                    font-size: 18px;
                }
            }
        }

        &__mobile {
            display: flex;
            justify-content: space-between;
            color: $color-dark-blue;
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 0;
            line-height: 22px;
        }

        &__tabs {
            display: none;
        }
    }
}
</style>
