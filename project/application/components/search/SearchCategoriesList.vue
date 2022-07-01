<template>
    <div class="search-categories-list">
        <div v-if="isTitle" class="search-categories-list__title">
            <slot name="title"></slot>
        </div>
        <div class="search-categories-list__list">
            <div 
                class="search-categories-list__item" 
                v-for="(val, index) in items"
                :key="index"
            >
                <slot name="card" :card="val"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { IMenuItem } from '~/types/header-menu.interface';

@Component({})
export default class ComponentSearchCategoriesList extends Vue {
    @Prop({ default: true }) public isTitle!: boolean;
    @Prop() public items!: IMenuItem[]; 
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.search-categories-list {
    &__title {
        font-size: 20px;
        line-height: 27px;
        font-weight: bold;
        margin-bottom: 20px;
        color: $color-dark-blue;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        margin-left: -20px;
        margin-right: -20px;
    }

    &__item {
        flex: 0 0 100%;
        &:not(:last-child) {
            margin-bottom: 20px;
            @media screen and (min-width: $breakpoint-lg) {
                margin-bottom: 0;
            }
        }
        &:not(:nth-last-child(-n+3)) {
            @media screen and (min-width: $breakpoint-lg) {
                margin-bottom: 20px;
            }
        }
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 0 33.3333333333%;
            width: 100%;
            max-width: 33.3333333333%;
            padding-right: 20px;
            padding-left: 20px;
        }
    }
}
</style>
