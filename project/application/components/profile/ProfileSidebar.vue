<template>
    <div class="profile-sidebar">
        <div class="card card--shadow d-none d-lg-block">
            <div class="profile-sidebar__links">
                <NuxtLink
                    v-for="(link, index) in links"
                    :key="index"
                    :to="link.path"
                    class="profile-sidebar__link"
                    @click="changePage(index)"
                >
                    {{ $t(link.localeName) }}
                </NuxtLink>
            </div>
        </div>
        <div class="d-block d-lg-none">
            <AccordionTab :title="currentTab && $t(currentTab.localeName)">
                <div class="profile-sidebar__links">
                    <NuxtLink
                        v-for="(link, index) in links"
                        :key="index"
                        :to="link.path"
                        class="profile-sidebar__link"
                    >
                        {{ $t(link.localeName) }}
                    </NuxtLink>
                </div>
            </AccordionTab>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import AccordionTab from '@/components/AccordionTab.vue';

@Component({
    components: {
        AccordionTab
    }
})
export default class ComponentProfileSidebar extends Vue {
    public links = [
        {
            name: 'Main',
            path: '/profile/',
            localeName: 'ProfilePage.tabs.profile'
        },
        {
            name: 'Orders',
            path: '/profile/orders',
            localeName: 'ProfilePage.tabs.orders'
        },
        {
            name: 'SavedProducts',
            path: '/profile/favourites',
            localeName: 'ProfilePage.tabs.favourites'
        }
    ];

    public get currentTab(): string {
        return this.links.find(elem => elem.path === this.$route.fullPath) as any;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.profile-sidebar {
    &__links {
        display: flex;
        flex-direction: column;
    }

    &__link {
        color: $color-black;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 22px;
        text-decoration: none;
        padding: 9px 0 9px 16px;
        margin: 6px 0;
        border-left: 4px solid transparent;

        &:first-child {
            margin-top: 11px;
        }

        &:last-child {
            margin-bottom: 11px;
        }
    }
}

@include media-lg {
    .profile-sidebar {
        margin-bottom: 20px;

        &__link {
            padding: 10px 15px 10px 15px;
            margin: 0;

            &:first-child {
                margin-top: 0px;
                padding-top: 15px;
            }

            &:last-child {
                margin-bottom: 0px;
                padding-bottom: 20px;
            }
        }
    }
}

.link-active-exact {
    color: $color-pink;
    border-left-color: $color-pink;

    @include media-lg {
        color: $color-pink;
        border-left-color: transparent;
    }
}
</style>
