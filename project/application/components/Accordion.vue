<template>
    <div class="accordion">
        <div class="accordion__header" :class="{ 'accordion__header--opened': accordionActive }" @click="switchAccordion">
            <div class="accordion__title">
                <slot name="title" />
            </div>
            <div class="accordion__icon" :class="{ 'accordion__icon--opened': !accordionActive }">
                <span class="accordion__line"></span>
                <span class="accordion__line"></span>
            </div>
        </div>
        <SlideUpDown 
            :active="accordionActive" 
            :duration="200"
            @open-start="openStartHandler"
            @close-end="closeEndHandler"
        >
            <div class="accordion__main">
                <slot name="content" />
            </div>
        </SlideUpDown>
    </div>
</template>

<script lang="ts">
import { Component, mixins, Prop, Emit } from 'nuxt-property-decorator';
import SlideUpDown from 'vue-slide-up-down';
import mixinAccordion from '~/mixins/accordion';

@Component({
    components: { SlideUpDown }
})
export default class ComponentAccordion extends mixins(mixinAccordion) {
    @Prop({ default: false })
    public isActiveOnRender!: boolean;

    @Emit('openStart')
    public openStartHandler(): void {}

    @Emit('closeEnd')
    public closeEndHandler(): void {}

    mounted() {
        if (this.isActiveOnRender) this.accordionActive = this.isActiveOnRender;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.accordion {
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        &--opened {
            margin-bottom: 15px;
            @media (min-width: $breakpoint-lg) {
                margin-bottom: 20px;
            }
        }
    }

    &__title {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        color: $color-dark-blue;
    }

    &__icon {
        position: relative;
        width: 10px;
        height: 10px;

        &--opened {
            .accordion__line {
                &:last-child {
                    transform: rotate(90deg);
                    opacity: 1;
                }
            }
        }
    }

    &__line {
        position: absolute;
        background: $color-search-bg;
        width: 10px;
        height: 2px;
        transition: 0.25s ease-in-out;

        &:first-child {
            top: 50%;
            transform: translateY(-50%) rotate(0deg);
        }

        &:last-child {
            top: 4px;
            transform: rotate(0deg);
            opacity: 0;
        }
    }
}

</style>
