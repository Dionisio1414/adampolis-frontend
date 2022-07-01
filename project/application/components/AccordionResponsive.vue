<template>
    <div class="accordion-responsive">
        <button
            @click="toggle"
            class="accordion-responsive__toggle"
            :class="toggleClass"
            :tabindex="disabled ? -1 : null"
        >
            <slot name="header" />
            <span
                class="accordion-responsive__icon d-md-none"
                :class="{ 'accordion-responsive__icon--active': accordionActive }"
            ></span>
        </button>
        <SlideUpDown :active="accordionActive || disabled" :duration="200">
            <slot name="content" />
        </SlideUpDown>
    </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import SlideUpDown from 'vue-slide-up-down';
import { EBreakpoints } from '../constants/breakpoints';
import MixinAccordionResponsive from '../mixins/accordion-responsive';

@Component({
    components: { SlideUpDown }
})
export default class ComponentAccordionResponsive extends mixins(MixinAccordionResponsive) {
    public breakpoint: EBreakpoints = EBreakpoints.MD;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.accordion-responsive {
    &__toggle {
        background: none;
        border: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
        cursor: default;
        display: block;
        padding: 0;

        &:focus,
        &:hover,
        &:active {
            outline: none;
        }
    }

    &__icon {
        display: block;
        width: 10px;
        height: 10px;
        position: relative;
        margin-right: 8px;
        &:before {
            display: block;
            content: '';
            top: 0;
            position: absolute;
            right: 4px;
            width: 8px;
            height: 8px;
            border: solid $color-grey;
            cursor: pointer;
            transition: 400ms;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
        &--active {
            &:before {
                transform: rotate(225deg);
            }
        }
    }
}

@include media-md {
    .accordion-responsive {
        &__toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 17px 0 16px;
        }
    }
}
</style>
