<template>
    <ProfileInfoCard>
        <template v-slot:header>
            <ProfileInfoCardHeader :title="$t('ProfilePage.componentTitles.ProfileContractsInfo')" @back="back" />
        </template>
        <template #body>
            <div class="profile-contracts-info__body">
                <div class="d-none d-lg-block">
                    <table class="table table--striped profile-contracts-info__table">
                        <tr class="table__row">
                            <td class="table__cell table__cell--header">{{ $t('ProfilePage.contractsInfo.model') }}</td>
                            <!-- <td class="table__cell table__cell--header">
                                {{ $t('ProfilePage.contractsInfo.status') }}
                            </td> -->
                            <td class="table__cell table__cell--header">
                                {{ $t('ProfilePage.contractsInfo.valid_until') }}
                            </td>
                            <td class="table__cell table__cell--header">
                                {{ $t('ProfilePage.contractsInfo.documents') }}
                            </td>
                        </tr>
                        <tr class="table__row">
                            <td class="table__cell">
                                {{ profileContracts.No || '' }}
                            </td>
                            <!-- <td class="table__cell"></td> -->
                            <td class="table__cell">
                                {{ $dayjs(profileContracts.ValidTo).format('YYYY MM DD') || '' }}
                                <!-- {{ $d(profileContracts.ValidTo, 'short') }} -->
                            </td>
                            <td class="table__cell">
                                <div 
                                    class="profile-contracts-info__buttons"
                                >
                                    <div class="profile-contracts-info__buttons-col">
                                        <DownloadButton
                                            v-for="(val, index) in filesList" 
                                            :url="val"
                                            :key="index"
                                        >
                                        </DownloadButton>
                                    </div>
                                    <div class="profile-contracts-info__buttons-col">
                                        <a 
                                            :href="val" 
                                            class="btn btn--label-blue profile-contracts-info__button"
                                            target="_blank"
                                        >
                                            {{ $t('ProfilePage.buttons.review') }}
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="d-lg-none">
                    <div class="profile-contracts-info__mobile-table">
                        <div class="profile-contracts-info__mobile-cell">
                            <div class="profile-contracts-info__mobile-header text text--xxs text--600">
                                {{ $t('ProfilePage.contractsInfo.model') }}
                            </div>
                            <div class="text text--xxs">{{ profileContracts.No || '' }}</div>
                        </div>
                        <!-- <div class="profile-contracts-info__mobile-cell">
                            <div class="profile-contracts-info__mobile-header text text--xxs text--600">
                                {{ $t('ProfilePage.contractsInfo.status') }}
                            </div>
                            <div class="text text--xxs">Galioja</div>
                        </div> -->
                        <div class="profile-contracts-info__mobile-cell">
                            <div class="profile-contracts-info__mobile-header text text--xxs text--600">
                                {{ $t('ProfilePage.contractsInfo.valid_until') }}
                            </div>
                            <div class="text text--xxs">{{ $dayjs(profileContracts.ValidTo).format('YYYY MM DD') || '' }}</div>
                        </div>
                        <div class="profile-contracts-info__mobile-cell">
                            <div class="profile-contracts-info__mobile-header text text--xxs text--600">
                                {{ $t('ProfilePage.contractsInfo.documents') }}
                            </div>
                            <div class="profile-contracts-info__buttons">
                                <DownloadButton
                                    class="download-button"
                                    v-for="(val, index) in filesList" 
                                    :url="val"
                                    :key="index"
                                >
                                </DownloadButton>
                            </div>
                        </div>
                        <button class="btn btn--label-blue profile-contracts-info__button">
                            {{ $t('ProfilePage.buttons.review') }}
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </ProfileInfoCard>
</template>

<script lang="ts">
import { Component, InjectReactive, mixins } from 'nuxt-property-decorator';
import ProfileInfoCard from './ProfileInfoCard.vue';
import ProfileInfoCardButton from '../ProfileInfoCardButton.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import ProfileInfoCardHeader from '../ProfileInfoCardHeader.vue';
import { IProfileContracts } from '~/types/profile-data.interface';
import mixinAccordion from '~/mixins/accordion';
import SlideUpDown from 'vue-slide-up-down';

@Component({
    components: {
        ProfileInfoCard,
        ProfileInfoCardButton,
        DownloadButton,
        ProfileInfoCardHeader,
        SlideUpDown
    }
})
export default class ComponentProfileContractsInfo extends mixins(mixinAccordion) {
    @InjectReactive('PROFILE_CONTRACTS_DATA') public profileContracts!: IProfileContracts;
    
    public get filesList(): string[] {
        const { apiURL } = this.$config;
        return (this.profileContracts.files || []).map(item => `${apiURL}${item}`)
    }

    public back(): void {
        this.$emit('back');
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.profile-contracts-info__mobile-cell .profile-contracts-info__buttons {
    flex-direction: column;
    align-items: flex-start;
}

.profile-contracts-info {
    &__table__cell {
        vertical-align: baseline;
    }
    
    &__body {
        padding: 20px;
    }

    &__buttons {
        display: flex;
        align-items: flex-start;
        .download-button:not(:last-child) {
            margin-bottom: 5px;
        }
    }

    &__button {
        margin-left: 20px;
    }

    &__mobile-table {
        display: flex;
        flex-direction: column;
    }

    &__mobile-cell {
        display: grid;
        grid-template-columns: 50% 50%;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}

@include media-lg {
    .profile-contracts-info {
        &__body {
            padding: 15px;
        }

        &__button {
            margin-left: 0;
            margin-top: 8px;
            padding: 7px;
        }
    }
}
</style>
