<template>
    <div class="header-search-nav">
        <div class="header-search-nav__inner container ">
            <HeaderDesktopMenuToggle class="d-lg-flex"></HeaderDesktopMenuToggle>
            <Search></Search>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import HeaderDesktopMenuToggle from '~/components/header/HeaderDesktopMenuToggle.vue';
import Search from '~/components/Search.vue';

@Component({
    components: {
        HeaderDesktopMenuToggle,
        Search
    }
})
export default class ComponentHeaderSearchNav extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.header-search-nav {
    background-color: $color-dark-blue;

    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

@include media-lg {
    .header-search-nav {
        &__inner {
            background-color: $color-dark-grey;
            padding: 10px;
        }
    }
}
</style>
