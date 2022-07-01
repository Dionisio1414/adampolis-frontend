<template>
    <div class="catalog-accordion">
        <div class="catalog-accordion__header" @click="switchAccordion">
            <div class="catalog-accordion__title">
                <slot name="title" />
            </div>
            <div
                class="catalog-accordion__icon-container"
                :class="{ 'catalog-accordion__icon-container--opened': accordionActive }"
            >
                <i class="icon icon catalog-accordion__icon  icon--arrow-upper"></i>
            </div>
        </div>
        <SlideUpDown :active="accordionActive" :duration="200">
            <div class="catalog-accordion__main">
                <slot name="content" />
            </div>
        </SlideUpDown>
    </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import SlideUpDown from 'vue-slide-up-down';
import mixinAccordion from '~/mixins/accordion';

@Component({
    components: {
        SlideUpDown
    }
})
export default class CatalogAccordion extends mixins(mixinAccordion) {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.catalog-accordion {
    &__header {
        background: $color-light-grey;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        padding: 3px 0px 3px 15px;
        margin-bottom: 20px;
        cursor: pointer;
    }

    &__title {
        font-size: 14px;
        font-weight: bold;
        line-height: 19px;
        color: $color-dark-blue;
    }

    &__icon-container {
        position: relative;
        transform: rotate(180deg);
        transition: $transition ease-in-out;

        &--opened {
            transform: rotate(0deg);
        }
    }

    &__icon {
        width: 32px;
        height: 32px;
    }
}
</style>
