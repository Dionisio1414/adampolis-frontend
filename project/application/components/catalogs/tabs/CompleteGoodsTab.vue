<template>
    <div class="complete-goods-tab tab-content__item">
        <div class="complete-goods-tab__wrapper">
            <!-- <Slider
                :ref="sliderRefName"
                :settings="sliderSettings"
                :withScrollbar="false"
                :navButtonClassNames="'d-lg-flex'"
                :withArrows="false"
                :wrapperClass="wrapperClass"
            > -->
            <!-- </Slider> -->
            <CompleteProductCard 
                class="complete-goods-tab__card" 
                v-for="val in setList" 
                :key="val.id"
                :product="val"
            >
            </CompleteProductCard>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
// import { SwiperOptions } from 'swiper';
import CompleteProductCard from '~/components/catalogs/CompleteProductCard.vue';
import CatalogProductCard from '~/components/catalogs/CatalogProductCard.vue';
// import Slider from '@/components/Slider.vue';
import { IProductInner } from '~/types/product.interface';

@Component({
    components: {
        CatalogProductCard,
        CompleteProductCard,
        // Slider
    }
})
export default class CompleteGoodsTab extends Vue {
    @InjectReactive('CATALOG_PRODUCT_SET') public setList!: IProductInner[] | [];

    // sliderRefName: string = `promotionsSlider-${Math.floor(100000 + Math.random() * 900000)}`;
    // public wrapperClass: string = 'catalog-slider';
    // public show: boolean = false;
    // public sliderSettings: SwiperOptions = {
    //     slidesPerView: 'auto',
    //     wrapperClass: this.wrapperClass,
    //     spaceBetween: 20,
    //     breakpoints: {
    //         768: {
    //             slidesPerView: 2,
    //             noSwiping: true,
    //             noSwipingClass: 'slider-wrap'
    //         },
    //         1200: {
    //             slidesPerView: 2,
    //             noSwiping: true,
    //             noSwipingClass: 'slider-wrap'
    //         }
    //     },
    //     on: {
    //         init: () => {
    //             this.swiperOnInit();
    //         },
    //         beforeDestroy: () => {
    //             this.swiperOnBeforeDestroy();
    //         },
    //         resize: () => {
    //             // @ts-ignore
    //             if (this.sliderRef && (this.sliderRef as any).swiperInstance) {
    //                 // @ts-ignore
    //                 this.sliderRef.swiperInstance.update();
    //                 // @ts-ignore
    //                 this.sliderRef.swiperInstance.init();
    //             }
    //             this.swiperOnResize();
    //         }
    //     }
    // };
    // public swiperOnInit(): void {
    //     this.show = true;
    //     this.$emit('onInit');
    // }

    // public swiperOnResize(): void {
    //     this.$emit('onResize');
    // }

    // public swiperOnBeforeDestroy(): void {
    //     this.show = false;
    // }

    // public doAction(): void {
    //     this.$emit('onAction');
    // }

    // public get sliderRef(): any {
    //     // @ts-ignore
    //     return this.$refs[this.sliderRefName];
    // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.complete-goods-tab {
    &__wrapper {
        display: flex;
        flex-wrap: wrap;
        @media (min-width: $breakpoint-lg) {
            margin: 0 -15px;
        }
    }
    &__card {
        flex: 1 1 100%;
        max-width: 100%;
        &:not(:last-child) {
            margin-bottom: 15px;
            @media (min-width: $breakpoint-lg) {
                margin-bottom: 0;
            }
        }
        @media (min-width: $breakpoint-lg) {
            flex: 0 1 calc(1/2 * 100% - 30px);
            max-width: calc(1/2 * 100% - 30px);
            margin: 0 15px;
        }
    }
}
</style>
