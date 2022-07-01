<template>
    <NuxtLink
        class="category-card"
        :to="localePath(`/catalog/${taxonSlug}`)"
    >
        <div class="category-card__title">{{ taxonName }}</div>
        <div class="category-card__image">
            <div class="category-card__image-wrapper">
                <img 
                    v-if="category && category.image"
                    class="img-responsive img-responsive--width" 
                    :src="category.image.path" 
                    :alt="taxonName"
                >
            </div>
        </div>
    </NuxtLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { IMenuItem } from '~/types/header-menu.interface';

@Component({})
export default class ComponentSearchMainCategoryCard extends Vue {
    @Prop({ required: true }) public category!: IMenuItem;

    public get currentLocale(): string {
        return this.$i18n.locale;
    }

    public get taxonSlug(): string {
        return (this.category.taxon.translations[this.currentLocale] || {}).slug;
    }

    public get taxonName(): string {
        return (this.category.taxon.translations[this.currentLocale] || {}).name;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.category-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $color-white;
    border-radius: 4px;
    box-shadow: 0 2px 5px 0 rgba($color-black, 0.15);
    padding: 20px;
    text-decoration: none;
    height: 100%;
    max-height: 120px;
    transition: box-shadow .25s ease-in-out;

    &:hover {
        box-shadow: 3px 5px 10px 0 rgb(0 0 0 / 15%);
    }

    &__image {
        display: flex;
        justify-content: flex-end;
        flex: 0 1 calc(50% - 20px);
        &-wrapper {
            width: 100%;
            max-width: 80px;
        }
    }

    &__title {
        flex: 0 1 calc(50% - 20px);
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        text-transform: lowercase;
        color: $color-dark-blue;
        &::first-letter {
            text-transform: uppercase;
        }
    }
}
</style>
