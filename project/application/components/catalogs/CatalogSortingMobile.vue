<template>
    <div class="catalog-sorting-mobile">
        <div class="catalog-sorting-mobile__actions d-flex d-lg-none">
            <div class="catalog-sorting-mobile__item">
                <multiselect
                    class="form-control catalog-sorting-mobile__form-control"
                    v-model="form['sort']"
                    :allow-empty="true"
                    :options="sortByOptions"
                    :placeholder="$t('CatalogPage.Sorting.sortByOptions.placeholder')"
                    :custom-label="customLabelSort"
                    @select="updateSortBy"
                >
                    <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                </multiselect>
            </div>
            <div class="catalog-sorting-mobile__item">
                <multiselect
                    class="form-control catalog-sorting-mobile__form-control"
                    v-model="form['limit']"
                    :allow-empty="true"
                    :options="sortItemsOptions"
                    @select="updateLimit"
                >
                    <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                </multiselect>
            </div>
        </div>
        <!-- <transition name="fade">
            <div v-if="getCatalogStatus" class="spinner">
                <Spinner></Spinner>
            </div>
        </transition> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive, Emit } from 'nuxt-property-decorator';
import Multiselect from 'vue-multiselect';
import { ICatalogMeta, ICatalogTaxon } from '~/types/catalog.interface';
import Spinner from '~/components/Spinner.vue';
import { EStatus } from '~/constants/status';
import storeFormMapper from '~/utils/store-form-mapper';

@Component({
    components: { Multiselect, Spinner }
})
export default class CatalogSortingMobile extends Vue {
    @InjectReactive('CATALOG_TAXON') public taxon!: ICatalogTaxon;
    @InjectReactive('CATALOG_META') public meta!: ICatalogMeta;
    @InjectReactive('CATALOG_STATUS') public catalogStatus!: EStatus;

    public sortByOptions: string[] = ['desc', 'asc'];
    public sortItemsOptions: number[] = [5, 10, 15, 20, 25];

    public get taxonName(): string {
        return (this.taxon as ICatalogTaxon).name ? (this.taxon as ICatalogTaxon).name : ''; 
    }

    public get metaCurrentCount(): number {
        if((this.meta as ICatalogMeta).limit >= (this.meta as ICatalogMeta).totalCount) {
            return (this.meta as ICatalogMeta).totalCount;
        } 

        return (this.meta as ICatalogMeta)?.limit;
    }

    public get metaTotalCount(): number {
        return (this.meta as ICatalogMeta)?.totalCount ? (this.meta as ICatalogMeta)?.totalCount : 0; 
    }
    
    public customLabelSort(value: string): string | null {
        switch(value) {
            case 'asc':
                return this.$t('CatalogPage.Sorting.sort.priceLowToHigh').toString();
            case 'desc':
                return this.$t('CatalogPage.Sorting.sort.priceHighToLow').toString()
            default:
                return null;
        }
    }

    public get getCatalogStatus(): boolean {
        return this.catalogStatus === EStatus.PROCESSING;
    }

    public get form(): any {
        return storeFormMapper({
            store: this.$store,
            getter: 'page-catalog-form/formValue',
            action: 'page-catalog-form/setFormField',
            fields: ['sort', 'limit']
        });
    }

    @Emit()
    public updateLimit(): void {}

    @Emit()
    public updateSortBy(): void {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.spinner {
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

.catalog-sorting-mobile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    &__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 0 1 100%;
    }

    &__item {
        &:first-child {
            flex: 0 1 71%;
            margin-right: 10px;
        }
        &:last-child {
            flex: 0 1 29%;
        }
    }
}
</style>
