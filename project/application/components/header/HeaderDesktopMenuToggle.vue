<template>
    <Dropdown
        :options="{
            placement: 'bottom-start',
            modifiers: {
                flip: {
                    name: 'flip',
                    enabled: false
                },
                offset: {
                    offset: '0,0'
                },
                keepTogether: {
                    enabled: false
                }
            }
        }"
        trigger="hover"
    >
        <template v-slot="{ doClose }">
            <!-- @mouseleave="submenuActive = null" -->
            <div class="dropdown__body">
                <template v-for="item in menuItemsList">
                    <div v-bind:key="item.id">
                        <div @mouseover="submenuActive = item.id">
                            <NuxtLink
                                :v-bind:key="item.id"
                                :to="localePath(`/catalog/${item.taxon.translations[currentLocal].slug}`)"
                                class="header-desktop-menu-toggle__menu-item"
                                :class="{ 'header-desktop-menu-toggle__menu-item--active': submenuActive === item.id }"
                                @click.native="doClose"
                            >
                                {{ (item.translations[currentLocal] || {}).title }}
                                <i v-if="item.children && item.children.length" class="header-desktop-menu-toggle__icon icon icon--arrow-right-grey"></i>
                            </NuxtLink>
                        </div>
                        <div
                            class="header-desktop-menu-toggle__submenu"
                            :class="{ 'header-desktop-menu-toggle__submenu--active': submenuActive === item.id }"
                            v-if="item.children && item.children.length"
                        >
                            <NuxtLink
                                class="header-desktop-menu-toggle__submenu--item"
                                :to="localePath(`/catalog/${submenuItem.taxon.translations[currentLocal].slug}`)"
                                @click.native="doClose"
                                v-for="submenuItem in item.children"
                                :key="submenuItem.id"
                            >
                                {{ (submenuItem.translations[currentLocal] || {}).title }}
                            </NuxtLink>
                        </div>
                    </div>
                </template>
            </div>
        </template>
        <template v-slot:reference="{ isOpen }">
            <div
                class="header-desktop-menu-toggle__wrapper d-flex"
                :class="{ 'header-desktop-menu-toggle__wrapper--active': isOpen }"
            >
                <i class="header-desktop-menu-toggle__icon icon icon--menu-catalog"></i>
                <div class="header-desktop-menu-toggle__title">
                    {{ menuTitle }}
                </div>
            </div>
        </template>
    </Dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter } from 'nuxt-property-decorator';
import { Dropdown } from '~/components';
import { IShopMenu } from '~/types/shop-menu.interface';
import { IMenuItem } from '~/types/header-menu.interface';

@Component({
    components: { Dropdown }
})
export default class ComponentHeaderDesktopMenuToggle extends Vue {
    @Getter('page-home-menu/getMainMenu') public menu!: [IShopMenu];

    public isOpen = false;
    public submenuActive = null;

    public get menuInstance(): IMenuItem | null {
        return this.menu[0]?.items[0] || null
    }

    public get menuItemsList(): IMenuItem[] {
        return this.menuInstance?.children || []
    }

    public get menuTitle(): string | null {
        return (this.menuInstance?.translations || {})[this.$i18n.locale]?.title || null;
    }

    public get currentLocal(): string {
        return this.$i18n.locale;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.dropdown__body {
    border-radius: unset;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-width: 285px;
    position: relative;
}

.header-desktop-menu-toggle__wrapper {
    padding: 18px 20px;
    align-items: center;
    min-width: 285px;
    background-color: $color-pink;
    cursor: pointer;
    transition: $transition;
    position: relative;
    z-index: 999;
    margin-right: 10px;

    &--active {
        background-color: lighten($color-pink, 10);
    }

    i {
        font-size: 20px;
    }
}
.header-desktop-menu-toggle__title {
    color: $color-white;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 24px;
    padding-left: 20px;
}

.header-desktop-menu-toggle__menu-item {
    padding: 16px 11px 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-dark-blue;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 22px;
    text-decoration: none;

    i {
        font-size: 11px;
    }

    &--active,
    &:hover,
    &:focus,
    &:active {
        background-color: $color-grey;
    }
    border-bottom: 1px solid $color-grey;
}

.header-desktop-menu-toggle__submenu {
    position: absolute;
    top: 0;
    left: 285px;
    display: none;
    flex-direction: column;
    background: $color-white;
    padding: 25px 30px;
    min-width: 290px;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
    min-height: 100%;

    &--active {
        display: flex;
    }

    &--item {
        padding: 6px 0;
        margin: 2px 0;
        color: $color-black;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 19px;
        text-decoration: none;

        &:hover {
            color: $color-pink;
        }
    }
}
</style>
