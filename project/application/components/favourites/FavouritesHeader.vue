<template>
    <div class="profile-favourites__header">
        <div class="profile-favourites__title">
            {{ $t('Favourites.title') }}:
            <span class="digit">{{ wishListCount }}</span>
        </div>
        <div class="profile-favourites__actions">
            <button type="button" class="profile-favourites__actions-btn">
                <i class="icon icon--mail-dark profile-favourites__actions-icon"></i>
            </button>
            <button type="button" class="profile-favourites__actions-btn">
                <i class="icon icon--print profile-favourites__actions-icon"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentFavouritesHeader extends Vue {
    @Prop({ default: 0 }) public wishListCount!: number;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.profile-favourites {
    &__header {
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 4px;
        border: 1px solid rgba(203, 208, 216, 0.6);
        margin-bottom: 20px;
        @media screen and (min-width: $breakpoint-min) {
            padding: 15px;
            margin-bottom: 15px;
        }
        @media screen and (min-width: $breakpoint-lg) {
            padding: 20px;
            margin-bottom: 15px;
        }
    }
    &__title {
        font-weight: bold;
        color: $color-dark-blue;
        @media screen and (min-width: $breakpoint-min) {
            font-size: 16px;
            line-height: 22px;
        }
        @media screen and (min-width: $breakpoint-lg) {
            font-size: 18px;
            line-height: 24px;
        }
    }
    &__actions {
        &-btn {
            background: transparent;
            border: none;
            padding: 0;
            line-height: 1;
            cursor: pointer;
            &:not(:last-child) {
                margin-right: 15px;
            }
        }
        &-icon {
            font-size: 24px;
        }
    }
}

.digit {
    color: $color-pink;
}
</style>
