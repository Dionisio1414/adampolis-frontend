<template>
    <main class="page page-search">
        <div class="container">
            <div class="row">
                <div class="col">
                    <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <VehicleFilter
                        :vehicleStatus="vehicleStatus"
                        :catalogStatus="catalogStatus"
                        :formValue="formValue"
                        :manufacturers="manufacturers"
                        :models="models"
                        :modifications="modifications"
                        :taxons="taxons"
                        @manufacturerChange="manufacturerChange"
                        @modelsChange="modelsChange"
                        @modificationChange="modificationChange"
                        @applyFilter="vehicleSubmitHandler"
                    >
                    </VehicleFilter>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <SearchResultBlock
                        :queryText="searchFormValue.q"
                        :totalCount="searchProductTotalCount"
                        :class="{
                            'mb-lg-80 mb-xs-80': !isProducts,
                            'mb-lg-20 mb-xs-20': isProducts,
                        }"
                    >
                    </SearchResultBlock>
                </div>
            </div>

            <div 
                v-if="isProducts"
                class="row mb-lg-20 mb-xs-20"
            >
                <div class="col">
                    <div 
                        class="page-search__list"
                        :class="{'mb-lg-20 mb-xs-20': isProducts}"
                    >
                        <div 
                            class="page-search__list-item"
                            v-for="(val, index) in searchProducts"
                            :key="index"
                        >
                            <CatalogProductCard
                                :product="val"
                            >
                            </CatalogProductCard>
                        </div>
                        <transition name="fade">
                            <div v-if="isProcessing" class="form-spinner">
                                <Spinner></Spinner>
                            </div>
                        </transition>
                    </div>
                    <Pagination
                        v-if="searchMeta && searchMeta.totalPages && searchMeta.totalPages > 1"
                        :totalPages="searchMeta.totalPages"
                        :currentPage="+searchFormValue.page"
                        :hideFirstAndLastPageLinks="true"
                        @onPageChange="onPageChange"
                    >
                    </Pagination>
                </div>
            </div>

            <template v-else>
                <div class="row mb-lg-30 mb-xs-30">
                    <div class="col">
                        <SearchCategoriesList :items="menuItemsList">
                            <template v-slot:card="{ card }">
                                <SearchCategoryCard
                                    :category="card"
                                >
                                </SearchCategoryCard>
                            </template>
                        </SearchCategoriesList>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchCategoriesList :items="bigCategoriesItems">
                            <template #title>
                                {{ $t('CatalogPage.Categories.title') }}
                            </template>
                            <template v-slot:card="{ card }">
                                <SearchMainCategoryCard
                                    :category="card"
                                >
                                </SearchMainCategoryCard>
                            </template>
                        </SearchCategoriesList>
                    </div>
                </div>
            </template>
        </div>
    </main>
</template>

<script lang="ts">
import { Vue, Component, Action, Getter, Provide, ProvideReactive, Watch } from 'nuxt-property-decorator';
import BreadCrumbs from '~/components/BreadCrumbs.vue';
import { ICatalog, ICatalogForm, ICatalogMeta, ICatalogProducts } from '~/types/catalog.interface';
import { IShopMenu } from '~/types/shop-menu.interface';
import VehicleFilter from '~/components/catalogs/filters/VehicleFilter.vue';
import { EStatus } from '~/constants/status';
import { IVehicleManufacturers, IVehicleModels, IVehicleTaxons, IVehileModifications } from '~/types/vehicle.interface';
import { IDictionary } from '~/types/dictionary.interface';
import CatalogProductCard from '~/components/catalogs/CatalogProductCard.vue';
import { ICartProductData } from '~/types/cart.interface';
import { EMessageTypes } from '~/constants/message-types';
import Pagination from '~/components/Pagination.vue';
import { IUpdateFieldPayload } from '~/types/update-field-payload.interface';
import { ISearchForm } from '~/types/search.interface';
import { IMenuItem } from '~/types/header-menu.interface';
import Spinner from '~/components/Spinner.vue';

import { 
    SearchCategoriesList, 
    SearchResultBlock,
    SearchCategoryCard,
    SearchMainCategoryCard
} from '~/components/search/index';
import catalogFormValueFilter from '~/utils/catalog-form-value-filter';
import { IBreadcrumbs } from '~/types/breadcrumbs.interface';

@Component({
    scrollToTop: true,
    components: {
        BreadCrumbs,
        SearchCategoriesList,
        VehicleFilter,
        SearchResultBlock,
        CatalogProductCard,
        SearchCategoryCard,
        SearchMainCategoryCard,
        Pagination,
        Spinner
    }
})
export default class PageSearch extends Vue {
    @Getter('page-home-menu/getBigCategories') public bigCategories!: IShopMenu[];
    @Getter('page-home-menu/getMainMenu') public menu!: [IShopMenu];

    @Getter('search/getSearchData') public searchData!: ICatalog;
    @Getter('search/getStatus') public searchStatus!: EStatus;

    @Getter('page-catalog-vehicle/getStatus') public vehicleStatus!: EStatus;
    @Getter('page-catalog/getStatus') public catalogStatus!: EStatus;
    @Getter('page-catalog-form/formValue') public formValue!: ICatalogForm;

    @Getter('search-form/formValue') public searchFormValue!: ISearchForm;

    @Getter('vehicle/getVehicleManufacturers') public manufacturers!: IVehicleManufacturers[];
    @Getter('vehicle/getVehicleModel') public models!: IVehicleModels[];
    @Getter('vehicle/getVehicleModifications') public modifications!: IVehileModifications[];
    @Getter('vehicle/getVehicleTaxons') public taxons!: IVehicleTaxons[];

    @Getter('cart/getError') public cartError!: Error | null;
    @Getter('cart/getStatus') public cartStatus!: EStatus;
    @Getter('cart/getToken') public cartToken!: string | null;

    @Action('page-catalog-vehicle/fetchVehicleManufacturerModels') public fetchModels!: (manufacturerId: number | string) => Promise<void>;
    @Action('page-catalog-vehicle/fetchVehicleModifications') public fetchModifications!: (modelId: number | string) => Promise<void>;
    @Action('page-catalog-vehicle/fetchVehicleTaxons') public fetchTaxons!: (vehicle: number | string) => Promise<void>;

    @Action('search-form/setFormField') public updateFormfield!: (payload: IUpdateFieldPayload<any>) => Promise<void>;
    @Action('search-form/updateFormValue') public updateFormValue!: (payload: Partial<ISearchForm>) => Promise<void>;

    @Action('cart/addCartItem') public addCartItem!: (payload: ICartProductData) => Promise<void>;

    @Action('search/fetchSearch') public fetchSearch!: (payload: Partial<ISearchForm>) => Promise<void>;

    static routeQueryToFormValue(query: IDictionary<string>): Partial<ISearchForm> {
        const formValue: Partial<ISearchForm> = {};

        Object
            .entries(query)
            .forEach(([field, value]) => {
                try {
                    if(field === 'q') {
                        formValue[field] = value;
                    } else {
                        formValue[field] = JSON.parse(value);
                    }
                } catch(err: any) {
                    console.warn(`Can't parse field '${field}'`);
                }
            });

        return formValue;
    }

    private get formValueToRouteQuery(): IDictionary<string> {
        const query: IDictionary<string> = {};
        
        Object
            .entries(this.searchFormValue)
            .forEach(([field, value]) => {
                if(typeof value !== 'object') {
                    query[field] = JSON.stringify(value);
                }

                if(value && typeof value === 'object' && value.length) {
                    query[field] = JSON.stringify(value);
                }

                if(value && typeof value === 'string') {
                    query[field] = value;
                }
            });

        return query;
    }

    private get vehicleFormValueToRouteQuery(): IDictionary<string> {
        const query: IDictionary<string> = {};
        const formValueFiltered: Partial<ICatalogForm> = catalogFormValueFilter(this.formValue);
        
        Object
            .entries(formValueFiltered)
            .forEach(([field, value]) => {
                if(typeof value !== 'object') {
                    query[field] = JSON.stringify(value);
                }

                if(value && typeof value === 'object' && value.length) {
                    query[field] = JSON.stringify(value);
                }

                if(value && typeof value === 'string') {
                    query[field] = value;
                }
            });

        return query;
    }

    public get searchProducts(): ICatalogProducts[] {
        return this.searchData?.products ?? [];
    }

    public get isProducts(): boolean {
        return !!(this.searchProducts && this.searchProducts.length);
    }

    public get searchMeta(): ICatalogMeta {
        return this.searchData?.meta;
    }

    public get searchProductTotalCount(): number {
        return this.searchMeta?.totalCount ?? 0;
    }

    public manufacturerChange(id: number): void {
        this.fetchModels(id);
    }

    public modelsChange(id: number): void {
        this.fetchModifications(id);
    }

    public modificationChange(id: number): void {
        this.fetchTaxons(id);
    }

    public formSubmitHandler(): void {
        const query: IDictionary<string> = this.formValueToRouteQuery;
        this.$router.push({ query });
    }

    public vehicleSubmitHandler(): void {
        const query: IDictionary<string> = this.vehicleFormValueToRouteQuery;
        const path: string | undefined = this.formValue.category ? `/catalog/${this.formValue.category}` : undefined;
        this.$router.push({ query, path });
    }

    public async onPageChange(page: number): Promise<any> {
        const { limit:value, q } = this.searchFormValue;
        await this.updateFormfield({ field: 'page', value: page });
        await this.updateFormfield({ field: 'limit', value });
        await this.updateFormfield({ field: 'q', value: q });
        this.formSubmitHandler();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    @ProvideReactive('CART_STATUS')
    public get getCartStatus(): EStatus {
        return this.cartStatus;
    }

    @ProvideReactive('CART_TOKEN')
    public get getCartToken(): string | null {
        return this.cartToken;
    }

    @Provide('ADD_CART_ITEM_SUBMIT')
    public async addCartItemSubmit({ productCode, quantity }: ICartProductData): Promise<any> {
        await this.addCartItem({ productCode, quantity });
        if(this.getCartStatus === EStatus.ERROR && this.cartError) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: (this.cartError as any)?.message
            });
        } 
    }

    public get bigCategoriesItems(): IMenuItem[] {
        return this.bigCategories[0].items ?? [];
    }

    public get menuInstance(): IMenuItem | null {
        return this.menu[0]?.items[0] || null;
    }

    public get menuItemsList(): IMenuItem[] {
        return this.menuInstance?.children ?? [];
    }

    public get isProcessing(): boolean {
        return this.searchStatus === EStatus.PROCESSING;
    }

    public get breadcrumbs(): IBreadcrumbs[] {
        return [{
            key: this.$t('Search.breacrumbText').toString(),
            title: this.$t('Search.breacrumbText').toString(),
            link: ''
        }];
    }

    async asyncData({ store, error, query }: any): Promise<any> {
        try {
            const { q, type } = query;
            const parsedForm: Partial<ISearchForm> = PageSearch.routeQueryToFormValue(query);
            parsedForm.limit = parsedForm.limit == null ? 5 : parsedForm.limit;

            await store.dispatch('page-catalog-vehicle/fetchVehicleManufacturers')
            await store.dispatch('search-form/updateFormValue', parsedForm);
            await store.dispatch('search/fetchSearch', { q, type });
        } catch(e: any) {
            if(e?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(e);
        }
    }

    @Watch('$route.query')
    public async onRouteQueryChanged(newValue: IDictionary<string>): Promise<any> {
        const parsedForm: Partial<ISearchForm> = PageSearch.routeQueryToFormValue(newValue);
        await this.updateFormValue(parsedForm);
        await this.fetchSearch({ ...parsedForm });
    }
}
</script>

<style lang="scss" scoped>
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

.page-search {
    padding-bottom: 80px;
    &__list {
        position: relative;
        &-item:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}
</style>