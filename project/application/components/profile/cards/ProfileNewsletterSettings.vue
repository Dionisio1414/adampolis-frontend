<template>
    <ProfileInfoCard>
        <template v-slot:header>
            <div class="card__header card__header--no-border">
                {{ $t('ProfilePage.newsletterSettings.title') }}
            </div>
        </template>
        <template #button>
            <button class="btn btn--label-grey" @click="openModal">{{ $t('ProfilePage.buttons.edit') }}</button>
        </template>
    </ProfileInfoCard>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import ProfileInfoCard from './ProfileInfoCard.vue';
import ProfileInfoCardButton from '../ProfileInfoCardButton.vue';
import ModalNewsletterSettings from '../modals/ModalNewsletterSettings.vue';
import { MODAL_CONFIG } from '@/constants/modalConfig';
import { IProfileData } from '~/types/profile-data.interface';

@Component({
    components: {
        ProfileInfoCard,
        ProfileInfoCardButton,
        ModalNewsletterSettings
    }
})
export default class ComponentProfileNewsletterSettings extends Vue {
    @Prop()
    public profileData!: IProfileData;
    public $modal: any;

    public openModal() {
        this.$modal.show(
            ModalNewsletterSettings,
            { modal: this.$modal, isSubscribed: this.profileData.isSubscribedToNewsletter },
            {
                ...MODAL_CONFIG,
                classes: 'modal--mobile-full',
                maxWidth: 390
            }
        );
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.profile-newsletter-settings {
    &__body {
        padding: 20px;
    }
}
</style>
