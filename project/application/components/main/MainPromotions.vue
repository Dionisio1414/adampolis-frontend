<template>
    <section class="main-promotions">
        <div class="main-promotions__heading">
            <div 
                class="main-promotions__title"
                v-html="$sanitize(title)"
            >
            </div>
            <NuxtLink 
                :to="localePath('/')" 
                class="main-promotions__more"
                v-html="$sanitize(linkLabel)"
            >
            </NuxtLink>
        </div>
        <div class="main-promotions__content main-promotions__slider-wrap">
            <Slider
                :ref="sliderRef"
                :settings="sliderSettings"
                :withScrollbar="false"
                :navButtonClassNames="'d-lg-flex'"
                :withArrows="false"
                :wrapperClass="wrapperClass"
            >
                <MainProduct
                    class="swiper-slide main-promotions__item"
                    v-for="(val, index) in params"
                    :key="index"
                    :product="val"
                >
                </MainProduct>
            </Slider>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'nuxt-property-decorator';
import { SwiperOptions } from 'swiper';
import MainProduct from '~/components/main/MainProduct.vue';
import Slider from '~/components/Slider.vue';
import { ICatalogProducts } from '~/types/catalog.interface';

@Component({
    components: {
        MainProduct,
        Slider
    }
})
export default class ComponentMainPromotions extends Vue {
    @Prop({ default: () => [] }) public params!: ICatalogProducts[]
    @Prop() public title!: string;
    @Prop() public linkLabel!: string;

    public sliderRef = `promotionsSlider-${Math.floor(100000 + Math.random() * 900000)}`;
    public wrapperClass = 'main-promotions__wrapper';
    public show: boolean = false;
    public sliderSettings: SwiperOptions = {
        slidesPerView: 'auto',
        wrapperClass: this.wrapperClass,
        spaceBetween: 20,
        breakpoints: {
            768: {
                slidesPerView: 2,
                noSwiping: true,
                noSwipingClass: 'main-promotions__slider-wrap'
            },
            1200: {
                slidesPerView: 2,
                noSwiping: true,
                noSwipingClass: 'main-promotions__slider-wrap'
            }
        },
        on: {
            init: () => {
                this.swiperOnInit();
            },
            beforeDestroy: () => {
                this.swiperOnBeforeDestroy();
            },
            resize: () => {
                // @ts-ignore
                if (this.$refs[this.sliderRef] && this.$refs[this.sliderRef].swiperInstance) {
                    // @ts-ignore
                    this.$refs[this.sliderRef].swiperInstance.update();
                    // @ts-ignore
                    this.$refs[this.sliderRef].swiperInstance.init();
                }
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

    @Emit('onAction')
    public doAction(): void {}

    public swiperOnBeforeDestroy(): void {
        this.show = false;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-promotions {
    &__heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    &__title {
        color: $color-dark-blue;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 27px;
    }
    &__more {
        color: $color-pink;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 19px;
        cursor: pointer;
        &:hover {
            color: lighten($color-pink, 10);
        }
        i {
            height: 10px;
            width: 6px;
        }
    }
}

::v-deep {
    .swiper-container {
        @media (max-width: #{$breakpoint-md - 1px}) {
            padding-left: $grid-mob-gutter;
            padding-right: $grid-mob-gutter;
        }
    }
}

@include media-md {
    .main-promotions {
        margin-right: -$grid-mob-gutter;
        margin-left: -$grid-mob-gutter;

        &__heading {
            padding-left: $grid-mob-gutter;
            padding-right: $grid-mob-gutter;
        }

        &__title {
            font-size: 18px;
            line-height: 24px;
        }

        &__item {
            width: 82vw !important;
        }
    }
}
</style>
