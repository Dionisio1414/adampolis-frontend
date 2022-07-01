<template>
    <div class="accordion-tab" :class="{ 'accordion-tab--opened': accordionActive }">
        <div class="accordion-tab__header card card--shadow" @click="switchAccordion">
            <div class="accordion-tab text text--s text--bold">
                {{ title }}
            </div>
            <div
                class="accordion-tab__icon-container"
                :class="{ 'accordion-tab__icon-container--opened': accordionActive }"
            >
                <i class="icon icon--arrow-down-black accordion-tab__icon" />
            </div>
        </div>
        <SlideUpDown :active="accordionActive" :duration="200">
            <div class="accordion-tab__main card card--shadow">
                <slot />
            </div>
        </SlideUpDown>
    </div>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator';
import SlideUpDown from 'vue-slide-up-down';
import mixinAccordion from '~/mixins/accordion';
import Accordion from '~/components/Accordion.vue';

@Component({
    components: { SlideUpDown, Accordion }
})
export default class ComponentAccordionTab extends mixins(mixinAccordion) {
    @Prop({ required: true })
    public title!: string;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.accordion-tab {
    &--opened {
        .accordion-tab {
            &__header {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                border-bottom: 1px solid rgba($color-grey, $alpha: 0.6);
            }

            &__icon-container {
                transform: rotate(0deg);
            }

            &__main {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        }
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 10px 13px 15px;
        cursor: pointer;
    }

    &__title {
        color: $color-dark-blue;
    }

    &__icon-container {
        transform: rotate(-90deg);
    }
}
</style>
