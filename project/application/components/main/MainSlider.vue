<template>
    <section class="main-slider">
        <div class="main-slider__content">
            <div v-show="show" class="main-slider__slider-wrap">
                <Slider
                    :settings="sliderSettings"
                    :wrapperClass="wrapperClass"
                    :withScrollbar="false"
                    :navButtonClassNames="'inner-arrows'"
                    :withArrows="visibleArrows"
                >
                    <div
                        to="'/'"
                        class="main-slider__swiper-slide swiper-slide"
                        v-for="item in mainBannerImages"
                        :key="item.id"
                    >
                        <img class="main-slider__img" :src="item.path" :alt="item.alt" />
                    </div>
                </Slider>
                <div :class="paginationClass"></div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Getter, Emit } from 'nuxt-property-decorator';
import { SwiperOptions } from 'swiper';
import Slider from '~/components/Slider.vue';
import { IBannerImage } from '~/types/banner-image.interface';

@Component({
    components: { Slider }
})
export default class ComponentMainSlider extends Vue {
    @Getter('page-home-banner/getMainBanner') public mainBannerImages!: IBannerImage[] 

    public wrapperClass = 'main-slider__wrapper';
    public paginationClass = 'main-slider__pagination';
    public show: boolean = false;
    public sliderSettings: SwiperOptions = {
        wrapperClass: this.wrapperClass,
        slidesPerView: 1,
        loop: false,
        spaceBetween: 0,
        pagination: {
            el: `.${this.paginationClass}`,
            type: 'bullets',
            clickable: true
        },
        on: {
            init: (val) => {
                console.log('val', val);
                
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

    public get visibleArrows(): boolean {
        return this.mainBannerImages && this.mainBannerImages.length > 1;
    }

    @Emit('onInit')
    public swiperOnInit(): void {
        this.show = true;
    }

    @Emit('onResize')
    public swiperOnResize(): void {}

    @Emit('onAction')
    public doAction(): void {}

    public swiperOnBeforeDestroy(): void {
        this.show = false;
    }

    public mounted(): void {

    }
   
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.main-slider {
    &__img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        min-height: 497px;
        max-height: 497px;
    }

    &__pagination {
        position: absolute;
        bottom: 15px;
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
    }
    
    &__swiper-slide {
        height: auto;
    }
}
</style>
