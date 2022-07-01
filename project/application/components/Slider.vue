<template>
    <div class="slider">
        <div class="" v-swiper:slider="settings">
            <div class="slider__wrapper swiper-wrapper" :class="wrapperClass">
                <slot />
            </div>
            <div v-if="withScrollbar" class="swiper-scrollbar"></div>
        </div>
        <template v-if="withArrows">
            <button class="btn btn--flat swiper-arrow--prev shadow" :class="navButtonClassNames" @click="prev">
                <span class="icon icon--arrow-left-grey"></span>
            </button>
            <button class="btn btn--flat swiper-arrow--next shadow" :class="navButtonClassNames" @click="next">
                <span class="icon icon--arrow-right-grey"></span>
            </button>
        </template>

        <template v-if="withThumbs">
            <div class="slider__thumbs-container" v-swiper:thumbsSlider="swiperOptionThumbs">
                <div class="slider__thumbs swiper-wrapper">
                    <slot name="thumbs" />
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import Swiper, { SwiperOptions } from 'swiper';
import { IDictionary } from '../types/dictionary.interface';

@Component({})
export default class ComponentSlider extends Vue {
    @Prop({ default: () => ({}) })
    public settings!: SwiperOptions;

    @Prop({ default: false })
    public withScrollbar!: boolean;

    @Prop({ default: true })
    public withArrows!: boolean;

    @Prop()
    public navButtonClassNames?: string | string[] | IDictionary<string>;

    @Prop()
    public wrapperClass?: string | string[] | IDictionary<string>;

    @Prop({ default: false })
    public withThumbs!: boolean;

    public slider!: Swiper;

    public thumbsSlider!: Swiper;

    public swiperOptionThumbs: SwiperOptions = {
        spaceBetween: 10,
        slidesPerView: 'auto',
        centeredSlides: true,
        slideToClickedSlide: true,
        noSwiping: true,
    };

    public prev(): void {
        this.slider.slidePrev();
    }

    public next(): void {
        this.slider.slideNext();
    }

    mounted() {
        if (this.withThumbs) {
            this.$nextTick(() => {
                if (this.slider?.controller && this.thumbsSlider?.controller) {
                    this.slider.controller.control = this.thumbsSlider;
                    this.thumbsSlider.controller.control = this.slider;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.inner-arrows.swiper-arrow--next {
    right: 0;
}
.inner-arrows.swiper-arrow--prev {
    left: 0;
}
.inner-arrows.swiper-arrow--next,
.inner-arrows.swiper-arrow--prev {
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
}

.slider {
    position: relative;

    &__wrapper {
        align-items: stretch;
        &--center {
            align-items: center;
        }
    }

    &__thumbs-container {
        width: 210px;
        overflow: hidden;
    }

    &__thumbs {
        width: fit-content;
        margin: 23px 0 30px 0;
    }
}

@media (min-width: $breakpoint-lg) {
    .slider {
        &__thumbs {
            margin: 45px 0 30px 0;
        }
    }
}
</style>
