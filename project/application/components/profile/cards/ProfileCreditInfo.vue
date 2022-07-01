<template>
    <ProfileInfoCard>
        <template v-slot:header>
            <ProfileInfoCardHeader :title="$t('ProfilePage.componentTitles.ProfileCreditInfo')" @back="back" />
        </template>

        <template #body>
            <div class="profile-credit-info__body">
                <div class="profile-credit-info__table-container">
                    <table class="profile-credit-info__table">
                        <tbody>
                            <tr>
                                <td>{{ $t('ProfilePage.creditInfo.number_of_orders') }}</td>
                                <td >
                                    {{ profileCreditLine && profileCreditLine.creditOrderCount ? profileCreditLine.creditOrderCount : '-' }}
                                </td>
                            </tr>
                            <tr>
                                <td>{{ $t('ProfilePage.creditInfo.amount_of_orders') }}</td>
                                <td>{{ profileCreditLine && profileCreditLine.creditOrderSum ? $n(profileCreditLine.creditOrderSum, 'currency') : '-' }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('ProfilePage.creditInfo.permissible_indebtedness') }}</td>
                                <td>{{ profileCreditLine && profileCreditLine.limit ? $n(profileCreditLine.limit, 'currency') : '-' }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('ProfilePage.creditInfo.permissible_deferral') }}</td>
                                <td>{{ profileCreditLine && profileCreditLine.creditDays ? `${profileCreditLine.creditDays} d.` : '-' }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('ProfilePage.creditInfo.orders_allowed') }}</td>
                                <td v-if="profileCreditLine && profileCreditLine.allow">{{ $t('ProfilePage.creditInfo.orders_allowed_yes') }}</td>
                                <td v-else>{{ $t('ProfilePage.creditInfo.orders_allowed_no') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <template v-if="!isManager" #footer>
            <ProfileInfoCardButton 
                @action="openModal" 
                :title="$sanitize($t('ProfilePage.creditInfo.get_line_credit'))"
            >
            </ProfileInfoCardButton>
        </template>
    </ProfileInfoCard>
</template>

<script lang="ts">
import { Vue, Component, Emit, InjectReactive, Prop } from 'nuxt-property-decorator';
import ProfileInfoCard from './ProfileInfoCard.vue';
import ProfileInfoCardButton from '../ProfileInfoCardButton.vue';
import ModalCreditRequest from '../modals/ModalCreditRequest.vue';
import ProfileInfoCardHeader from '../ProfileInfoCardHeader.vue';
import { MODAL_CONFIG } from '@/constants/modalConfig';
import { IProfileCreditLine, IProfileData } from '~/types/profile-data.interface';

@Component({
    components: {
        ProfileInfoCard,
        ProfileInfoCardButton,
        ModalCreditRequest,
        ProfileInfoCardHeader
    }
})
export default class ComponentProfileCreditInfo extends Vue {
    @InjectReactive('PROFILE_CREDIT_LINE_DATA') public profileCreditLine!: IProfileCreditLine;
    @Prop({ default: () => {} }) public profileData!: IProfileData;

    public $modal: any;

    @Emit('back') public back(): void {}

    public openModal() {
        this.$modal.show(
            ModalCreditRequest,
            { modal: this.$modal },
            { ...MODAL_CONFIG, classes: 'modal--mobile-full' }
        );
    }

    public get isManager(): boolean {
        return !!(this.profileData?.isManager);
    }

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.profile-credit-info {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 20px;
        border: 1px solid transparent;
        border-bottom: 1px solid rgba($color: $color-grey, $alpha: 0.6);
        color: $color-dark-blue;
    }

    &__body {
        padding: 20px 20px 19px 20px;
    }

    &__table-container {
        flex: 0 1 100%;
    }

    &__table {
        width: 100%;
        tr {
            &:nth-child(odd) {
                background: $color-light-grey;
            }
            td {
                font-size: 14px;
                line-height: 22px;
                padding: 5px 10px;
                color: $color-default;
                &:first-child {
                    font-weight: 600;
                    color: $color-dark-blue;
                }

                &:last-child {
                    width: 68%;
                }
            }
        }
    }
}

@include media-lg {
    .profile-credit-info {
        &__body {
            padding: 15px;
        }

        &__table {
            tr {
                display: flex;
                flex-direction: column;
                width: 100%;

                td {
                    width: 100%;

                    &:first-child {
                        padding: 10px 10px 0px 10px;
                    }

                    &:last-child {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>
