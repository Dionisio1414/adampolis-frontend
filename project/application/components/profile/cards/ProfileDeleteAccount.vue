<template>
    <ProfileInfoCard>
        <template v-slot:header>
            <div class="card__header card__header--no-border">
                {{ $t('ProfilePage.deleteAccount.title') }}
            </div>
        </template>
        <template #button>
            <button class="btn btn--label-red" @click="openModal">{{ $t('ProfilePage.buttons.delete') }}</button>
        </template>
    </ProfileInfoCard>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import ProfileInfoCard from './ProfileInfoCard.vue';
import ProfileInfoCardButton from '../ProfileInfoCardButton.vue';
import ModalDeactivateAccount from '../modals/ModalDeactivateAccount.vue';
import { MODAL_CONFIG } from '@/constants/modalConfig';

@Component({
    components: {
        ProfileInfoCard,
        ProfileInfoCardButton,
        ModalDeactivateAccount
    }
})
export default class ComponentProfileDeleteAccount extends Vue {
    public $modal: any;

    public openModal() {
        this.$modal.show(
            ModalDeactivateAccount,
            { modal: this.$modal },
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

.profile-password-settings {
    &__body {
        padding: 20px;
    }
}
</style>
