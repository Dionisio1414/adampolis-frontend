<template>
    <section class="main-categories" v-if="bigCategoriesItems.length">
        <div class="main-categories__title">{{ $t('MainCategories.title') }}</div>
        <div class="main-categories__content">
            <!-- additional categories for mobile -->
            <NuxtLink
                :to="localePath(item.link)"
                class="main-categories__category d-md-none"
                v-for="item in itemsSubcategory"
                :key="item.id"
            >
                <div class="main-categories__category-title">{{ item.title }}</div>
                <img :src="item.image" class="main-categories__category-image" />
            </NuxtLink>
        </div>
        <div class="main-categories__content">
            <template v-for="item in bigCategoriesItems">
                <template v-if="item.taxon">
                    <NuxtLink
                        :to="localePath(`/catalog/${(item.taxon.translations[currentLocal] || {}).slug}`)"
                        class="main-categories__category"
                        :key="item.id"
                    >
                    
                        <div class="main-categories__category-title">{{ (item.translations[currentLocal] || {}).title }}</div>
                        <img :src="item.image.path" class="main-categories__category-image" />
                    </NuxtLink>
                </template>
                <template v-if="item.type === 'url'">
                    <a
                        :href="(item.translations[currentLocal] || {}).url"
                        class="main-categories__category"
                        :key="item.id"
                    >
                        <div class="main-categories__category-title">{{ (item.translations[currentLocal] || {}).title }}</div>
                        <img :src="item.image.path" class="main-categories__category-image" />
                    </a>
                </template>
            </template>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Component } from 'nuxt-property-decorator';
import { IShopMenu } from '~/types/shop-menu.interface';
import { IMenuItem } from '~/types/header-menu.interface';

@Component({
    computed: {
        ...mapGetters({
            bigCategoriesList: 'page-home-menu/getBigCategories'
        })
    }
})
export default class ComponentMainCategories extends Vue {
    // TODO test data START
    public itemsCategory = [
        {
            id: 1,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 2,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 3,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        }
    ];
    public itemsSubcategory = [
        {
            id: 1,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 2,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 3,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 4,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 5,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 6,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 7,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 8,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        },
        {
            id: 9,
            link: '/',
            title: 'Padangos',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSareoVdQX69V5x0Zlw3H5EWkQhsXsoTkFfOQ&usqp=CAU'
        }
    ];
    // TODO test data END

    private bigCategoriesList!: IShopMenu[];

    get currentLocal(): string {
        return this.$i18n.locale;
    }

    get bigCategoriesItems(): IMenuItem[] {
        return this.bigCategoriesList[0]?.items || [];
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-categories {
    &__title {
        color: $color-dark-blue;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 27px;
        margin-bottom: 20px;
    }

    &__content {
        display: flex;
        flex-wrap: wrap;
    }

    &__category {
        flex-grow: 1;
        width: 30%;
        margin: 0 10px;
        height: 120px;
        border-radius: 4px;
        background-color: $color-white;
        box-shadow: 0 2px 5px 0 rgba($color-black, 0.15);
        padding: 20px 30px 20px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;

        &:nth-child(3n + 1) {
            margin-left: 0;
        }

        &:nth-child(3n) {
            margin-right: 0;
        }

        &:hover {
            box-shadow: 3px 5px 10px 0 rgb(0 0 0 / 15%);
        }

        &-title {
            color: $color-dark-blue;

            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0;
            line-height: 22px;
        }
        &-image {
            max-width: 80px;
            object-fit: cover;
        }
    }
}

@include media-md {
    .main-categories {
        &__title {
            font-size: 18px;
            line-height: 24px;
        }
        &__content {
            margin-top: 10px;
        }

        &__category {
            width: 100%;
            margin: 5px 0;
            &:first-child {
                margin-top: 0;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
