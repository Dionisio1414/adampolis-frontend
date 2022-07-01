<template>
    <div class="search-category-card">
        <div class="search-category-card__top">
            <div class="search-category-card__column">
                <NuxtLink :to="localePath(`/catalog/${parentTaxonSlug}`)" class="search-category-card__caption">{{ parentTaxonName }}</NuxtLink>
                <ul class="search-category-card__list">

                    <li 
                        class="search-category-card__item"
                        v-for="(val, index) in taxonChildrens"
                        :key="index"
                    >
                        <NuxtLink
                            class="search-category-card__link"
                            :to="localePath(`/catalog/${(val.taxon.translations[currentLocale] || {}).slug}`)"
                        >
                            {{ (val.taxon.translations[currentLocale] || {}).name }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="search-category-card__column">
                <div v-if="isImage" class="search-category-card__picture">
                    <img 
                        class="img-responsive" 
                        :src="category.image.path"
                        :alt="parentTaxonName"
                    >
                </div>
            </div>
        </div>

        <div class="search-category-card__bottom">
            <nuxt-link class="btn search-category-card__btn-category" to="/">
                <span class="search-category-card__btn-text">
                    {{ $t('CatalogPage.Categories.card.buttonText') }}
                </span>
                <i class="icon icon--arrow-right-pink search-category-card__icon"></i>
            </nuxt-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { IMenuItem } from '~/types/header-menu.interface';

@Component({})
export default class ComponentSearchCategoryCard extends Vue {
    @Prop({ required: true }) public category!: IMenuItem;

    public get currentLocale(): string {
        return this.$i18n.locale;
    }

    public get parentTaxonName(): string {
        return (this.category.taxon.translations[this.currentLocale] || {}).name;
    }

    public get parentTaxonSlug(): string {
        return (this.category.taxon.translations[this.currentLocale] || {}).slug;
    }

    public get taxonChildrens(): IMenuItem[] {
        return this.category.children ?? [];
    }

    public get isImage(): boolean {
        return !!(this.category.image);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.search-category-card {
    display: flex;
    flex-direction: column;
    background: $color-white;
    border-radius: 4px;
    padding: 25px 20px 20px 20px;
    border: 1px solid $color-grey;
    height: 100%;

    &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        margin-bottom: 15px;
    }

    &__bottom {
        text-align: right;
        margin-top: auto;
        padding-top: 15px;
        border-top: 1px solid $color-grey;
    }

    &__column {
        &:first-child {
            flex: 1 1 auto;
            margin-right: 15px;
        }
        &:last-child {
            flex: 1;
        }
    }

    &__caption {
        display: block;
        font-size: 16px;
        line-height: 22px;
        font-weight: 600;
        margin-bottom: 20px;
        text-decoration: none;
        color: $color-dark-blue;
    }

    &__picture {
        width: 100%;
        max-width: 145px;
        min-width: 145px;
        max-height: 130px;
    }

    &__item {
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
    &__link {
        font-size: 14px;
        line-height: 22px;
        text-transform: lowercase;
        text-decoration: none;
        color: $color-search-bg;
        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__btn-category {
        display: inline-flex;
        align-items: center;
        padding: 0;
    }

    &__btn-text {
        text-decoration: underline;
        margin-right: 5px;
        color: $color-pink;
    }

    &__icon {
        width: 6px;
        height: 10px;
    }
}
</style>
