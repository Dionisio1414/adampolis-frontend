<template>
    <main class="page profile">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="profile__header text text--xs">
                        {{ $t(title) }}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-3">
                    <ProfileSidebar />
                </div>
                <div class="col-12 col-lg-9">
                    <NuxtChild />
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import ProfileSidebar from '@/components/profile/ProfileSidebar.vue';

@Component({
    components: {
        ProfileSidebar
    }
})
export default class PageProfile extends Vue {
    public get title(): string {
        const splitPath = this.$route.path.split('/');
        let result = splitPath.slice(-1).pop();
        if(!result?.length) {
            result = splitPath.find(elem => elem.length)
        }
        return `ProfilePage.tabs.${result}`;
    }
}
</script>

<style lang="scss" scoped>
.profile {
    padding-bottom: 80px;
    &__header {
        margin: 20px 0;
    }
}
</style>
