<template>
    <ProfileInfoCard>
        <template v-slot:header>
            <ProfileInfoCardHeader :title="$sanitize(profileInfoTitle)" @back="back" />
        </template>
        <template #body>
            <div class="profile-delivery-detail__body">
                <template v-if="informationList && informationList.length && isTheCompany">
                    <div class="profile-delivery-detail__section" v-for="customer in informationList" :key="customer.id">
                        <div class="profile-delivery-detail__block">
                            <div class="profile-delivery-detail__row">
                                <div class="profile-delivery-detail__heading text text--xs text--600">
                                    {{ $t('ProfilePage.deliveryDetails.contact_person') }}
                                </div>
                                <div class="profile-delivery-detail__text-container">
                                    <p class=" text text--xs profile-delivery-detail__text">{{ customer.fullName }}</p>
                                    <div class="profile-delivery-detail__text--link text text--xs">
                                        {{ customer.email }}
                                    </div>
                                    <p class=" text text--xs profile-delivery-detail__text">{{ customer.phoneNumber }}</p>
                                </div>
                            </div>
                            <div v-if="customer.isCompany" class="profile-delivery-detail__row">
                                <div class="profile-delivery-detail__heading text text--xs text--600">
                                    {{ $t('ProfilePage.deliveryDetails.delivery_address') }} 1
                                </div>
                                <div class="profile-delivery-detail__text-container">
                                    <p class=" text text--xs profile-delivery-detail__text">
                                        {{
                                            `${customer.companyAddress.street}, ${
                                                customer.companyAddress.city
                                            }, ${getCountry(customer.companyAddress.countryCode)}`
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-show="!isManager" class="profile-delivery-detail__buttons">
                            <div
                                v-if="customer.isDefault"
                                class="profile-delivery-detail__button profile-delivery-detail__button--no-select btn btn--label-green"
                                :disabled="isProcessingAddress"
                            >
                                {{ $t('ProfilePage.buttons.primary') }}
                            </div>
                            <button
                                v-else
                                class="profile-delivery-detail__button btn btn--label-grey-border"
                                @click="setDefaultHandler(customer.id)"
                                :disabled="isProcessingAddress"
                            >
                                {{ $t('ProfilePage.buttons.set_primary') }}
                            </button>

                            <button
                                class="profile-delivery-detail__button btn btn--label-grey"
                                @click="editDetails(customer.id)"
                                :disabled="isProcessingAddress"
                            >
                                {{ $t('ProfilePage.buttons.edit') }}
                            </button>
                            <button
                                class="profile-delivery-detail__button profile-delivery-detail__button--small btn btn--label-red"
                                @click="openDeleteModal(customer.id)"
                                :disabled="isProcessingAddress"
                            >
                                <i class="icon icon--close-white profile-delivery-detail__icon"></i>
                            </button>
                        </div>
                    </div>
                </template>

                <template v-if="informationList && informationList.length && !isTheCompany">
                    <div class="profile-delivery-detail__section" v-for="address in informationList" :key="address.id">
                        <div class="profile-delivery-detail__block">
                            <div class="profile-delivery-detail__row">
                                <div class="profile-delivery-detail__heading text text--xs text--600">
                                    {{ $t('ProfilePage.deliveryDetails.address.contact_heading') }}
                                </div>
                                <div class="profile-delivery-detail__text-container">
                                    <p class=" text text--xs profile-delivery-detail__text">{{ address.firstName }} {{ address.lastName }}</p>
                                    <div class="profile-delivery-detail__text--link text text--xs">
                                        {{ address.email }}
                                    </div>
                                    <p class=" text text--xs profile-delivery-detail__text">{{ address.phoneNumber }}</p>
                                </div>
                            </div>
                            <div class="profile-delivery-detail__row">
                                <div class="profile-delivery-detail__heading text text--xs text--600">
                                    {{ $t('ProfilePage.deliveryDetails.address.address_heading') }}
                                </div>
                                <div class="profile-delivery-detail__text-container">
                                    <p class=" text text--xs profile-delivery-detail__text">
                                        {{ `${address.street ? address.street + ',' : ''} ${address.city ? address.city + ',' : ''} ${address.countryCode ? getCountry(address.countryCode): ''}` }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-show="!isManager" class="profile-delivery-detail__buttons">
                            <div
                                v-if="defaultAddress && address.id === defaultAddress.id"
                                class="profile-delivery-detail__button profile-delivery-detail__button--no-select btn btn--label-green"
                                :disabled="isProcessingAddress"
                            >
                                {{ $t('ProfilePage.buttons.primary') }}
                            </div>
                            <button
                                v-else
                                class="profile-delivery-detail__button btn btn--label-grey-border"
                                @click="setDefaultHandler(address.id)"
                                :disabled="isProcessingAddress"
                            >
                                {{ $t('ProfilePage.buttons.set_primary') }}
                            </button>

                            <button
                                class="profile-delivery-detail__button btn btn--label-grey"
                                @click="editDetails(address.id)"
                                :disabled="isProcessingAddress"
                            >
                                {{ $t('ProfilePage.buttons.edit') }}
                            </button>
                            <button
                                class="profile-delivery-detail__button profile-delivery-detail__button--small btn btn--label-red"
                                @click="openDeleteModal(address.id)"
                                :disabled="isProcessingAddress"
                            >
                                <i class="icon icon--close-white profile-delivery-detail__icon"></i>
                            </button>
                        </div>
                    </div>
                </template>

                <transition name="fade">
                    <div v-if="isProcessingAddress" class="form-spinner">
                        <Spinner></Spinner>
                    </div>
                </transition>
            </div>
        </template>
        <template v-if="!isManager" #footer>
            <ProfileInfoCardButton 
                @action="openModal" 
                :title="$sanitize(profileInfoButtonLabel)"
                :disabled="isProcessingAddress"
            >
            </ProfileInfoCardButton>
        </template>
    </ProfileInfoCard>
</template>

<script lang="ts">
import { Vue, Component, Prop, Action, Getter, Emit } from 'nuxt-property-decorator';
import ProfileInfoCard from './ProfileInfoCard.vue';
import ProfileInfoCardButton from '../ProfileInfoCardButton.vue';
import ModalNewContact from '../modals/ModalCustomer.vue';
import ModalDeliveryAddress from '../modals/ModalDeliveryAddress.vue';
import ProfileInfoCardHeader from '../ProfileInfoCardHeader.vue';
import ModalDeleteAddress from '../modals/ModalDeleteAddress.vue';
import { MODAL_CONFIG } from '@/constants/modalConfig';
import { IAddressForm, ICustomer, IProfileData } from '~/types/profile-data.interface';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import { ICountryList, ICountryListItem, IFormatedCountriesList } from '~/types/countries-list.interface';
import { ERolesTypes } from '~/constants/roles-types';
import Spinner from '~/components/Spinner.vue';

@Component({
    components: {
        ProfileInfoCard,
        ProfileInfoCardButton,
        ModalNewContact,
        ModalDeliveryAddress,
        ProfileInfoCardHeader,
        ModalDeleteAddress,
        Spinner
    }
})
export default class ComponentProfileDeliveryDetails extends Vue {
    @Getter('countries-list/getCountriesList') public countries!: ICountryList;

    @Getter('page-profile-addresses/getStatus') public status!: EStatus;
    @Getter('page-profile-addresses/getError') public error!: any;

    @Getter('page-profile-customer/getStatus') public customerStatus!: EStatus;
    @Getter('page-profile-customer/getError') public customerError!: any;

    @Getter('page-profile-data/getStatus') public profileDataStatus!: EStatus;

    @Action('page-profile-customer/setDefaultAddress') public setDefaultCustomer!: (id: number) => Promise<void>;
    @Action('page-profile-addresses/setDefaultAddress') public setDefaultAddress!: (id: number) => Promise<void>;

    @Prop({ default: () => {} }) public profileData!: IProfileData;

    public $modal: any;

    public get profileInfoTitle(): string {
        if(this.isTheCompany) {
            return this.$t('ProfilePage.deliveryDetails.title').toString();
        } else {
            return this.$t('ProfilePage.deliveryDetails.address.title').toString();
        }
    }

    public get profileInfoButtonLabel(): string {
        if(this.isTheCompany) {
            return this.$t('ProfilePage.deliveryDetails.label_shipping_and_contact_information').toString();
        } else {
            return this.$t('ProfilePage.deliveryDetails.address.add_an_addres').toString();
        }
    }

    public get profileDeleteMessage(): string {
        if(this.isTheCompany) {
            return this.$t('ProfilePage.deliveryDetails.label_delete_customer').toString();
        } else {
            return this.$t('ProfilePage.deliveryDetails.label_delete_address').toString();
        }
    }

    public get isManager(): boolean {
        return !!(this.profileData?.isManager);
    }

    public get isTheCompany(): boolean {
        return !!(this.profileData.isCompany)
    }

    public get informationList(): ICustomer[] | IAddressForm[] | undefined {
        if(this.profileData && this.profileData.isCompany) {
           return this.profileData?.customers;
        } 
        
        if(this.profileData && !this.profileData.isCompany) {
            return this.profileData?.addresses;
        }

        return undefined;
    }

    public get defaultAddress(): Partial<IAddressForm> | null {
        return this.profileData?.defaultAddress ?? null
    }

    public get isProcessingAddress(): boolean {
        return (
            this.status === EStatus.PROCESSING || 
            this.profileDataStatus === EStatus.PROCESSING || 
            this.customerStatus === EStatus.PROCESSING
        )
    }

    public get countriesList(): IFormatedCountriesList[] {
        const countries = this.countries;
        if (countries.items && countries.items.length) {
            return countries.items.map((item: ICountryListItem) => ({ label: item.name, value: item.code }));
        } else {
            return [];
        }
    }

    public getCountry(countryCode: string): string {
        return this.countriesList.find((elem: any) => elem.value === countryCode)?.label || '';
    }

    public openModal(isEdit: boolean = false, data: ICustomer | IAddressForm): void {
        if(this.isTheCompany) {
            this.$modal.show(
                ModalNewContact,
                { modal: this.$modal, isEdit, customer: data },
                { ...MODAL_CONFIG, classes: 'modal--mobile-full' }
            )
        } else {
            this.$modal.show(
                ModalDeliveryAddress,
                { modal: this.$modal, isEdit, address: data },
                { ...MODAL_CONFIG, classes: 'modal--mobile-full' }
            )
        }
    }

    public editDetails(id: number): void {
        this.informationList?.forEach((val: ICustomer | IAddressForm ) => {
            if(val.id === id) {
                this.openModal(true, val);
                return;
            }
        })
    }

    public openDeleteModal(id: number): void {
        this.$modal.show(
            ModalDeleteAddress,
            {
                modal: this.$modal,
                id,
                type: this.isTheCompany ? ERolesTypes.CUSTOMER : ERolesTypes.INDIVIDUAL,
                deleteMessage!: this.profileDeleteMessage
            },
            {
                ...MODAL_CONFIG,
                maxWidth: 390,
                classes: 'modal--mobile-full'
            }
        );
    }

    public async setDefaultHandler(id: number): Promise<void> {
        if(this.isTheCompany) {
            await this.setDefaultCustomer(id);

            switch(this.customerStatus) {
                case EStatus.SUCCESS:
                    this.$notify({
                        type: EMessageTypes.SUCCESS,
                        title: this.$t('ProfilePage.deliveryDetails.modals.default_customer_label').toString()
                    });
                    return;
                case EStatus.ERROR:
                    this.$notify({
                        type: EMessageTypes.DANGER,
                        title: this.customerError?.message
                    });
                    return;
            }
        } else {
            await this.setDefaultAddress(id);

            switch(this.status) {
                case EStatus.SUCCESS:
                    this.$notify({
                        type: EMessageTypes.SUCCESS,
                        title: this.$t('ProfilePage.deliveryDetails.modals.default_address_label').toString()
                    });
                    return;
                case EStatus.ERROR:
                    this.$notify({
                        type: EMessageTypes.DANGER,
                        title: this.error.message
                    });
                    return;
            }
        }
    }

    @Emit('back')
    public back(): void {}
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

.profile-delivery-detail {
    &__section {
        display: flex;
        justify-content: space-between;
        padding: 20px 20px 15px 20px;

        &:not(:last-child) {
            border-bottom: 1px solid rgba($color-grey, 0.6);
        }
    }

    &__block {
        flex-basis: 67%;
    }

    &__row {
        display: flex;
        justify-content: space-between;

        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    &__text-container {
        flex-basis: 50%;
    }

    &__text {
        color: $color-search-bg;
        line-height: 25px;

        &--link {
            color: $color-pink;
        }
    }

    &__button {
        &:not(:last-child) {
            margin-right: 6px;
        }

        &--small {
            padding: 2px 3px;
        }

        &--no-select {
            pointer-events: none !important;
        }
    }

    &__icon {
        width: 12px;
        height: 12px;
        margin-bottom: -2px;
    }

    &__body {
        position: relative;
    }
}

@include media-lg {
    .profile-delivery-detail {
        &__section {
            flex-direction: column;
            padding: 20px 15px;
        }

        &__row {
            flex-direction: column;
        }

        &__text-container {
            margin-top: 10px;
        }

        &__buttons {
            display: flex;
            margin-top: 20px;
        }

        &__button {
            &:first-child {
                margin-right: auto;
            }
        }
    }
}
</style>
