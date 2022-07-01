<template>
    <section class="main-suppliers">
        <div class="main-suppliers__heading">
            <div class="main-suppliers__title">
                {{ $t('MainSuppliers.title') }}<span> {{ filteredSuppliers.length }} </span>
                {{ $t('MainSuppliers.suppliers') }}
            </div>
            <div class="main-suppliers__more d-md-block">
                <NuxtLink :to="localePath('/suppliers')" class="main-suppliers__more d-none d-md-block">
                    {{ $t('MainSuppliers.showMore') }} <i class="icon icon--arrow-right-pink"></i>
                </NuxtLink>
            </div>
            
        </div>
        <div class="main-suppliers__content">
            <div v-show="show" class="slider-wrap">
                <Slider
                    :settings="sliderSettings"
                    :withScrollbar="false"
                    :navButtonClassNames="'d-lg-flex'"
                    :withArrows="true"
                    wrapperClass="slider__wrapper--center"
                >
                    <template v-for="(item, index) in filteredSuppliers">
                        <a
                            v-if="item.type === 'url'"
                            :href="(item.translations[currentLocal] || {}).url"
                            class="supplier swiper-slide"
                            :key="index"
                            target="_blank"
                        >
                            <img 
                                :src="item.image.path"
                                :alt="`supplier-icon-${index}`"
                            >
                        </a>
                        <div
                            class="supplier swiper-slide"
                            :key="index"
                            v-else
                        >
                            <img 
                                :src="item.image.path"
                                :alt="`supplier-icon-${index}`"
                            >
                        </div>
                    </template>
                </Slider>
            </div>
        </div>
        <div class="main-suppliers__bottom">
            <div class="main-suppliers__more d-md-none">
                {{ $t('MainSuppliers.showMore') }} <i class="icon icon--arrow-right-pink main-suppliers__icon"></i>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Getter } from 'nuxt-property-decorator';
import { SwiperOptions } from 'swiper';
import Slider from '~/components/Slider.vue';
import { IShopMenu } from '~/types/shop-menu.interface';
import { IMenuItem } from '~/types/header-menu.interface';

@Component({
    components: { Slider }
})
export default class ComponentMainSuppliers extends Vue {
    @Getter('page-home-menu/getPartners') public partners!: IShopMenu[];
    
    public show: boolean = false;
    public sliderSettings: SwiperOptions = {
        slidesPerView: 2,
        loop: true,
        spaceBetween: 5,
        centeredSlides: false,
        breakpoints: {
            768: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 5
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
                this.swiperOnResize();
            }
        }
    };

    @Emit('onInit')
    public swiperOnInit(): void {
        for(let key in this.sliderSettings.breakpoints) {
            let k: number = +key;
            this.sliderSettings.breakpoints[k]['slidesPerView'] = this.filteredSuppliers.length;
        }

        this.show = true;
    }

    @Emit('onResize')
    public swiperOnResize(): void {}

    @Emit('onAction')
    public doAction(): void {}

    public swiperOnBeforeDestroy(): void {
        this.show = false;
    }

    public get filteredSuppliers(): IMenuItem[] {
        const items: IMenuItem[] = this.partners[0]?.items || [];
        return items.filter((item: IMenuItem) => item.image);
    }

    public get currentLocal(): string {
        return this.$i18n.locale;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-suppliers {
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

        span {
            color: $color-pink;
        }
    }

    &__bottom {
        display: block;
        text-align: right;
    }

    &__heading,
    &__bottom {
        margin-top: 10px;
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

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 112px;
        border: 1px solid $color-grey;
        border-radius: 4px;
        min-height: 140px;
        background-color: $color-white;
        .slider__wrapper {
            align-items: center!important;
        }
    }

    &__supplier {
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: #{$breakpoint-md - 1px}) {
            height: 90px;
        }
    }
}

@include media-lg {
    .main-suppliers {
        &__content {
            padding: 0;
        }
    }
}

@include media-md {
    .main-suppliers {
        &__title {
            font-size: 18px;
            line-height: 24px;
        }

        &__content {
            padding: 0;
            min-height: 90px;
        }

        &__supplier {
            height: 90px;
        }
    }
}
</style>
