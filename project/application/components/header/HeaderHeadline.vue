<template>
    <div class="mx-auto d-flex header-headline">
        <p>
            {{ $t('Headline.title') }}
            <span class="header-headline__link" @click="openHeadlineCookieModal()">{{ $t('Headline.link') }}</span>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import HeadlineCookieModal from './HeadlineCookieModal.vue';

@Component({})
export default class ComponentHeadline extends Vue {
    public $modal: any;
    public openHeadlineCookieModal(): void {
        this.$modal.show(
            HeadlineCookieModal,
            {},
            {
                resizable: false,
                adaptive: true,
                draggable: false,
                scrollable: false,
                minHeight: 0,
                height: 'auto',
                minWidth: 0,
                maxWidth: 427,
                shiftY: 1,
                shiftX: 1,
                transition: 'modal',
                overlayTransition: 'fade',
                clickToClose: true
            },
            {
                'before-close': this.beforeClose
            }
        );
    }

    beforeClose(event: { params: boolean | null | undefined }) {
        const { params } = event;
        !!params && this.$emit('onSubmitCookie');
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.header-headline {
    background-color: $color-blue;
    color: $color-white;
    padding: 7px 0;
    justify-content: center;
    width: 100%;

    &__link {
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
