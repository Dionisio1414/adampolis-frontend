<template>
    <div class="catalog-sorting">
        <div class="catalog-sorting__info">
            <div class="catalog-sorting__caption">{{ taxonName }}</div>
            <div class="catalog-sorting__subcaption">
                <span class="catalog-sorting__text" v-show="!metaTotalCount">{{ $t('CatalogPage.Sorting.resultsText') }}:</span>
                <strong class="catalog-sorting__text--bold" v-show="metaTotalCount">{{ metaCurrentCount }}</strong>
                <span class="catalog-sorting__text" v-show="metaTotalCount">{{ $t('CatalogPage.Sorting.subcaptionDivider') }}</span>
                <strong class="catalog-sorting__text--bold">{{ metaTotalCount }}</strong>
            </div>
        </div>
        <div class="catalog-sorting__actions d-none d-lg-flex">
            <div class="catalog-sorting__item">
                <multiselect
                    class="form-control catalog-sorting__form-control"
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
            <div class="catalog-sorting__item">
                <multiselect
                    class="form-control catalog-sorting__form-control"
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
            <div v-if="isProcessing" class="spinner">
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
export default class ComponentCatalogSorting extends Vue {
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

    public get isProcessing(): boolean {
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
@import '~/assets/styles/mixins/media';

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

.catalog-sorting {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $color-white;
    border-radius: 4px;
    border: 1px solid $color-grey;
    padding: 20px;
    margin-bottom: 15px;

    &__info {
        flex: 0 1 calc(50% - 20px);
    }

    &__caption {
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        color: $color-dark-blue;
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 0 1 calc(50% - 20px);
    }

    &__item {
        &:first-child {
            flex: 0 1 185px;
            margin-right: 20px;
        }

        &:last-child {
            flex: 0 1 82px;
        }
    }

    &__form-control {
        ::v-deep {
            .multiselect__single {
                white-space: nowrap;
                max-width: 165px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}

@include media-md {
    .catalog-sorting {
        padding: 15px;
        margin-bottom: 20px;
    }
}
</style>
