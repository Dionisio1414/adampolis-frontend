<template>
    <ProfileInfoCard>
        <template v-slot:header>
            <ProfileInfoCardHeader :title="$t('ProfilePage.componentTitles.ProfileTransportInfo')" @back="back" />
        </template>
        <template #body>
            <div v-if="vehicles && vehicles.length" class="profile-transport-info__body">
                <div class="profile-transport-info__headers">
                    <div class="text text--xxs text--600">{{ $t('ProfilePage.transportInfo.model') }}</div>
                    <div class="d-lg-none text text--xxs">MAN 18.460</div>
                    <div class="text text--xxs text--600">{{ $t('ProfilePage.transportInfo.type') }}</div>
                    <div class="d-lg-none text text--xxs">Sunkvežimis (Vilkikas)</div>
                    <div class="text text--xxs text--600">{{ $t('ProfilePage.transportInfo.vin') }}</div>
                    <div class="d-lg-none text text--xxs">WMAH05ZZZ3G162439</div>
                    <div class="text text--xxs text--600">{{ $t('ProfilePage.transportInfo.license_plate') }}</div>
                    <div class="d-lg-none text text--xxs">ABC123</div>
                    <div class="text text--xxs text--600">{{ $t('ProfilePage.transportInfo.year_of_production') }}</div>
                    <div class="d-lg-none text text--xxs">2008 10 10</div>
                </div>
                <div 
                    class="profile-transport-info__accordion" 
                    v-for="(val, index) in vehicles" 
                    :key="index"
                >
                    <ProfileAccordion 
                        :info="val" 
                        :vehicleID="val.id"
                        @edit="openEditModal" 
                        @delete="openDeleteModal(val.id)"
                    >
                        <template #content>
                            <div class="profile-transport-info__table-container">
                                <table class="profile-transport-info__table table">
                                    <tbody>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.engine_number') }}</td>
                                            <td>{{ val.motorCodes[0] || '-' }}</td>
                                        </tr>
                                        <tr class="profile-transport-info__row-border">
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.engine_capacity') }}</td>
                                            <td>{{ val.powerHp || '-' }}</td>
                                        </tr>
                                        <tr class="profile-transport-info__row-border">
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.weight_category') }}</td>
                                            <td>{{ val.weightCategory ? weightCategorieValues(val.weightCategory) : '-' }}</td>
                                        </tr>
                                        <tr class="profile-transport-info__row-border">
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.first_registration') }}</td>
                                            <td>{{ val.firstRegistration || '-' }}</td>
                                        </tr>
                                        <tr class="profile-transport-info__row-border">
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.first_registration_lithuania') }}</td>
                                            <td>{{ val.firstRegistrationInLit || '-' }}</td>
                                        </tr>
                                        <tr class="profile-transport-info__row-border">
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.date_of_roadworthiness_test') }}</td>
                                            <td>{{ val.technicalInspection || '-' }}</td>
                                        </tr>
                                        <tr class="profile-transport-info__row-border">
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.date_of_tachograph_inspection') }}</td>
                                            <td>{{ val.tachographInspection || '-' }}</td>
                                        </tr>
                                        <tr class="profile-transport-info__row-border">
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.counterparty') }}</td>
                                            <td>{{ val.counterparty || '-' }}</td>
                                        </tr>
                                        <tr class="profile-transport-info__row-border">
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>{{ $t('ProfilePage.transportInfo.comment') }}</td>
                                            <td>
                                                {{ val.note || '-' }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </template>
                    </ProfileAccordion>
                </div>
            </div>
        </template>
        <template v-if="!isManager" #footer>
            <ProfileInfoCardButton 
                @action="openModal" 
                :title="$sanitize($t('ProfilePage.transportinfo.label_add_new_vehicle'))"
            >
            </ProfileInfoCardButton>
        </template>
    </ProfileInfoCard>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, InjectReactive, Action, Getter, Prop } from 'nuxt-property-decorator';
import ProfileInfoCard from './ProfileInfoCard.vue';
import ProfileInfoCardButton from '../ProfileInfoCardButton.vue';
import ProfileAccordion from '../ProfileAccordion.vue';
import ModalNewVehicle from '../modals/ModalNewVehicle.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import ProfileInfoCardHeader from '../ProfileInfoCardHeader.vue';
import { MODAL_CONFIG } from '@/constants/modalConfig';
import { IProfileVehicleDataItems, IProfileVehiclePayloadParams, IProfileVehicleWeightCategories } from '~/types/profile-data.interface';
import { IDictionary } from '~/types/dictionary.interface';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import { WEIGHT_CATEGORIES } from '~/constants/vehicle-lists';
import { IProfileData } from '~/types/profile-data.interface';

@Component({
    components: {
        ProfileInfoCard,
        ProfileInfoCardButton,
        ProfileAccordion,
        ModalNewVehicle,
        ModalConfirmDelete,
        ProfileInfoCardHeader
    }
})
export default class ComponentProfileTransportInfo extends Vue {
    @InjectReactive('PROFILE_VEHICLES_DATA') public vehicles!: IDictionary<IProfileVehicleDataItems[]>

    @Getter('page-profile-vehicle/getError') public error!: any
    @Getter('page-profile-vehicle/getStatus') public status!: EStatus

    @Action('page-profile-vehicle/deleteProfileVehicle') public deleteProfileVehicle!: (vehicleId: number) => Promise<void>
    @Prop({ default: () => {} }) public profileData!: IProfileData;

    public info = {
        model: 'MAN 18.460',
        type: 'Sunkvežimis  (Vilkikas)',
        vin: 'WMAH05ZZZ3G162439',
        license: 'ABC123',
        year: '2008 10 10'
    };

    public $modal: any;
    public weightCategories: IProfileVehicleWeightCategories[] = WEIGHT_CATEGORIES

    public weightCategorieValues(code: string): string | undefined {
        const value: IProfileVehicleWeightCategories | undefined = this.weightCategories.find(item => item.code === code);
        return value?.title;
    }

    public openModal() {
        this.$modal.show(ModalNewVehicle, { modal: this.$modal }, { ...MODAL_CONFIG, classes: 'modal--mobile-full' });
    }

    public openEditModal(fields: IProfileVehiclePayloadParams): void {
        this.$modal.show(
            ModalNewVehicle, 
            { 
                modal: this.$modal,
                fieldsData: fields.payload,
                vehicleID: fields.vehicleID,
                isEdit: true
            }, 
            { ...MODAL_CONFIG, 
            classes: 'modal--mobile-full' 
        });
    }

    public openDeleteModal(vehicleID: number): void {
        this.$modal.show(
            ModalConfirmDelete,
            {
                modal: this.$modal,
                header: 'Patvirtinimas',
                message: this.$t('ProfilePage.deliveryDetails.delete.message').toString(),
                btnCancelTitle: 'Atsisakyti',
                btnSubmitTitle: 'Šalinti',
                callback: (closeHandler: any) => this.deleteHanlder(vehicleID, closeHandler)
            },
            {
                ...MODAL_CONFIG,
                maxWidth: 390
            }
        );
    }

    public async deleteHanlder(vehicleID: number, closeHandler: any): Promise<any> {
        await this.deleteProfileVehicle(vehicleID)

        if(this.status === EStatus.SUCCESS) {
            closeHandler()
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: this.$t('ProfilePage.modals.newVehicle.label_removed_vehicle').toString()
            })
        }

        if(this.status === EStatus.ERROR) {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.error?.message
            })
        }
    }

    public get isManager(): boolean {
        return !!(this.profileData?.isManager);
    }

    @Emit('back') public back(): void {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.profile-transport-info {
    &__body {
        padding: 0px 20px 10px 20px;

        &:first-child {
            padding-top: 20px;
        }

        &:last-child {
            padding-bottom: 20px;
        }
    }

    &__headers {
        padding: 0px 30px 0px 18px;
        display: grid;
        grid-template-columns: 12% 20% 21% 18% 14% 8%;
        text-transform: uppercase;
    }

    &__table-container {
        flex: 0 1 100%;
    }

    &__table {
        width: 100%;
        tr {
            td {
                vertical-align: baseline;
                font-size: 14px;
                line-height: 20px;
                padding: 10px 18px;

                &:last-child {
                    width: 69%;
                }
            }
        }
    }

    &__row-border {
        td {
            border-bottom: 1px solid $color-grey;
            padding: 0 !important;
        }
    }
}

@include media-lg {
    .profile-transport-info {
        &__headers {
            grid-template-columns: 52% 48%;
            font-size: 12px;
            padding: 0 15px 0 15px;
            text-transform: none;
        }

        &__body {
            padding: 0;

            &:first-child {
                padding-top: 14px;
            }

            &:last-child {
                padding-bottom: 0;
            }
        }

        &__table {
            tr {
                display: flex;
                flex-direction: column;
                width: 100%;
                border: none;

                &:first-child {
                    padding-top: 10px;
                }

                &:nth-child(odd) {
                    border: none;
                }

                td {
                    border: none;
                    padding: 8px 15px;
                }
            }
        }
    }
}
</style>
