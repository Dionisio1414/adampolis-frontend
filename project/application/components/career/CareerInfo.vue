<template>
    <div class="career-info card card--bordered">
        <CareerAccordion v-for="i in 3" :key="i" :index="i" :currentIndex="currentTabIndex" @change="changeIndex">
            <template #header>
                <div class="career-info__head">
                    <div>
                        <h2
                            class="career-info__heading"
                            :class="{ 'career-info__heading--active': currentTabIndex === i }"
                        >
                            {{ $t('CareerPage.info.salesManager') }}
                        </h2>
                        <p class="career-info__city">Šiauliai</p>
                    </div>
                    <div class="d-none d-lg-block">
                        <button class="career-info__btn btn btn--pink" @click.stop="">
                            {{ $t('CareerPage.info.apply') }}
                        </button>
                    </div>
                </div>
            </template>

            <template #content>
                <div class="career-info__content">
                    <h3 class="career-info__subheader">{{ $t('CareerPage.info.jobDescription') }}</h3>
                    <p class="career-info__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed neque nibh. Nunc
                        luctus, leo et tempor lacinia, lacus mi vehicula ex, et lacinia erat purus ut mauris. Maecenas
                        quis venenatis neque, consequat mattis magna. Donec nisi sem, posuere nec ultrices nec, placerat
                        sed lacus. Integer ornare vitae felis sit amet pellentesque. Mauris ex ante, dapibus congue
                        posuere sit amet, sodales ut urna. Phasellus sit amet ligula magna.
                    </p>

                    <h3 class="career-info__subheader">{{ $t('CareerPage.info.requirements') }}</h3>

                    <ul class="career-info__list">
                        <li class="career-info__list-item">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </li>
                        <li class="career-info__list-item">
                            Pellentesque sed nibh non risus venenatis rhoncus.
                        </li>
                        <li class="career-info__list-item">
                            Donec lacinia odio sed odio ornare faucibus.
                        </li>
                        <li class="career-info__list-item">
                            Nullam hendrerit ipsum non velit feugiat, vel euismod arcu venenatis.
                        </li>
                    </ul>

                    <p class="career-info__text career-info__text--margin">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed neque nibh. Nunc
                        luctus, leo et tempor lacinia, lacus mi vehicula ex, et lacinia erat purus ut mauris. Maecenas
                        quis venenatis neque, consequat mattis magna. Donec nisi sem, posuere nec ultrices nec, placerat
                        sed lacus.
                    </p>

                    <p class="career-info__text career-info__text--margin">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed neque nibh. Nunc
                        luctus, leo et tempor lacinia, lacus mi vehicula ex, et lacinia erat purus ut mauris.
                    </p>

                    <div>
                        <div class="career-info__flex">
                            <i class="career-info__icon icon icon--address-grey"></i>
                            <span class="career-info__text">Vairo g. 11, Šiauliai</span>
                        </div>
                        <div class="career-info__flex">
                            <i class="career-info__icon icon icon--time"></i>
                            <span class="career-info__text">Visą darbo dieną</span>
                        </div>
                    </div>

                    <div class="d-block d-lg-none">
                        <button class="career-info__btn btn btn--pink" @click.stop="">
                            {{ $t('CareerPage.info.apply') }}
                        </button>
                    </div>
                </div>
            </template>
        </CareerAccordion>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import CareerAccordion from './CareerAccordion.vue';

@Component({
    components: {
        CareerAccordion
    }
})
export default class ComponentCareerInfo extends Vue {
    public currentTabIndex: number = 1;

    public changeIndex(index: number, isActive: boolean): void {
        if (!isActive) this.currentTabIndex = 0;
        else this.currentTabIndex = index;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.career-info {
    padding: 15px;
    padding-bottom: 0;

    &__head {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    &__heading {
        font-size: 16px;
        line-height: 22px;
        color: $color-dark-blue;
        font-weight: bold;

        &--active {
            color: $color-pink;
        }
    }

    &__city {
        color: $color-search-bg;
        font-size: 14px;
        line-height: 19px;
        margin-top: 4px;
    }

    &__subheader {
        margin: 30px 0 20px 0;
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        color: $color-dark-blue;
    }

    &__text {
        font-size: 14px;
        line-height: 22px;
        max-width: 632px;

        &--margin {
            margin: 20px 0;

            &:last-of-type {
                margin-bottom: 32px;
            }
        }
    }

    &__icon {
        margin-right: 10px;
        width: 16px;
        height: 16px;
    }

    &__flex {
        display: flex;
        align-items: center;

        &:first-child {
            margin-bottom: 5px;
        }
    }

    &__list-item {
        position: relative;
        margin-left: 15px;
        font-size: 14px;
        line-height: 22px;

        &:not(:last-child) {
            margin-bottom: 10px;
        }

        &::before {
            position: absolute;
            left: -14px;
            top: 7px;
            content: '';
            width: 4px;
            height: 4px;
            background-color: $color-pink;
            border-radius: 50%;
        }
    }

    &__btn {
        min-width: 132px;
        width: 100%;
        margin-top: 20px;
    }
}

@media (min-width: $breakpoint-lg) {
    .career-info {
        padding: 30px;
        padding-bottom: 0;

        &__btn {
            min-width: 132px;
            width: auto;
            margin-top: 0;
        }

        &__content {
            margin-left: 30px;
        }

        &__list-item {
            &:not(:last-child) {
                margin-bottom: 4px;
            }
        }

        &__flex {
            &:first-child {
                margin-bottom: 4px;
            }
        }
    }
}
</style>
