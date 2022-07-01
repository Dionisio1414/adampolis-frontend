<template>
    <div class="profile-main">
        <div class="row">
            <div v-if="!isMobile" class="col d-none d-lg-block">
                <component
                    v-for="(component, i) in tabs"
                    :key="i"
                    :is="component"
                    :profileData="profileData"
                    class="profile-main__card"
                />

                <ProfilePasswordSettings class="profile-main__card" />
                <ProfileNewsletterSettings :profileData="profileData" class="profile-main__card" />
                <ProfileDeleteAccount class="profile-main__card" />
            </div>
            <div v-else class="col d-block d-lg-none mobile">
                <div v-if="!activeTab">
                    <div class="card-group">
                        <div
                            class="profile-main__card--mobile card card__header card--bordered"
                            v-for="(tab, i) in tabs"
                            :key="i"
                            @click="selectTab(tab)"
                        >
                            <span class="text text--s text--bold">
                                {{ $t(`ProfilePage.componentTitles.${tab}`) }}
                            </span>
                            <span class="profile-main__icon-container">
                                <i class="icon icon--arrow-down-black"></i>
                            </span>
                        </div>
                    </div>

                    <ProfilePasswordSettings class="profile-main__card" />
                    <ProfileNewsletterSettings :profileData="profileData" class="profile-main__card" />
                    <ProfileDeleteAccount class="profile-main__card" />
                </div>
                <div v-else>
                    <component :is="activeTab" :profileData="profileData" @back="backToMain" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Getter, mixins, ProvideReactive } from 'nuxt-property-decorator';
import {
    ProfileCreditInfo,
    ProfileCompanyInfo,
    ProfileContractsInfo,
    ProfileTransportInfo,
    ProfileDeliveryDetails,
    ProfilePasswordSettings,
    ProfileDeleteAccount,
    ProfileNewsletterSettings
} from '@/components/profile';
import AccordionTab from '@/components/AccordionTab.vue';
import MixinWindowSize from '~/mixins/window-size';
import { IProfileCreditLine, IProfileContracts, IProfileData, IProfileVehicleData, IProfileVehicleDataItems } from '~/types/profile-data.interface';
import { IDictionary } from '~/types/dictionary.interface';

@Component({
    components: {
        ProfileCreditInfo,
        ProfileCompanyInfo,
        ProfileContractsInfo,
        ProfileTransportInfo,
        ProfileDeliveryDetails,
        ProfilePasswordSettings,
        ProfileDeleteAccount,
        ProfileNewsletterSettings,
        AccordionTab
    }
})
export default class ProfileMain extends mixins(MixinWindowSize) {
    @Getter('page-profile-data/getProfileData') public profileData!: IProfileData;
    @Getter('page-profile-credit-line/getProfileCreditLine') public profileCreditLine!: IProfileCreditLine;
    @Getter('page-profile-contracts/getProfileContracts') public profileContracts!: IProfileContracts;
    @Getter('page-profile-vehicle/getVehicles') public vehicles!: IProfileVehicleData;

    public activeTab: string = '';
    public tabs: string[] = [
        'ProfileCreditInfo',
        'ProfileCompanyInfo',
        'ProfileDeliveryDetails',
        'ProfileTransportInfo',
        'ProfileContractsInfo'
    ];

    @ProvideReactive('PROFILE_CREDIT_LINE_DATA')
    public get provideProfileCreditLine(): IProfileCreditLine {
        return this.profileCreditLine ?? null;
    }
    
    @ProvideReactive('PROFILE_CONTRACTS_DATA')
    public get provideProfileContracts(): IProfileContracts {
        return this.profileContracts ?? {};
    }

    @ProvideReactive('PROFILE_VEHICLES_DATA')
    public get provideVehicles(): IDictionary<IProfileVehicleDataItems[]> {
        return this.vehicles?.items;
    }

    async asyncData({ store, error }: any): Promise<void> {
        try {
            await Promise.all([
                store.dispatch('countries-list/fetchCoutriesList'),
                store.dispatch('page-profile-data/fetchProfileData'),
                store.dispatch('page-profile-credit-line/fetchProfileCreditLine'),
                store.dispatch('page-profile-contracts/fetchProfileContracts'),
                store.dispatch('page-profile-vehicle/fetchProfileVehicle'),
                store.dispatch('vehicle/fetchVehicleModels')
            ])
        } catch(e: any) {
            if(e?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(e);
        }
    }

    public backToMain(): void {
        this.activeTab = '';
    }

    public selectTab(tab: string): void {
        this.activeTab = tab;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.profile-main {
    &__card {
        margin-bottom: 18px;
        line-height: 22px;

        &:last-child {
            margin-bottom: 0;
        }

        &--mobile {
            margin-bottom: 0;
            padding: 20px 15px;

            &:last-child {
                margin-bottom: 20px;
            }
        }
    }

    &__icon-container {
        transform: rotate(-90deg);
    }
}

@include media-lg {
    .profile-main {
        &__card {
            margin-bottom: 15px;
        }
    }
}
</style>
