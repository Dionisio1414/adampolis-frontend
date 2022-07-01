<template>
    <div class="mobile-menu-categories">
        <div @click="back" class="mobile-menu-categories__back container" v-if="category && category.translations[currentLocal].title">
            <i class="icon icon--arrow-left-grey"></i>
            {{ (category.translations[currentLocal] || {}).title }}
        </div>
        <div class="mobile-menu-categories__items" v-if="category && category.children">
            <NuxtLink
                v-for="(item, index) in category.children"
                :key="index"
                :to="localePath(`/catalog/${item.taxon.translations[currentLocal].slug}`)"
                class="dropdown__trigger dropdown__trigger--flex mobile-menu-categories__item"
                @click.native="onNavigate"
            >
                {{ (item.translations[currentLocal] || {}).title }}
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentMobileMenuCategories extends Vue {
    @Prop() public readonly category!: any;

    public back() {
        this.$emit('toCatalog');
    }

    public onNavigate() {
        this.$emit('onNavigate');
    }

    public get currentLocal(): string {
        return this.$i18n.locale;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.mobile-menu-categories {
    &__back {
        background-color: $color-dark-grey;
        padding-top: 17px;
        padding-bottom: 15px;
        border-top: 1px solid $color-grey;
        i {
            font-size: 9px;
        }
    }
    &__items {
        height: 100%;
        max-height: calc(100% - 50px);
        overflow: scroll;
        background-color: $color-white;
    }

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $color-dark-blue;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 19px;

        padding-top: 13px;
        padding-bottom: 13px;
        border-top: 1px solid $color-dark-grey;
        cursor: pointer;

        i {
            font-size: 9px;
        }
    }
}
</style>
