<template>
    <section class="product-card-slider">
        <div class="product-card-slider__content">
            <div v-show="show" class="product-card-slider__slider-wrap">
                <Slider
                    :settings="sliderSettings"
                    :wrapperClass="wrapperClass"
                    :withScrollbar="false"
                    :navButtonClassNames="'inner-arrows'"
                    :withArrows="true"
                    :withThumbs="true"
                >
                    <template>
                        <div
                            v-for="(val, index) in images"
                            :key="index"
                            class="product-card-slider__swiper-slide swiper-slide"
                        >
                            <img
                                class="product-card-slider__img"
                                :src="val"
                            >
                        </div>
                    </template>
                    <template #thumbs>
                        <div 
                            v-for="(val, index) in images"
                            :key="index"
                            class="swiper-slide thumb-container"
                        >
                            <img 
                                class="thumb" 
                                :src="val" 
                            >
                        </div>
                    </template>
                </Slider>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { SwiperOptions } from 'swiper';
import Slider from '~/components/Slider.vue';

@Component({
    components: { Slider }
})
export default class ComponentProductCardSlider extends Vue {
    @Prop() public images!: string[] | [];

    public wrapperClass: string = 'product-card-slider__wrapper';
    public paginationClass: string = 'product-card-slider__pagination';
    public show: boolean = false;
    public sliderSettings: SwiperOptions = {
        wrapperClass: this.wrapperClass,
        slidesPerView: 1,
        loop: false,
        spaceBetween: 0,
        on: {
            init: () => {
                this.swiperOnInit();
            },
            beforeDestroy: () => {
                this.swiperOnBeforeDestroy();
            },
            resize: () => {
                this.swiperOnResize();
            }
        }
    };

    public swiperOnInit(): void {
        this.show = true;
        this.$emit('onInit');
    }

    public swiperOnResize(): void {
        this.$emit('onResize');
    }

    public swiperOnBeforeDestroy(): void {
        this.show = false;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product-card-slider {
    &__img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        max-height: 375px;
    }

    &__slider-wrap {
        position: relative;
    }

    &__swiper-slide {
        height: auto;
    }

    ::v-deep {
        .swiper-arrow--next,
        .swiper-arrow--prev {
            transform: translateY(-75px);
        }
    }
}

.thumb-container {
    width: 60px;
    height: 60px;
}

.thumb {
    object-fit: contain;
    width: 60px;
    height: 60px;
    border: 2px solid rgba($color-grey, $alpha: 0.6);
    border-radius: 4px;
}

.swiper-slide-active {
    .thumb {
        border-color: $color-accent-blue;
    }
}

@media (min-width: $breakpoint-lg) {
    .product-card-slider {
        ::v-deep {
            .swiper-arrow--next,
            .swiper-arrow--prev {
                transform: translateY(-88px);
            }
        }
    }
}
</style>
