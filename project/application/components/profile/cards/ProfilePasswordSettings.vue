<template>
    <ProfileInfoCard>
        <template v-slot:header>
            <div class="card__header card__header--no-border">
                {{ $t('ProfilePage.passwordSettings.title') }}
            </div>
        </template>
        <template #button>
            <button class="btn btn--label-grey" @click="openModal">{{ $t('ProfilePage.buttons.edit') }}</button>
        </template>
    </ProfileInfoCard>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import ProfileInfoCard from './ProfileInfoCard.vue';
import ProfileInfoCardButton from '../ProfileInfoCardButton.vue';
import ModalChangePassword from '../modals/ModalChangePassword.vue';
import { MODAL_CONFIG } from '@/constants/modalConfig';

@Component({
    components: {
        ProfileInfoCard,
        ProfileInfoCardButton,
        ModalChangePassword
    }
})
export default class ComponentProfilePasswordSettings extends Vue {
    public $modal: any;

    public openModal() {
        this.$modal.show(
            ModalChangePassword,
            { modal: this.$modal },
            { ...MODAL_CONFIG, classes: 'modal--mobile-full' }
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
