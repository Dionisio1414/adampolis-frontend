<template>
    <Dropdown
        :options="{
            placement: 'bottom',
            modifiers: {
                flip: {
                    name: 'flip',
                    enabled: false
                },
                offset: {
                    offset: '0,22.5px'
                },
                keepTogether: {
                    enabled: false
                }
            }
        }"
        :appendToBody="true"
    >
        <template v-slot="{ doClose }">
            <div class="dropdown__body ">
                <HeaderUserMenuLinks @onNavigate="doClose" />
            </div>
        </template>
        <template v-slot:reference="{ isOpen }">
            <button class="width-min-122 header-user-menu__company btn btn--default">
                <span>{{ currentName }}</span>
                <i class="icon icon--arrow-down dropdown__arrow" :class="{ 'dropdown__arrow--active': isOpen }"></i>
            </button>
        </template>
    </Dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter } from 'nuxt-property-decorator';
import Dropdown from '~/components/Dropdown.vue';
import HeaderUserMenuLinks from '~/components/header/HeaderUserMenuLinks.vue';
import { IProfileData } from '~/types/profile-data.interface';

@Component({
    components: {
        Dropdown,
        HeaderUserMenuLinks
    }
})
export default class ComponentHeaderUserMenu extends Vue {
    @Getter('page-profile-data/getProfileData') public profileData!: IProfileData;

    public get currentName(): string | null {
        return (this.profileData.isCompany ? this.profileData.companyName : this.profileData.fullName) || null;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.header-user-menu__company {
    display: flex;
    align-items: center;
    color: $color-dark-blue;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 19px;
    cursor: pointer;
    text-align: left;

    i {
        margin-left: 4px;
    }
}

.dropdown__body {
    padding-top: 10px;
    padding-bottom: 6px;
    min-width: 214px;

    color: $color-black;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 19px;
    margin-left: 25px;
}
</style>
