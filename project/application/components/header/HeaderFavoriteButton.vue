<template>
    <nuxt-link :to="localePath('/profile/favourites')" class="header-favorite-button">
        <i class="header-favorite-button__icon icon icon--favourite-grey"></i>
        <BadgeTooltip :count="wishListCount" />
    </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter } from 'nuxt-property-decorator';
import BadgeTooltip from '~/components/BadgeTooltip.vue';
import { IProductInner } from '~/types/product.interface';

@Component({
    components: { BadgeTooltip }
})
export default class ComponentHeaderFavoriteButton extends Vue {
    @Getter('wishlist/getWishListProducts') public wishList!: IProductInner[];

    public get wishListCount(): number {
        return this.wishList ? this.wishList.length : 0;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.header-favorite-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px 3px;
    text-decoration: none;
    cursor: pointer;

    &__icon {
        height: 24px;
        width: 24px;
        margin-right: 8px;
    }
}
</style>
