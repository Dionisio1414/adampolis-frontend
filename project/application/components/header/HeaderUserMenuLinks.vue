<template>
    <div>
        <NuxtLink
            :to="item.link"
            v-for="item in headerUserMenuLinks"
            :key="item.title"
            class="dropdown__trigger dropdown__trigger-flex link"
            @click.native="clickAction"
        >
            {{ $t(`${item.title}`) }}
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { HAEDER_USER_MENU_LINKS } from '../../constants/headerUserMenuLinks';

@Component({})
export default class ComponentHeaderUserMenuLinks extends Vue {
    public headerUserMenuLinks = HAEDER_USER_MENU_LINKS;
    public clickAction(): void {
        this.$emit('onNavigate');
    }
}
</script>

<style lang="scss" scoped>
</style>
