<template>
    <ProfileInfoCard>
        <template v-slot:header>
            <ProfileInfoCardHeader :title="$t('ProfilePage.tabs.profile')" @back="back" />
        </template>
        <template #body>
            <div class="profile-company-info__body">
                <div class="profile-company-info__heading text text--600 text--xs">
                    <template v-if="profileData.isCompany">
                        {{ $t('ProfilePage.companyInfo.title') }}
                    </template>
                    <template v-else>
                        {{ $t('ProfilePage.userInfo.title') }}
                    </template>
                </div>
                <div class="profile-company-info__info">
                    <template v-if="profileData.isCompany">
                        <p class="profile-company-info__text text text--xs">{{ profileData && profileData.companyName }}</p>
                        <p class="profile-company-info__text text text--xs">{{ profileData && profileData.vatCode }}</p>
                        <p class="profile-company-info__text text text--xs">{{ profileData && profileData.companyCode }}</p>
                        <p v-if="companyAddress" class="profile-company-info__text text text--xs">
                            {{ `${companyAddress && companyAddress.street}, ${companyAddress && companyAddress.city}` }}
                        </p>
                    </template>
                    <template v-else>
                        <p class="profile-company-info__text text text--xs">
                            {{ profileData.fullName && profileData.fullName }}
                        </p>
                        <p class="profile-company-info__text text text--xs">
                            {{ profileData.phoneNumber && profileData.phoneNumber }}
                        </p>
                    </template>
                </div>
                <div class="profile-company-info__button-container">
                    <button v-if="!isManager" class="profile-company-info__button btn btn--label-grey" @click="openModal">
                        {{ $t('ProfilePage.buttons.edit') }}
                    </button>
                </div>
            </div>
        </template>
    </ProfileInfoCard>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'nuxt-property-decorator';
import ProfileInfoCard from './ProfileInfoCard.vue';
import ProfileInfoCardButton from '../ProfileInfoCardButton.vue';
import ProfileInfoCardHeader from '../ProfileInfoCardHeader.vue';
import ModalCompanyInfo from '../modals/ModalCompanyInfo.vue';
import ModalCustomerInfo from '../modals/ModalCustomerInfo.vue';
import { MODAL_CONFIG } from '@/constants/modalConfig';
import { IProfileData, IAddress } from '@/types/profile-data.interface';

@Component({
    components: {
        ProfileInfoCard,
        ProfileInfoCardButton,
        ModalCompanyInfo,
        ProfileInfoCardHeader,
        ModalCustomerInfo
    }
})
export default class ComponentProfileCompanyInfo extends Vue {
    public $modal: any;

    @Prop({ default: () => {} })
    public profileData!: IProfileData;

    public get isManager(): boolean {
        return !!(this.profileData?.isManager);
    }

    public get companyAddress(): IAddress | void {
        return this.profileData && this.profileData.companyAddress;
    }

    public openModal() {
        
        if(this.profileData.isCompany) {
            this.$modal.show(
                ModalCompanyInfo,
                {
                    modal: this.$modal,
                    modalData: {
                        companyName: this.profileData.companyName,
                        companyCode: this.profileData.companyCode,
                        vatCode: this.profileData.vatCode,
                        id: this.profileData.id,
                        phoneNumber: this.profileData.phoneNumber,
                        isCompany: this.profileData.isCompany,
                        companyAddress: {
                            city: this.profileData.companyAddress?.city,
                            street: this.profileData.companyAddress?.street,
                            postcode: this.profileData.companyAddress?.postcode,
                            countryCode: this.profileData.companyAddress?.countryCode
                        }
                    }
                },
                { ...MODAL_CONFIG, classes: 'modal--mobile-full' }
            );
        } else {
            this.$modal.show(
                ModalCustomerInfo,
                {
                    modal: this.$modal,
                    modalData: {
                        firstName: this.profileData.firstName,
                        lastName: this.profileData.lastName,
                        id: this.profileData.id,
                        phoneNumber: this.profileData.phoneNumber,
                        email: this.profileData.email,
                        isCompany: this.profileData.isCompany,
                    }
                },
                { ...MODAL_CONFIG, classes: 'modal--mobile-full' }
            );
        }

    }

    @Emit('back') public back(): void {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.profile-company-info {
    &__body {
        display: flex;
        justify-content: space-between;
        padding: 18px;
    }

    &__heading {
        color: $color-dark-blue;
    }

    &__info {
        flex-basis: 46%;
    }

    &__text {
        color: $color-search-bg;
        line-height: 21px;
    }
}

@include media-lg {
    .profile-company-info {
        &__body {
            flex-direction: column;
            padding: 15px;
        }

        &__info {
            margin: 10px 0 20px 0;
        }
    }
}
</style>
