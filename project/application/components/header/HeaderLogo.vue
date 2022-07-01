<template>
    <NuxtLink :to="localePath('/')" class="btn btn--flex header-logo">
        <div class="header-logo__img"></div>
    </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentHeaderLogo extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.header-logo {
    padding: 0;

    &__img {
        background-image: url('../../assets/images/adampolis-logo-2x.png');
        background-size: contain;
        background-repeat: no-repeat;
        height: 56px;
        width: 203px;
    }
}

@include media-lg {
    .header-logo {
        &__img {
            background-image: url('../../assets/images/adampolis-logo.png');
            height: 26px;
            width: 94.25px;
        }
    }
}
</style>
