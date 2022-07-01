<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.newVehicle.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.vin') }}</label>
                        <input 
                            v-model="fields.vin"
                            class="form-control" 
                            :class="{
                                'form-control--invalid': $v.fields.vin.$invalid && $v.fields.vin.$dirty 
                            }"
                            type="text" 
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.vin.$invalid && $v.fields.vin.$dirty"
                            :validations="$v.fields.vin"
                            validationType="validations.modals.registrationPopup"
                        >
                        </FormControlErrors>
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.model') }}</label>
                        <!-- <input 
                            v-model.number="fields.vehicleModel"
                            class="form-control" 
                            :class="{
                                'form-control--invalid':
                                    ($v.fields.vehicleModel.$invalid && $v.fields.vehicleModel.$dirty) ||
                                    (error && error.errors && error.errors['children[vehicleModel]'] && processingState)
                            }"
                            type="number"
                            @focus="errorHandler"
                            @change="errorHandler"
                        > -->
                        <multiselect
                            v-model="fields.vehicleModel"
                            class="form-control"
                            :class="{
                                'form-control--invalid':
                                    ($v.fields.vehicleModel.$invalid && $v.fields.vehicleModel.$dirty) ||
                                    (error && error.errors && error.errors['children[vehicleModel]'] && processingState)
                            }"
                            :allow-empty="true"
                            :options="modelsOptions"
                            :searchable="true"
                            :placeholder="$t('CatalogPage.CarDetails.models.placeholder')"
                            :custom-label="customLabelModels"
                            @select="errorHandler"
                        >
                            <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                        </multiselect>
                        <FormControlErrors
                            v-if="$v.fields.vehicleModel.$invalid && $v.fields.vehicleModel.$dirty "
                            :validations="$v.fields.vehicleModel"
                            validationType="validations.modals.registrationPopup"
                        >
                        </FormControlErrors>
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors['children[vehicleModel]'] && processingState"
                            :validations="[error.errors['children[vehicleModel]']]"
                        >
                        </FormControlServerErrors>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.type') }}</label>
                        <multiselect
                            v-model="fields.translation.constructionType"
                            class="form-control catalog-sorting__form-control"
                            :class="{
                                'form-control--invalid': 
                                    ($v.fields.translation.constructionType.$invalid && $v.fields.translation.constructionType.$dirty) || 
                                    (error && error.errors && error.errors['children[translation].constructionType'] && processingState)
                            }"
                            :allow-empty="true"
                            :options="typesList"
                            :placeholder="$sanitize($t('ProfilePage.transportInfo.type'))"
                        >
                            <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                        </multiselect>
                        <FormControlErrors
                            v-if="$v.fields.translation.constructionType.$invalid && $v.fields.translation.constructionType.$dirty"
                            :validations="$v.fields.translation.constructionType"
                            validationType="validations.modals.registrationPopup"
                        >
                        </FormControlErrors>
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors['children[translation].constructionType'] && processingState"
                            :validations="[error.errors['children[translation].constructionType']]"
                        >
                        </FormControlServerErrors>
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.engine_number') }}</label>
                        <input 
                            v-model="fields.motorCode"
                            class="form-control catalog-sorting__form-control"
                            :class="{
                                'form-control--invalid': $v.fields.motorCode.$invalid && $v.fields.motorCode.$dirty 
                            }"
                            type="text" 
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.motorCode.$invalid && $v.fields.motorCode.$dirty"
                            :validations="$v.fields.motorCode"
                            validationType="validations.modals.registrationPopup"
                        >
                        </FormControlErrors>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.engine_capacity') }}</label>
                        <input 
                            v-model.number="fields.powerHpFrom"
                            class="form-control catalog-sorting__form-control"
                            :class="{
                                'form-control--invalid': $v.fields.powerHpFrom.$invalid && $v.fields.powerHpFrom.$dirty 
                            }"
                            type="number"
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.powerHpFrom.$invalid && $v.fields.powerHpFrom.$dirty"
                            :validations="$v.fields.powerHpFrom"
                            validationType="validations.modals.registrationPopup"
                        >
                        </FormControlErrors>
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.weight_category') }}</label>
                        <multiselect
                            v-model="fields.weightCategory"
                            class="form-control catalog-sorting__form-control"
                            :class="{
                                'form-control--invalid': $v.fields.weightCategory.$invalid && $v.fields.weightCategory.$dirty 
                            }"
                            :allow-empty="true"
                            :options="weightCategorieValues"
                            :custom-label="customLabelWeightCategories"
                            :placeholder="$t('ProfilePage.transportInfo.weight_category')"
                        >
                            <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
                        </multiselect>
                        <FormControlErrors
                            v-if="$v.fields.weightCategory.$invalid && $v.fields.weightCategory.$dirty"
                            :validations="$v.fields.weightCategory"
                            validationType="validations.modals.registrationPopup"
                        >
                        </FormControlErrors>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.year_of_production') }}</label>
                        <input 
                            v-model="fields.yearOfConstrFrom"
                            :class="{
                                'form-control--invalid': 
                                    ($v.fields.yearOfConstrFrom.$invalid && $v.fields.yearOfConstrFrom.$dirty) ||
                                    (error && error.errors && error.errors['children[yearOfConstrFrom]'] && processingState)
                            }"
                            class="form-control" 
                            type="text"
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.yearOfConstrFrom.$invalid && $v.fields.yearOfConstrFrom.$dirty"
                            :validations="$v.fields.yearOfConstrFrom"
                            validationType="validations.modals.registrationPopup"
                            validationKey="YYYY"
                        >
                        </FormControlErrors>
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors['children[yearOfConstrFrom]'] && processingState"
                            :validations="[error.errors['children[yearOfConstrFrom]']]"
                        >
                        </FormControlServerErrors>
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.first_registration') }}</label>
                        <input 
                            v-model="fields.firstRegistrationAt"
                            class="form-control" 
                            :class="{
                                'form-control--invalid': 
                                    ($v.fields.firstRegistrationAt.$invalid && $v.fields.firstRegistrationAt.$dirty) ||
                                    (error && error.errors && error.errors['children[firstRegistrationAt]'] && processingState)
                            }"
                            type="text"
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.firstRegistrationAt.$invalid && $v.fields.firstRegistrationAt.$dirty"
                            :validations="$v.fields.firstRegistrationAt"
                            validationType="validations.modals.registrationPopup"
                            validationKey="YYYY-MM-DD"
                        >
                        </FormControlErrors>
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors['children[firstRegistrationAt]'] && processingState"
                            :validations="[error.errors['children[firstRegistrationAt]']]"
                        >
                        </FormControlServerErrors>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.first_registration_lithuania') }}</label>
                        <input 
                            v-model="fields.firstRegistrationInLitAt"
                            class="form-control" 
                            :class="{
                                'form-control--invalid': 
                                    ($v.fields.firstRegistrationInLitAt.$invalid && $v.fields.firstRegistrationInLitAt.$dirty) ||
                                    (error && error.errors && error.errors['children[firstRegistrationInLitAt]'] && processingState)
                            }"
                            type="text"
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.firstRegistrationInLitAt.$invalid && $v.fields.firstRegistrationInLitAt.$dirty"
                            :validations="$v.fields.firstRegistrationInLitAt"
                            validationType="validations.modals.registrationPopup"
                            validationKey="YYYY-MM-DD"
                        >
                        </FormControlErrors>
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors['children[firstRegistrationInLitAt]'] && processingState"
                            :validations="[error.errors['children[firstRegistrationInLitAt]']]"
                        >
                        </FormControlServerErrors>
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.license_plate') }}</label>
                        <input 
                            v-model="fields.licensePlate"
                            class="form-control" 
                            :class="{
                                'form-control--invalid': $v.fields.licensePlate.$invalid && $v.fields.licensePlate.$dirty 
                            }"
                            type="text" 
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.licensePlate.$invalid && $v.fields.licensePlate.$dirty"
                            :validations="$v.fields.licensePlate"
                            validationType="validations.modals.registrationPopup"
                        >
                        </FormControlErrors>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.date_of_roadworthiness_test') }}</label>
                        <input 
                            v-model="fields.technicalInspectionAt"
                            class="form-control" 
                            :class="{
                                'form-control--invalid': 
                                    ($v.fields.technicalInspectionAt.$invalid && $v.fields.technicalInspectionAt.$dirty) ||
                                    (error && error.errors && error.errors['children[technicalInspectionAt]'] && processingState)
                            }"
                            type="text"
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.technicalInspectionAt.$invalid && $v.fields.technicalInspectionAt.$dirty"
                            :validations="$v.fields.technicalInspectionAt"
                            validationType="validations.formatDate"
                            validationKey="YYYY-MM-DD"
                        >
                        </FormControlErrors>
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors['children[technicalInspectionAt]'] && processingState"
                            :validations="[error.errors['children[technicalInspectionAt]']]"
                        >
                        </FormControlServerErrors>
                    </div>
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.date_of_tachograph_inspection') }}</label>
                        <input 
                            v-model="fields.tachographInspectionAt"
                            class="form-control" 
                            :class="{
                                'form-control--invalid': 
                                    ($v.fields.tachographInspectionAt.$invalid && $v.fields.tachographInspectionAt.$dirty) ||
                                    (error && error.errors && error.errors['children[tachographInspectionAt]'] && processingState)
                            }"
                            type="text"
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.tachographInspectionAt.$invalid && $v.fields.tachographInspectionAt.$dirty"
                            :validations="$v.fields.tachographInspectionAt"
                            validationType="validations.modals.registrationPopup"
                            validationKey="YYYY-MM-DD"
                        >
                        </FormControlErrors>
                        <FormControlServerErrors
                            v-if="error && error.errors && error.errors['children[tachographInspectionAt]'] && processingState"
                            :validations="[error.errors['children[tachographInspectionAt]']]"
                        >
                        </FormControlServerErrors>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">{{ $t('ProfilePage.transportInfo.counterparty') }}</label>
                        <input 
                            v-model="fields.counterparty"
                            class="form-control" 
                            :class="{
                                'form-control--invalid': $v.fields.counterparty.$invalid && $v.fields.counterparty.$dirty 
                            }"
                            type="text"
                            @focus="errorHandler"
                            @change="errorHandler"
                        >
                        <FormControlErrors
                            v-if="$v.fields.counterparty.$invalid && $v.fields.counterparty.$dirty"
                            :validations="$v.fields.counterparty"
                            validationType="validations.modals.registrationPopup"
                        >
                        </FormControlErrors>
                    </div>
                </div>
                <div class="form-row">
                    <label class="form-label">{{ $t('ProfilePage.transportInfo.comment') }}</label>
                    <textarea 
                        v-model="fields.note"
                        class="form-control" 
                        rows="9" 
                        type="text"
                    >
                    </textarea>
                </div>
                <transition name="fade">
                    <div v-if="processingRequest" class="form-spinner">
                        <Spinner></Spinner>
                    </div>
                </transition>
            </div>
        </template>
        <template #footer>
            <modal-footer
                @cancel="close"
                @submit="submitHandler"
                :disabled="processingRequest"
                :btnCancelTitle="$t('ProfilePage.buttons.cancel')"
                :btnSubmitTitle="$t('ProfilePage.buttons.submit')"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import { 
    Component, 
    Prop, 
    mixins, 
    Action, 
    Getter,
    Emit
} from 'nuxt-property-decorator';

import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import Multiselect from 'vue-multiselect';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { IProfileVehiclePayload, IProfileVehiclePayloadParams, IProfileVehicleWeightCategories } from '~/types/profile-data.interface';
import { EStatus } from '~/constants/status';
import FormControlErrors from '~/components/FormControlErrors.vue';
import FormControlServerErrors from '~/components/FormControlServerErrors.vue';
import { EMessageTypes } from '~/constants/message-types';
import Spinner from '~/components/Spinner.vue';
import { TYPES_LIST, WEIGHT_CATEGORIES } from '~/constants/vehicle-lists';
import dayjs from 'dayjs';
import { IVehicleModels } from '~/types/vehicle.interface';

const formatDate: any = (value: string) => dayjs(value, 'YYYY-MM-DD', true).isValid()

const validations: any = {
    fields: {
        vin: { required },
        vehicleModel: { required },
        motorCode: { required },
        powerHpFrom: { required },
        // tonnage: { required },
        yearOfConstrFrom: { required },
        weightCategory: { required },
        firstRegistrationAt: { 
            required,
            formatDate
        },
        firstRegistrationInLitAt: { 
            required,
            formatDate
        },
        licensePlate: { required },
        technicalInspectionAt: { 
            required,
            formatDate
        },
        tachographInspectionAt: { 
            required,
            formatDate   
        },
        counterparty: { required },
        translation: {
            constructionType: { required },
        }
    }
}

@Component({
    validations,
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter,
        Multiselect,
        FormControlErrors,
        FormControlServerErrors,
        Spinner
    }
})
export default class ComponentModalNewVehicle extends mixins(validationMixin) {
    @Getter('page-profile-vehicle/getError') public error!: any;
    @Getter('page-profile-vehicle/getStatus') public status!: EStatus;
    @Getter('vehicle/getVehicleModel') public models!: IVehicleModels[];

    @Action('page-profile-vehicle/addProfileVehicle') public addProfileVehicle!: (payload: IProfileVehiclePayload) => Promise<void>;
    @Action('page-profile-vehicle/editProfileVehicle') public editProfileVehicle!: (payload: IProfileVehiclePayloadParams) => Promise<void>;

    @Prop() public modal!: any
    @Prop() public fieldsData!: IProfileVehiclePayload
    @Prop({ default: false }) public isEdit!: boolean
    @Prop() public vehicleID!: number

    public processingState: boolean = false;
    public fields: IProfileVehiclePayload = {
        vin: null,
        vehicleModel: null,
        motorCode: null,
        powerHpFrom: null,
        tonnage: null,
        yearOfConstrFrom: null,
        firstRegistrationAt: null,
        firstRegistrationInLitAt: null,
        licensePlate: null,
        technicalInspectionAt: null,
        tachographInspectionAt: null,
        counterparty: null,
        weightCategory: null,
        note: null,
        translation: {
            constructionType: null
        }
    }

    public typesList: string[] = TYPES_LIST
    public weightCategories: IProfileVehicleWeightCategories[] = WEIGHT_CATEGORIES

    public get weightCategorieValues(): string[] {
        return this.weightCategories.map(item => item.code);
    }

    public get modelsOptions(): number[] {
        return this.models.map((item: IVehicleModels) => item.id);
    }

    public customLabelWeightCategories(code: string): string {
        const option = this.weightCategories.find(option => option.code === code);
        return option?.title ?? ''
    }

    public customLabelModels(id: number): string {
        const option = this.models.find(option => option.id === id);
        return option?.name || '';
    }

    public created(): void {
        if(this.isEdit) {
            this.fields = { 
                vin: this.fieldsData.vin,
                motorCode: this.fieldsData.motorCodes && this.fieldsData.motorCodes[0] ? this.fieldsData.motorCodes[0] : null,
                powerHpFrom: this.fieldsData.powerHp || null,
                tonnage: null,
                yearOfConstrFrom: this.fieldsData.yearOfConstrFrom || null,
                firstRegistrationAt: this.fieldsData.firstRegistration || null,
                firstRegistrationInLitAt: this.fieldsData.firstRegistrationInLit || null,
                licensePlate: this.fieldsData.licensePlate || null,
                technicalInspectionAt: this.fieldsData.technicalInspection || null,
                tachographInspectionAt: this.fieldsData.tachographInspection || null,
                counterparty: this.fieldsData.counterparty,
                weightCategory: this.fieldsData.weightCategory,
                note: this.fieldsData.note || null,
                vehicleModel: this.fieldsData?.model?.id,
                translation: {
                    constructionType: this.fieldsData.constructionType
                }
            }
        }
    }

    public get processingRequest(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    @Emit('close')
    public close(): void {}

    public errorHandler(): void {
        if(this.error && this.error.message) {
            this.processingState = false;
        }
    }

    private async addVehicle(): Promise<any> {
        this.processingState = true
        this.$v.$touch()

        if(!this.$v.$invalid) {
            await this.addProfileVehicle({ ...this.fields })

            if(this.status === EStatus.SUCCESS) {
                this.close()
                this.$notify({
                    type: EMessageTypes.SUCCESS,
                    title: this.$t('ProfilePage.modals.newVehicle.label_added_vehicle').toString()
                })
            }

            if(this.status === EStatus.ERROR) {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: this.error?.message
                })
            }
        }
    }

    private async editVehicle(): Promise<any> {
        this.processingState = true
        this.$v.$touch()

        if(!this.$v.$invalid) {
            await this.editProfileVehicle({ payload: this.fields, vehicleID: this.vehicleID })

            if(this.status === EStatus.SUCCESS) {
                this.close()
                this.$notify({
                    type: EMessageTypes.SUCCESS,
                    title: this.$t('ProfilePage.modals.newVehicle.label_edited_vehicle').toString()
                })
            }

            if(this.status === EStatus.ERROR) {
                this.$notify({
                    type: EMessageTypes.DANGER,
                    title: this.error?.message
                })
            }
        }
    }

    public submitHandler(): void {
        this.isEdit ? this.editVehicle() : this.addVehicle();
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

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

.catalog-sorting__form-control.form-control--invalid {
    border-color: #e50145!important;
}

.form-block {
    position: relative;
}

.modal-new-vehicle {
    &__text {
        color: $color-dark-blue;
    }
}

.form-error {
    font-size: 12px;
    margin-top: 5px;
    text-align: right;
    color: $color-pink;
}

.errors-list {
    margin-top: 5px;
}
</style>
