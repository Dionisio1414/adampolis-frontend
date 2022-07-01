<template>
    <section class="main-feedback">
        <div class="main-feedback__title">{{ $t('MainFeedback.title') }}</div>
        <div class="main-feedback__content">
            <div class="main-feedback__slider-wrap">
                <Slider
                    :settings="sliderSettings"
                    :withScrollbar="false"
                    :navButtonClassNames="'d-lg-flex'"
                    :withArrows="false"
                >
                    <TestimonialsBlock
                        v-for="val in testimonialsList"
                        :testimonialItem="val"
                        :key="val.id"
                    >
                    </TestimonialsBlock>
                </Slider>
                <div class="main-feedback__pagination"></div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator';
import { SwiperOptions } from 'swiper';
import Slider from '~/components/Slider.vue';
import { ITestimonial } from '~/types/testimonial.interface';
import TestimonialsBlock from '../testimonials/TestimonialsBlock.vue';

@Component({
    components: { Slider, TestimonialsBlock }
})
export default class ComponentMainFeedback extends Vue {
    @Prop() public testimonialsList!: ITestimonial[];

    public show: boolean = false;
    public sliderSettings: SwiperOptions = {
        slidesPerView: 1,
        loop: false,
        spaceBetween: 10,
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        },
        pagination: {
            el: `.main-feedback__pagination`,
            type: 'bullets',
            clickable: true
        },
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


    @Emit('onInit')
    public swiperOnInit(): void {
        this.show = true;
    }

    @Emit('onResize')
    public swiperOnResize(): void {}

    public swiperOnBeforeDestroy(): void {
        this.show = false;
    }

    @Emit('onAction')
    public doAction(): void {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-feedback {
    &__title {
        color: $color-dark-blue;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 27px;
        margin-bottom: 20px;
    }

    &__pagination {
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        z-index: 3;
        width: 100% !important;

        ::v-deep {
            .swiper-pagination-bullet {
                min-width: 10px;
                min-height: 10px;
            }
            .swiper-pagination-bullet {
                background: $color-grey;
            }
            .swiper-pagination-bullet-active {
                background: $color-default;
            }
        }
    }

    &__slider-wrap {
        position: relative;
        padding-bottom: 30px;
        .swiper-slide {
            height: unset;
        }
    }
}

@include media-lg {
    .main-feedback {
        &__title {
            font-size: 18px;
            line-height: 24px;
        }

        &__pagination {
            bottom: 0px;
        }
    }
}
</style>
