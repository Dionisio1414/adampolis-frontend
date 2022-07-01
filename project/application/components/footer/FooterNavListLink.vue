<template>
    <NuxtLink
        :to="linkHref"
        :class="classname"
        v-if="item && item.type === 'page'"
    >
        {{ linkTitle }}
    </NuxtLink>
    <a
        :href="linkHref"
        :class="classname"
        target="_blank"
        v-else-if="item && item.type === 'url'"
    >
        {{ linkTitle }}
    </a>
</template>

<script lang="ts">
import { mixins } from 'nuxt-property-decorator';
import MixinTypeLinkWrapper from '~/mixins/type-link-wrapper';

export default class ComponentFooterNavListLink extends mixins(MixinTypeLinkWrapper) {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.footer-nav-list { 
    &__link {
        padding: 4px 0;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 19px;
        color: $color-grey;
        text-align: left;
        font-weight: 300;
        @include media-md {
            width: 100%;
            margin-bottom: 9px;
        }
        &:hover {
            color: lighten($color-grey, 10);
        }
    }
}

</style>