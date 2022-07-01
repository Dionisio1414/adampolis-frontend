<template>
    <section class="main-banners">
        <div class="main-banners__content">
            <div v-show="show" class="main-banners__slider-wrap">
                <Slider
                    :settings="sliderSettings"
                    :wrapperClass="wrapperClass"
                    :withScrollbar="false"
                    :navButtonClassNames="'d-lg-flex'"
                    :withArrows="false"
                >
                    <template v-if="mainBannerImages.length">
                        <div class="swiper-slide" v-for="item in mainBannerImages" :key="item.id">
                            <img
                                class="img-responsive img-responsive--width img-responsive--height"
                                :src="item.path"
                                :alt="item.alt ? item.alt : ''"
                            />
                        </div>
                    </template>
                </Slider>
                <div :class="paginationClass"></div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Component } from 'nuxt-property-decorator';
import { SwiperOptions } from 'swiper';
import Slider from '~/components/Slider.vue';
import { IBannerImage } from '~/types/banner-image.interface';

@Component({
    components: { Slider },
    computed: {
        ...mapGetters('page-home-secondary-banner', {
            mainBannerImages: 'getSecondaryBanner'
        })
    }
})
export default class ComponentMainBanners extends Vue {
    public wrapperClass = 'main-banners__wrapper';
    public paginationClass = 'main-banners__pagination';
    public show: boolean = false;
    public mainBannerImages!: IBannerImage[];
    public sliderSettings: SwiperOptions = {
        wrapperClass: this.wrapperClass,
        slidesPerView: 1,
        // loop: true,
        spaceBetween: 19,
        breakpoints: {
            768: {
                slidesPerView: 3,
                noSwiping: true,
                noSwipingClass: 'main-banners__slider-wrap'
            },
            1200: {
                slidesPerView: 3,
                noSwiping: true,
                noSwipingClass: 'main-banners__slider-wrap'
            }
        },
        pagination: {
            el: `.${this.paginationClass}`,
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

    public swiperOnInit(): void {
        if(this.mainBannerImages.length) {
            this.show = true;
            this.$emit('onInit');
        } else {
            return;
        }
    }

    public swiperOnResize(): void {
        this.$emit('onResize');
    }

    public swiperOnBeforeDestroy(): void {
        this.show = false;
    }

    public doAction(): void {
        this.$emit('onAction');
    }
    public items = [
        {
            id: 1,
            link: '/',
            image: 'banner-main-small.jpg'
        },
        {
            id: 2,
            link: '/',
            image: 'banner-main-small.jpg'
        },
        {
            id: 3,
            link: '/',
            image: 'banner-main-small.jpg'
        }
    ];
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.main-banners {
    &__content {
        img {
            max-height: 220px;
        }
        .swiper-slide {
            height: unset;
        }
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

        @media (min-width: $breakpoint-md) {
            display: none;
        }

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
}
</style>
