<template>
    <div class="profile-info-card">
        <div class="profile-info-card__card card card--bordered item ">
            <div class="profile-info-card__header text text--m text--bold">
                <slot name="header" />
                <slot name="button" />
            </div>
            <div class="profile-info-card__body">
                <slot name="body" />
            </div>
        </div>
        <div class="profile-info-card__footer item">
            <slot name="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentProfileInfoCard extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';


.profile-info-card {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 20px;
    }
}

@include media-lg {
    .profile-info-card {
        &__header {
            padding-right: 15px;
        }
    }
}
</style>
