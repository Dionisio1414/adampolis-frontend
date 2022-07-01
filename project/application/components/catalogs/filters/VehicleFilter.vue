<template>
    <div>
        <div class="d-none d-lg-block">
            <div class="vehicle-filter">
                <div class="vehicle-filter__information">
                    <div class="vehicle-filter__picture">
                        <img class="img-responsive" :src="require(`@/assets/images/${getFilterImage}.svg`)" alt="" />
                    </div>
                    <div class="vehicle-filter__caption">
                        <template v-if="!isApplyFilter">
                            {{ $t('CatalogPage.CarDetails.defaultTitle') }}
                        </template>
                        <template v-else>
                            {{ $t('CatalogPage.CarDetails.changedTitle') }}
                        </template>
                    </div>
                </div>
                <div class="vehicle-filter__controls-container">
                    <div class="vehicle-filter__controls">
                        <div class="vehicle-filter__control">
                            <div class="vehicle-filter__label" v-if="isApplyFilter">
                                {{ $t('CatalogPage.CarDetails.manufacturer.placeholder') }}
                            </div>
                            <multiselect
                                v-if="manufacturers"
                                class="form-control"
                                v-model="form['manufacturer']"
                                :allow-empty="true"
                                :options="manufacturerOptions"
                                :placeholder="$t('CatalogPage.CarDetails.manufacturer.placeholder')"
                                :disabled="isApplyFilter || getVehicleStatus"
                                :custom-label="customLabelManufacturers"
                                @select="manufacturerHandler"
                                @remove="manufacturerHandler"
                            >
                                <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                            </multiselect>
                        </div>
                        <div class="vehicle-filter__control">
                            <div class="vehicle-filter__label" v-if="isApplyFilter">
                                {{ $t('CatalogPage.CarDetails.models.placeholder') }}
                            </div>
                            <multiselect
                                v-if="models"
                                class="form-control"
                                v-model="form['model']"
                                :allow-empty="true"
                                :options="modelsOptions"
                                :placeholder="$t('CatalogPage.CarDetails.models.placeholder')"
                                :disabled="isApplyFilter || getVehicleStatus"
                                ref="multiselect-models"
                                :custom-label="customLabelModels"
                                @select="modelsHandler"
                                @remove="modelsHandler"
                            >
                                <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                            </multiselect>
                        </div>
                        <div class="vehicle-filter__control">
                            <div class="vehicle-filter__label" v-if="isApplyFilter">
                                {{ $t('CatalogPage.CarDetails.modifications.placeholder') }}
                            </div>
                            <multiselect
                                v-if="modifications"
                                class="form-control"
                                v-model="form['vehicle']"
                                :allow-empty="true"
                                :options="modificationsOptions"
                                :placeholder="$t('CatalogPage.CarDetails.modifications.placeholder')"
                                :disabled="isApplyFilter || getVehicleStatus"
                                ref="multiselect-modifications"
                                :custom-label="customLabelModifications"
                                @select="modificationHandler"
                                @remove="modificationHandler"
                            >
                                <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                            </multiselect>
                        </div>
                        <div class="vehicle-filter__control">
                            <div class="vehicle-filter__label" v-if="isApplyFilter">
                                {{ $t('CatalogPage.CarDetails.categories.placeholder') }}
                            </div>
                            <multiselect
                                v-if="taxons"
                                class="form-control"
                                v-model="form['category']"
                                :allow-empty="true"
                                :options="taxonsOptions"
                                :placeholder="$t('CatalogPage.CarDetails.categories.placeholder')"
                                :disabled="isApplyFilter || getVehicleStatus"
                                :custom-label="customLabelTaxons"
                                ref="multiselect-taxons"
                            >
                                <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                            </multiselect>
                        </div>
                    </div>
                    <div class="vehicle-filter__buttons">
                        <button
                            type="button"
                            class="btn"
                            :class="{
                                'btn--primary': !isApplyFilter,
                                'btn--secondary': isApplyFilter,
                                'btn--secondary-black-border': isApplyFilter
                            }"
                            @click="submit"
                        >
                            <template v-if="!isApplyFilter">
                                {{ $t('CatalogPage.CarDetails.defaultBtnText') }}
                            </template>
                            <template v-else>
                                {{ $t('CatalogPage.CarDetails.changedBtnText') }}
                            </template>
                        </button>
                    </div>
                </div>
                <!-- <transition name="fade">
                    <div v-if="getVehicleStatus || getCatalogStatus" class="form-spinner">
                        <Spinner></Spinner>
                    </div>
                </transition> -->
            </div>
        </div>
        <div class="d-block d-lg-none">
            <vehicle-filter-mobile
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
                @applyFilter="applyFilter"
            >
            </vehicle-filter-mobile>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'nuxt-property-decorator';
import Multiselect from 'vue-multiselect';
import VehicleFilterMobile from './VehicleFilterMobile.vue';
import { IVehicleManufacturers, IVehicleModels, IVehicleTaxons, IVehileModifications } from '~/types/vehicle.interface';
import storeFormMapper from '~/utils/store-form-mapper';
import { ICatalogForm } from '~/types/catalog.interface';
import Spinner from '~/components/Spinner.vue';
import { EStatus } from '~/constants/status';

@Component({
    components: { Multiselect, VehicleFilterMobile, Spinner }
})
export default class VehicleFilter extends Vue {
    @Prop() public vehicleStatus!: EStatus;
    @Prop() public catalogStatus!: EStatus;
    @Prop() public formValue!: ICatalogForm;
    @Prop() public manufacturers!: IVehicleManufacturers[];
    @Prop() public models!: IVehicleModels[];
    @Prop() public modifications!: IVehileModifications[];
    @Prop() public taxons!: IVehicleTaxons[];

    public isApplyFilter: boolean = false;

    public get getFilterImage(): string { return this.isApplyFilter ? 'check-circle' : 'car-management'; }

    public get form(): any {
        return storeFormMapper({
            store: this.$store,
            getter: 'page-catalog-form/formValue',
            action: 'page-catalog-form/setFormField',
            fields: [
                'manufacturer',
                'model',
                'vehicle',
                'category'
            ]
        });
    }

    public get getCatalogStatus(): boolean {
        return this.catalogStatus === EStatus.PROCESSING;
    }

    public get getVehicleStatus(): boolean {
        return this.vehicleStatus === EStatus.PROCESSING;
    }

    public get manufacturerOptions(): number[] {
        return this.manufacturers.map((item: IVehicleManufacturers) => item.id);
    }

    public get modelsOptions(): number[] {
        return this.models.map((item: IVehicleModels) => item.id);
    }

    public get modificationsOptions(): number[] {
        return this.modifications.map(item => item.id);
    }

    public get taxonsOptions(): string[] {
        return this.taxons.map(item => item.slug);
    }

    public customLabelManufacturers(id: number): string {
        const option = this.manufacturers.find(option => option.id === id);
        return option?.name || '';
    }

    public customLabelModels(id: number): string {
        const option = this.models.find(option => option.id === id);
        return option?.name || '';
    }

    public customLabelModifications(id: number): string {
        const option = this.modifications.find(option => option.id === id);
        return option?.type_name || '';
    }

    public customLabelTaxons(slug: string): string {
        const option = this.taxons.find(option => option.slug === slug);
        return option?.name || '';
    }

    public async created(): Promise<any> {
        const { query } = this.$route;
        if(
            this.formValue.manufacturer ||
            (this.formValue.manufacturer && this.formValue.vehicle && this.formValue.model) ||
            (this.formValue.manufacturer && this.formValue.vehicle && this.formValue.model && this.formValue.category)
        ) {
            this.isApplyFilter = !this.isApplyFilter;
        }

        if(!query.hasOwnProperty('vehicle')) {
            this.form.manufacturer = null;
            this.form.model = null;
            this.form.vehicle = null;
            this.form.category = null;
            this.isApplyFilter = false;
        }
    }

    @Emit('applyFilter')
    public applyFilter(): void {};

    public async submit(): Promise<any> {
        if(this.isApplyFilter) {
            this.isApplyFilter = !this.isApplyFilter;
        } else {
            this.isApplyFilter = !this.isApplyFilter;
            this.applyFilter();
        }
    }

    @Emit('manufacturerChange')
    public manufacturerChange(id: number): number {
        return id;
    }
    @Emit('modelsChange')
    public modelsChange(id: number): number {
        return id;
    }
    @Emit('modificationChange')
    public modificationChange(id: number): number {
        return id;
    }

    @Emit('manufacturerChange')
    public manufacturerHandler(id: number): number {
        this.form.model = null;
        this.form.vehicle = null;
        this.form.category = null;
        return id;
    }
    @Emit('modelsChange')
    public modelsHandler(id: number): number {
        this.form.vehicle = null;
        this.form.category = null;
        return id;
    }
    @Emit('modificationChange')
    public modificationHandler(id: number): number {
        this.form.category = null;
        return id;
    }
}
</script>

<style lang="scss">
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

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

.vehicle-filter {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $color-white;
    border-radius: 4px;
    border: 1px solid $color-grey;
    padding: 0 20px 0 30px;
    margin-bottom: 30px;

    &__information {
        display: flex;
        align-items: center;
        flex: 0 1 22%;
        padding: 21px 0;
        border-right: 1px solid $color-grey;
    }

    &__picture {
        margin-right: 30px;
    }

    &__caption {
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
    }

    &__controls-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1 1 calc(76% - 15px);
        padding: 25px 0 25px 20px;
    }

    &__controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        flex: 0 1 100%;
        margin-right: 20px;
    }

    &__buttons {
        flex: calc(5% - 20px);

        .btn {
            font-weight: 600;
            width: 120px;
            &-primary {
                min-width: 120px;
            }
            &-secondary {
                min-width: 141px;
            }
        }
    }

    &__control {
        flex: 0 1 calc(25% - 20px);
        .multiselect {
            &--disabled {
                border-color: transparent;
                min-height: 0;
                &::after {
                    display: none;
                }

                &:focus {
                    border-color: transparent;
                }
            }
        }
    }

    &__label {
        font-size: 14px;
        line-height: 22px;
        color: $color-search-bg;
    }

    .form-control.multiselect--disabled {
        cursor: default;

        .multiselect__placeholder,
        .multiselect__single {
            padding: 0;
            font-weight: bold;
            color: $color-dark-blue;
            margin-top: 6px;
        }
    }
}
</style>
