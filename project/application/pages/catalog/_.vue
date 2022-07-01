<template>
    <main class="page page-catalog">
        <div class="container">
            <div class="row">
                <div class="col">
                    <bread-crumbs :breadcrumbs="breadcrumbs"></bread-crumbs>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <vehicle-filter
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
                        @applyFilter="formSubmitHandler"
                    >
                    </vehicle-filter>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-3 d-none d-lg-block" v-if="showCatalogFilter">
                    <catalog-filter
                        @update-manufacturers="updateManufacturers"
                        @update-attributes="updateAttributes"
                        @clear-filter="clearFilter"
                        @update-remnants-products="updateRemnantsProducts"
                    >
                    </catalog-filter>
                </div>
                <div
                    class="col-12"
                    :class="{'col-lg-9': showCatalogFilter}"
                >
                    <catalog-sorting
                        @update-limit="updateLimit"
                        @update-sort-by="updateSortBy"
                    >
                    </catalog-sorting>
                    <div class="d-block d-lg-none">
                        <catalog-filter
                            @update-manufacturers="updateManufacturers"
                            @update-attributes="updateAttributes"
                            @clear-filter="clearFilter"
                            @update-remnants-products="updateRemnantsProducts"
                        >
                        </catalog-filter>
                    </div>
                    <catalog-sorting-mobile
                        @update-limit="updateLimit"
                        @update-sort-by="updateSortBy"
                    >
                    </catalog-sorting-mobile>
                    <catalog-product-list></catalog-product-list>
                    <Pagination
                        v-if="catalogMeta.totalPages && catalogMeta.totalPages > 1"
                        :totalPages="catalogMeta.totalPages"
                        :currentPage="+formValue.page"
                        :hideFirstAndLastPageLinks="true"
                        @onPageChange="onPageChange"
                    />
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="processingCatalogStatus" class="page-catalog__overlay">
                <div class="page-catalog__overlay-wrapper">
                    <Spinner class="page-catalog__overlay-loader"></Spinner>
                </div>
            </div>
        </transition>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter, ProvideReactive, Action, Watch, Provide } from 'nuxt-property-decorator';
import BreadCrumbs from '~/components/BreadCrumbs.vue';
import CatalogFilter from '~/components/catalogs/filters/CatalogFilter.vue';
import VehicleFilter from '~/components/catalogs/filters/VehicleFilter.vue';
import CatalogSorting from '~/components/catalogs/CatalogSorting.vue';
import CatalogSortingMobile from '~/components/catalogs/CatalogSortingMobile.vue';
import CatalogProductList from '~/components/catalogs/CatalogProductList.vue';
import Pagination from '~/components/Pagination.vue';
import { ICatalog, ICatalogMeta, ICatalogTaxon, ICatalogAttributes, ICatalogManufacturers, ICatalogBreadcrumbs, ICatalogForm, ICatalogFillForm } from '~/types/catalog.interface';
import { IBreadcrumbs } from '~/types/breadcrumbs.interface';
import { IUpdateFieldPayload } from '~/types/update-field-payload.interface';
import { IDictionary } from '~/types/dictionary.interface';
import catalogFormValueFilter from '~/utils/catalog-form-value-filter';
import { IVehicleManufacturers, IVehicleModels, IVehicleTaxons, IVehileModifications } from '~/types/vehicle.interface';
import { EStatus } from '~/constants/status';
import { ICartItem, ICartProductData } from '~/types/cart.interface';
import { EMessageTypes } from '~/constants/message-types';
import Spinner from '~/components/Spinner.vue';

@Component({
    components: {
        BreadCrumbs,
        CatalogFilter,
        CatalogSorting,
        CatalogSortingMobile,
        CatalogProductList,
        Pagination,
        VehicleFilter,
        Spinner
    }
})
export default class PageCatalog extends Vue {
    @Getter('page-catalog/getData') public catalogData!: ICatalog;
    @Getter('page-catalog-form/formValue') public formValue!: ICatalogForm;
    @Getter('page-catalog/attributesMap') public attributesMap!: IDictionary<ICatalogAttributes>;
    @Getter('page-catalog/getStatus') public catalogStatus!: EStatus;
    
    @Getter('page-catalog-vehicle/getStatus') public vehicleStatus!: EStatus;
    
    @Getter('vehicle/getVehicleManufacturers') public manufacturers!: IVehicleManufacturers[] | [];
    @Getter('vehicle/getVehicleModel') public models!: IVehicleModels[] | [];
    @Getter('vehicle/getVehicleModifications') public modifications!: IVehileModifications[] | [];
    @Getter('vehicle/getVehicleTaxons') public taxons!: IVehicleTaxons[] | [];
    
    @Getter('cart/getStatus') public cartStatus!: EStatus;
    @Getter('cart/getToken') public cartToken!: string | null;
    @Getter('cart/getError') public cartError!: Error | null;

    @Action('page-catalog/fetchCatalog') public fetchCatalog!: (data: any) => Promise<void>;
    
    @Action('page-catalog-vehicle/fetchVehicleManufacturerModels') public fetchModels!: (manufacturerId: number | string) => Promise<void>;
    @Action('page-catalog-vehicle/fetchVehicleModifications') public fetchModifications!: (modelId: number | string) => Promise<void>;
    @Action('page-catalog-vehicle/fetchVehicleTaxons') public fetchTaxons!: (vehicle: number | string) => Promise<void>;
   
    @Action('page-catalog-form/setFormField') public updateFormfield!: (payload: IUpdateFieldPayload<any>) => Promise<void>;
    @Action('page-catalog-form/updateFormValue') public updateFormValue!: (payload: Partial<ICatalogForm>) => Promise<void>;
    @Action('page-catalog-form/fillForm') public fillForm!: (payload: ICatalogFillForm) => Promise<void>;
    
    @Action('cart/addCartItem') public addCartItem!: (payload: ICartProductData) => Promise<void>;

    static routeQueryToFormValue(query: IDictionary<string>, attributesMap: IDictionary<ICatalogAttributes>): Partial<ICatalogForm> {
        const formValue: Partial<ICatalogForm> = {};
        
        Object
            .entries(query)
            .forEach(([field, value]) => {
                try {
                    if(field === 'sort' || field === 'order_by') formValue[field] = value;
                    formValue[field] = JSON.parse(value);
                } catch (err) {
                    console.warn(`Can't parse field '${field}'`);
                }
            });

        return formValue;
    }

    public async onPageChange(page: number): Promise<any> {
        const { limit:value } = this.formValue;
        await this.updateFormfield({ field: 'page', value: page });
        await this.updateFormfield({ field: 'limit', value });
        await this.updateFormfield({ field: 'sort', value: null });
        await this.updateFormfield({ field: 'order_by', value: null });
        this.formSubmitHandler();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    public formSubmitHandler(): void {
        const query: IDictionary<string> = this.formValueToRouteQuery;
        const path: string | undefined = this.formValue.category ? `/catalog/${this.formValue.category}` : undefined;
        this.$router.push({ query, path });
    }

    public get catalogBreadcrumbs(): ICatalogBreadcrumbs[] | [] {
        return this.catalogData.taxon.breadcrumbs ?? [];
    }

    public get showCatalogFilter(): boolean {
        return !!(this.manufacturersList.length || this.attributesList.length);
    }

    public get breadcrumbs(): IBreadcrumbs[] | [] {
        const taxonTitle: IBreadcrumbs[] = [{
            key: this.catalogData?.taxon?.name,
            title: this.catalogData?.taxon?.name,
            link: `/catalog/${this.catalogData?.taxon?.slug}`
        }],
        breadcrumbs = (this.catalogData.taxon.breadcrumbs || []).map(item => ({
            key: item.name,
            title: item.name,
            link: `/catalog/${item.slug}`
        }));

        return [  ...breadcrumbs, ...taxonTitle ];
    }

    @ProvideReactive('CART_TOKEN')
    public get getCartToken(): string | null {
        return this.cartToken;
    }

    @ProvideReactive('CATALOG_STATUS')
    public get getStatus(): EStatus {
        return this.catalogStatus;
    }

    @ProvideReactive('CART_STATUS')
    public get getCartStatus(): EStatus {
        return this.cartStatus;
    }

    @ProvideReactive('CATALOG_META')
    public get catalogMeta(): ICatalogMeta | {} {
        return this.catalogData.meta ?? {};
    }

    @ProvideReactive('CATALOG_TAXON')
    public get catalogTaxon(): ICatalogTaxon | {} {
        return this.catalogData.taxon ?? {};
    }

    @ProvideReactive('CATALOG_MANUFACTURERS')
    public get manufacturersList(): ICatalogManufacturers[] | [] {
        return this.catalogData.manufacturers ?? [];
    }

    @ProvideReactive('CATALOG_ATTRIBUTES')
    public get attributesList(): ICatalogAttributes[] | [] {
        return this.catalogData.attributes ?? [];
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

    public get processingCatalogStatus(): boolean {
        return this.catalogStatus === EStatus.PROCESSING;
    }

    private get formValueToRouteQuery(): IDictionary<string> {
        const query: IDictionary<string> = {};
        const formValueFiltered: Partial<ICatalogForm> = catalogFormValueFilter(this.formValue, this.attributesMap);

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

        delete query.category;
        delete query.manufacturer;
        delete query.model;

        return query;
    }

    async asyncData({ params, store, error, query }: any): Promise<void> {
        try {
            const attributesMap: IDictionary<ICatalogAttributes> = store.getters['page-catalog/attributesMap'];
            const { pathMatch:slug } = params;
            const parsedForm: Partial<ICatalogForm> = PageCatalog.routeQueryToFormValue(query, attributesMap);
            parsedForm.limit = parsedForm.limit == null ? 5 : parsedForm.limit;
            if(query.hasOwnProperty('vehicle')) {
                const vehicleData = await store.dispatch('page-catalog-vehicle/fetchVehicleById', query.vehicle);
                parsedForm.manufacturer = vehicleData.manufacturer.id;
                parsedForm.model = vehicleData.model.id;
                parsedForm.category = slug;
                await store.dispatch('page-catalog-vehicle/fetchVehicleManufacturers'),
                await store.dispatch('page-catalog-vehicle/fetchVehicleManufacturerModels', vehicleData.manufacturer.id),
                await store.dispatch('page-catalog-vehicle/fetchVehicleModifications', vehicleData.model.id),
                await store.dispatch('page-catalog-vehicle/fetchVehicleTaxons', '')
            } else {
                await store.dispatch('page-catalog-vehicle/fetchVehicleManufacturers')
            }
            await store.dispatch('page-catalog-form/updateFormValue', parsedForm);
            await store.dispatch(
                'page-catalog/fetchCatalog',
                {
                    slug,
                    formValue: parsedForm
                }
            )
        } catch(e: any) {
            if(e?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(e);
        }
    }

    public async updateManufacturers(): Promise<any> {
        await this.updateFormfield({ field: 'page', value: 1 });
        await this.updateFormfield({ field: 'sort', value: null });
        await this.updateFormfield({ field: 'order_by', value: null });
        this.formSubmitHandler();
    }

    public async updateAttributes(): Promise<any> {
        await this.updateFormfield({ field: 'page', value: 1 });
        await this.updateFormfield({ field: 'sort', value: null });
        await this.updateFormfield({ field: 'order_by', value: null });
        this.formSubmitHandler();
    }

    public async updateLimit(): Promise<any> {
        await this.updateFormfield({ field: 'page', value: 1 });
        await this.updateFormfield({ field: 'sort', value: null });
        await this.updateFormfield({ field: 'order_by', value: null });
        this.formSubmitHandler();
    }

    public async updateSortBy(): Promise<any> {
        await this.updateFormfield({ field: 'order_by', value: 'price' });
        this.formSubmitHandler();
    }

    public async clearFilter(): Promise<any> {
        const slug: string = this.$route.params.pathMatch;
        await this.updateFormfield({ field: 'page', value: 1 });
        await this.updateFormfield({ field: 'limit', value: 5 });
        await this.updateFormfield({ field: 'sort', value: null });
        await this.updateFormfield({ field: 'order_by', value: null });
        await this.fetchCatalog({ slug, formValue: this.formValue, reset: true });
        await this.$router.push({ query: {} });
    }

    public async updateRemnantsProducts(checked: boolean): Promise<any> {
        await this.updateFormfield({ field: 'has_stock', value: checked ? 1 : null });
        this.formSubmitHandler();
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

    @Watch('$route.query')
    public async onRouteQueryChanged(newValue: IDictionary<string>): Promise<any> {
        const slug: string = this.$route.params.pathMatch;
        const parsedForm: Partial<ICatalogForm> = PageCatalog.routeQueryToFormValue(newValue, this.attributesMap);
        await this.updateFormValue(parsedForm);
        await this.fetchCatalog({ slug, formValue: this.formValue, reset: false });
    }
}
</script>

<style lang="scss">
.page-catalog {
    position: relative;
    padding-bottom: 80px;
    &__overlay {
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        &-wrapper {
            position: sticky;
            top: 0;
            width: 100%;
            height: 100vh;
        }
    }
}
</style>
