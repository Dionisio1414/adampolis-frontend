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

export default class ComponentHeaderLink extends mixins(MixinTypeLinkWrapper) {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.header-links {
    &__link {
        font-size: 12px;
        color: $color-default;
        padding: 13px 12px;

        &:last-child {
            padding-right: 0;
        }
    }
}

</style>
