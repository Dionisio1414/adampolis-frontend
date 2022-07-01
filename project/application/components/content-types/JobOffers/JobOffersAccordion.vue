<template>
    <div class="accordion" :class="{ 'accordion--opened': accordionActive }">
        <div class="accordion__head" @click.stop.prevent="changeTab">
            <div class="accordion__icon" :class="{ 'accordion__icon--opened': !accordionActive }">
                <span class="accordion__line"></span>
                <span class="accordion__line"></span>
            </div>
            <div class="accordion__header">
                <slot name="header" />
            </div>
        </div>
        <SlideUpDown :active="accordionActive" :duration="200">
            <div class="accordion__main">
                <slot name="content" />
            </div>
        </SlideUpDown>
    </div>
</template>

<script lang="ts">
import { Component, Emit, mixins, Prop, Watch } from 'nuxt-property-decorator';
import SlideUpDown from 'vue-slide-up-down';
import mixinAccordion from '~/mixins/accordion';
import { IChangePayload } from '~/types/job-offers.interface';

@Component({
    components: { SlideUpDown }
})
export default class ComponentJobOffersAccordion extends mixins(mixinAccordion) {
    @Prop() public index!: number;
    @Prop() public currentIndex!: number;

    @Watch('currentIndex', { immediate: true })
    public handleIndex(): void {
        this.index !== this.currentIndex ? (this.accordionActive = false) : (this.accordionActive = true);
    }

    @Emit('change')
    public changeTab() {
        this.switchAccordion();
        return { index: this.index, accordionActive: this.accordionActive }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.accordion {
    border-bottom: 1px solid $color-lightest-grey;
    padding: 15px 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        border-bottom: 0;
    }

    &--opened {
        padding-bottom: 24px;
    }

    &__head {
        display: flex;
        cursor: pointer;
        width: 100%;
    }

    &__header {
        width: 100%;
    }

    &__icon {
        position: relative;
        width: 10px;
        height: 10px;
        margin-right: 15px;
        margin-top: 5px;

        &--opened {
            margin-right: 20px;

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

@media (min-width: $breakpoint-lg) {
    .accordion {
        padding: 0 0 20px 0;

        &--opened {
            .accordion__head {
                margin-bottom: 20px;
            }
        }

        &__icon {
            margin-right: 20px;

            &--opened {
                margin-right: 20px;
            }
        }
    }
}
</style>
