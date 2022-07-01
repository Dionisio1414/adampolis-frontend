<template>
    <div class="vehicle-filter-mobile" :class="{ 'vehicle-filter-mobile--open': isOpenMobile }">
        <div
            v-if="isOpenMobile || !isApplyFilter"
            class="vehicle-filter-mobile__information"
            @click.stop="openMobileControls"
        >
            <div class="vehicle-filter-mobile__picture">
                <img class="img-responsive" :src="require(`@/assets/images/${getFilterImage}.svg`)" alt="" />
            </div>
            <div class="vehicle-filter-mobile__caption">
                <template v-if="!isApplyFilter">
                    {{ $t('CatalogPage.CarDetails.defaultTitle') }}
                </template>
                <template v-else>
                    {{ $t('CatalogPage.CarDetails.changedTitle') }}
                </template>
            </div>
            <div v-if="isOpenMobile" class="vehicle-filter-mobile__close" @click.stop="closeMobileControls">
                <i class="vehicle-filter-mobile__icon icon icon--close"></i>
            </div>
        </div>
        <div v-else class="vehicle-filter-mobile__information--applied" @click.stop="openMobileControls">
            <div class="vehicle-filter-mobile__content">
                <div class="vehicle-filter-mobile__picture">
                    <img class="img-responsive" :src="require(`@/assets/images/${getFilterImage}.svg`)" alt="" />
                </div>
                <div class="vehicle-filter-mobile__caption">
                    <div class="vehicle-filter-mobile__caption-item">
                        {{ $t('CatalogPage.CarDetails.defaultTitle') }}:
                    </div>
                    <div class="vehicle-filter-mobile__caption-item">{{ manufacturerName }}</div>
                    <div class="vehicle-filter-mobile__caption-item">{{ modelName }}</div>
                    <div class="vehicle-filter-mobile__caption-item">{{ modificationName }}</div>
                    <div class="vehicle-filter-mobile__caption-item">{{ categoryName }}</div>
                </div>
            </div>
            <div class="vehicle-filter-mobile__btn-container">
                <button type="button" class="btn btn--secondary-black-border" @click="openMobileControls">
                    {{ $t('CatalogPage.CarDetails.changedBtnText') }}
                </button>
            </div>
        </div>
        <div
            class="vehicle-filter-mobile__controls-container"
            :class="{ 'vehicle-filter-mobile__controls-container--open': isOpenMobile }"
        >
            <div class="vehicle-filter-mobile__controls">
                <div class="vehicle-filter-mobile__controls-item">
                    <div class="vehicle-filter-mobile__label" v-if="isApplyFilter">
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
                    >
                        <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                    </multiselect>
                </div>
                <div class="vehicle-filter-mobile__controls-item">
                    <div class="vehicle-filter-mobile__label" v-if="isApplyFilter">
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
                    >
                        <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                    </multiselect>
                </div>
                <div class="vehicle-filter-mobile__controls-item">
                    <div class="vehicle-filter-mobile__label" v-if="isApplyFilter">
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
                    >
                        <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                    </multiselect>
                </div>
                <div class="vehicle-filter-mobile__controls-item">
                    <div class="vehicle-filter-mobile__label" v-if="isApplyFilter">
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
            <div class="vehicle-filter-mobile__buttons">
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'nuxt-property-decorator';
import Multiselect from 'vue-multiselect';
import { IVehicleManufacturers, IVehicleModels, IVehicleTaxons, IVehileModifications } from '~/types/vehicle.interface';
import Spinner from '~/components/Spinner.vue';
import { EStatus } from '~/constants/status';
import { ICatalogForm } from '~/types/catalog.interface';
import storeFormMapper from '~/utils/store-form-mapper';

@Component({
    components: { Multiselect, Spinner }
})
export default class VehicleFilterMobile extends Vue {
    @Prop() public vehicleStatus!: EStatus;
    @Prop() public catalogStatus!: EStatus;
    @Prop() public formValue!: ICatalogForm;
    @Prop() public manufacturers!: IVehicleManufacturers[];
    @Prop() public models!: IVehicleModels[];
    @Prop() public modifications!: IVehileModifications[];
    @Prop() public taxons!: IVehicleTaxons[];
    

    public isApplyFilter: boolean = false;
    public isOpenMobile: boolean = false;

    public get getFilterImage(): string { return this.isApplyFilter ? 'check-circle' : 'car-management'; }

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

    public get getCatalogStatus(): boolean {
        return this.catalogStatus === EStatus.PROCESSING;
    }

    public get getVehicleStatus(): boolean {
        return this.vehicleStatus === EStatus.PROCESSING;
    }

    public get manufacturerName(): string {
        const elem = this.manufacturers.find(item => item.id === this.form.manufacturer);
        return elem?.name || '';
    }

    public get modelName(): string {
        const elem = this.models.find(item => item.id === this.form.model);
        return elem?.name || '';
    }

    public get modificationName(): string {
        const elem = this.modifications.find(item => item.id === this.form.vehicle);
        return elem?.type_name || '';
    }

    public get categoryName(): string {
        const elem = this.taxons.find(item => item.slug === this.form.category);
        return elem?.slug || '';
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
            this.isOpenMobile = !this.isOpenMobile;
            this.applyFilter();
        }
    }

    public openMobileControls(): void {
        this.isOpenMobile = true;
    }

    public closeMobileControls(): void {
        this.isOpenMobile = false;
    }

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

.vehicle-filter-mobile {
    position: relative;
    display: flex;
    align-items: center;
    background: $color-white;
    border-radius: 4px;
    border: 1px solid $color-grey;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    cursor: pointer;
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

        .vehicle-filter-mobile__information {
            padding: 15px 0;

            .vehicle-filter-mobile__caption {
                font-size: 16px;
            }
        }
    }

    &__information {
        display: flex;
        align-items: center;
        flex: 0 1 auto;
        width: 100%;
        border-right: none;
        border-bottom: 1px solid $color-grey;
        padding: 12px 0;
    }

    &__information--applied {
        @extend .vehicle-filter-mobile__information;
        flex-direction: column;

        .vehicle-filter-mobile {
            &__picture {
                width: 24px;
                height: 24px;
            }

            &__caption {
                font-size: 12px;
                letter-spacing: 0;
                line-height: 15px;
                font-weight: normal;
            }

            &__caption-item {
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 0;
                line-height: 17px;
                margin-top: 5px;
                color: $color-dark-blue;

                &:first-child {
                    margin-top: 0;
                    margin-bottom: 10px;
                    color: $color-search-bg;
                }
            }
        }
    }

    &__content {
        display: flex;
        width: 100%;
        margin-bottom: 15px;
    }

    &__btn-container {
        padding: 0 20px;
        width: 100%;

        .btn {
            width: 100%;
        }
    }

    &__picture {
        margin-left: 15px;
        margin-right: 15px;
    }

    &__caption {
        font-weight: bold;
        line-height: 24px;
        font-size: 16px;
    }

    &__controls-container {
        display: none;

        &--open {
            display: flex;
            align-items: center;
            flex: 1 1 100%;
            flex-direction: column;
            justify-content: space-between;
            padding: 0px;
            width: 100%;
        }
    }

    &__controls {
        margin-right: 0;
        flex-basis: auto;
        padding: 20px;
        width: 100%;
    }

    &__controls-item {
        flex: 0 1 100%;
        margin-bottom: 20px;

        .multiselect {
            &--disabled {
                border-color: transparent;
                min-height: 0;
                &::after {
                    display: none;
                }
            }
        }
    }

    &__label {
        font-size: 14px;
        line-height: 22px;
        color: $color-search-bg;
    }

    &__buttons {
        margin-top: auto;
        display: block;
        flex-grow: 0;
        flex-shrink: 0;
        width: 100%;
        border-top: 1px solid $color-grey;
        padding: 20px;

        .btn {
            font-weight: 600;
            width: 100%;

            &-primary {
                min-width: 120px;
            }
            &-secondary {
                min-width: 141px;
            }
        }
    }

    &__close {
        display: block;
        margin-left: auto;
        margin-right: 15px;
        cursor: pointer;
    }

    &__icon {
        width: 24px;
        height: 24px;
    }

    .form-control.multiselect--disabled {
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
