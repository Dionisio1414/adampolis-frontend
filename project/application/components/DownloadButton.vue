<template>
    <a 
        :href="url" 
        class="download-button" 
        download
    >
        <i class="icon icon--document download-button__icon"></i>
        <span class="download-button__name">{{ $sanitize($t('ProfilePage.buttons.download')) }}</span>
    </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
@Component({})
export default class ComponentDownloadButton extends Vue {
    @Prop() public url!: string;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.download-button {
    display: flex;
    align-items: center;
    color: $color-pink;

    &__icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }

    &__name {
        font-size: 14px;
        color: $color-pink;
    }
}
</style>
