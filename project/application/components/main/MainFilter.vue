<template>
    <section class="main-filter">
        <div class="main-filter__content">
            <div class="main-filter__title">{{ $t('MainFilter.title') }}</div>

            <div class="main-filter__filter">
                <div class="main-filter__label">{{ $t('MainFilter.vin.label') }}</div>
                <vue-autosuggest
                    v-model="form['vin']"
                    :suggestions="vin"
                    :get-suggestion-value="getSuggestionValue"
                    :render-suggestion="renderSuggestion"
                    :input-props="{
                        placeholder: $sanitize($t('MainFilter.vin.placeholder')),
                        class: vinFieldClasses
                    }"
                    @input="inputVinHandler"
                    @selected="selectVinHandler"                    
                    @focus="errorHandler"
                    @blur="errorHandler"
                >  
                </vue-autosuggest>
                <FormControlServerErrors
                    v-if="errorVehicle && errorVehicle.message && processingState"
                    :validations="[errorVehicle.message]"
                />
            </div>

            <div class="main-filter__filter">
                <div class="main-filter__label">{{ $t('MainFilter.model.label') }}</div>
                <multiselect
                    id="model"
                    v-if="models"
                    class="form-control"
                    v-model="form['model']"
                    :allow-empty="true"
                    :options="modelsOptions"
                    :placeholder="$t('CatalogPage.CarDetails.models.placeholder')"
                    :disabled="vehicleStatus"
                    ref="multiselect-models"
                    :showPointer="true"
                    :custom-label="customLabelModels"
                    @select="modelsHandler"
                >
                    <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                </multiselect>
            </div>

            <div class="main-filter__filter">
                <div class="main-filter__label">{{ $t('MainFilter.modification.label') }}</div>
                <multiselect
                    v-if="modifications"
                    class="form-control"
                    v-model="form['vehicle']"
                    :allow-empty="true"
                    :options="modificationsOptions"
                    :placeholder="$t('CatalogPage.CarDetails.modifications.placeholder')"
                    :disabled="vehicleStatus"
                    ref="multiselect-modifications"
                    :custom-label="customLabelModifications"
                    @select="modificationHandler"
                >
                    <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                </multiselect>
            </div>

            <div class="main-filter__filter">
                <div class="main-filter__label">{{ $t('MainFilter.category.label') }}</div>
                <multiselect
                    v-if="taxons"
                    class="form-control"
                    v-model="form['category']"
                    :allow-empty="true"
                    :options="taxonsOptions"
                    :placeholder="$t('CatalogPage.CarDetails.categories.placeholder')"
                    :disabled="vehicleStatus"
                    :custom-label="customLabelTaxons"
                    ref="multiselect-taxons"
                >
                    <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                </multiselect>
            </div>
            <NuxtLink
                class="btn btn--pink main-filter__submit"
                :class="{'btn-link--disabled': !disabledSubmitButton}"
                :to="localePath(slugForSubmit)"
            >
                {{ $t('MainFilter.search') }}
            </NuxtLink>
        </div>
        <transition name="fade">
            <div v-if="vehicleStatus" class="form-spinner">
                <Spinner></Spinner>
            </div>
        </transition>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Emit, InjectReactive } from 'nuxt-property-decorator';
import Multiselect from 'vue-multiselect';
import { IVehicleAutocompleteData, IVehicleByVin, IVehicleModels, IVehicleTaxons, IVehileModifications } from '~/types/vehicle.interface';
import Spinner from '~/components/Spinner.vue';
import { EStatus } from '~/constants/status';
import storeFormMapper from '~/utils/store-form-mapper';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import { debounce } from 'lodash';

@Component({
    components: { 
        Multiselect, 
        Spinner,
        FormControlErrors, 
        FormControlServerErrors
    },
})
export default class ComponentMainFilter extends Vue {
    @InjectReactive('VEHICLE_STATUS') public vehicleStatus!: EStatus;
    @InjectReactive('CATALOG_STATUS') public catalogStatus!: EStatus;
    @InjectReactive('VEHICLE_MODELS') public models!: IVehicleModels[];
    @InjectReactive('VEHICLE_MODIFICATIONS') public modifications!: IVehileModifications[];
    @InjectReactive('VEHICLE_TAXONS') public taxons!: IVehicleTaxons[];
    @InjectReactive('VEHICLE_VIN') public vin!: IVehicleAutocompleteData[];
    @InjectReactive('VEHICLE_ERROR') public errorVehicle!: Error;

    public processingState: boolean = false

    public get modelsOptions(): number[] {
        return this.models.map((item: IVehicleModels) => item.id);
    }

    public get modificationsOptions(): number[] {
        return this.modifications.map(item => item.id);
    }

    public get taxonsOptions(): string[] {
        return this.taxons.map(item => item.slug);
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

    public get form(): any {
        return storeFormMapper({
            store: this.$store,
            getter: 'page-catalog-form/formValue',
            action: 'page-catalog-form/setFormField',
            fields: [
                'model',
                'vehicle',
                'category',
                'vin'
            ]
        });
    }

    public get vinFieldClasses(): string {
        return !Boolean(
            (this.errorVehicle?.message && this.processingState)) ? 
            'form-control' : 'form-control form-control--invalid';
    }

    public get slugForSubmit(): string {
        if(this.form.vehicle && this.form.category) {
            return `/catalog/${this.form.category}?vehicle=${this.form.vehicle}`;
        }
        return '/';
    }

    public get disabledModifications(): boolean {
        return !!this.modifications.length;
    }

    public get disabledSubmitButton(): boolean {
        return !!this.form.category && !!this.form.vehicle;
    }

    @Emit('updateModifications')
    public modelsHandler({ id, vehicleID }: { id: number, vehicleID?: number }): number {
        this.form.vehicle = vehicleID ? vehicleID : null;
        this.form.category = null;
        return id;
    }

    @Emit('updateTaxons')
    public modificationHandler({ id }: { id: number }): number {
        this.form.category = null;
        return id;
    }

    @Emit('vinHandler')
    private async vinHandler(): Promise<string> {
        if(!this.form.vin) { 
            await this.$store.dispatch('vehicle/clearVehicleField', {
                field: 'modifications',
                value: []
            });
            this.form['model'] = null;
            this.form['vehicle'] = null;
            this.form['category'] = null;
        }
        
        this.processingState = true;
        return this.form.vin;
    }
    
    public errorHandler(): void {
        if(this.errorVehicle?.message) {
            this.processingState = false;
        }
    }

    public getSuggestionValue(suggestion: any): any {
        return suggestion.item.full_name;
    }

    public renderSuggestion(suggestion: any): any {
        return suggestion.item.full_name;
    }

    public selectVinHandler({ item }: { item: IVehicleByVin }): void {
        this.form.model = item.model.id;
        this.modelsHandler({ id: item.model.id, vehicleID: item.id });
        this.modificationHandler({ id: item.id });
    }

    public inputVinHandler = debounce(this.vinHandler, 500);

}
</script>

<style lang="scss" scoped>
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

.main-filter {
    position: relative;
    flex: 1;

    &__content {
        display: flex;
        flex-direction: column;
        padding: 30px;
        background-color: $color-white;
    }

    &__title {
        color: $color-dark-blue;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 24px;
        margin-bottom: 30px;
    }

    &__filter {
        margin-bottom: 16px;
        .form-control {
            border-color: $color-grey;
            &--invalid {
                border-color: $color-pink;
            }
        }
        .multiselect {
            &--disabled {
                background-color: rgba(239, 239, 239, 0.3)!important;
                opacity: .5;
                pointer-events: none;
            }
        }
    }

    &__label {
        color: $color-dark-blue;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 19px;
        margin-bottom: 6px;
    }

    &__submit {
        margin-top: 19px;
    }
}

.errors-list {
    margin-top: 5px;
}

@include media-lg {
    .main-filter {
        &__content {
            border-radius: 4px;
            padding: 20px 15px;
        }

        &__title {
            margin-bottom: 20px;
        }

        &__submit {
            margin-top: 4px;
        }
    }
}
</style>
