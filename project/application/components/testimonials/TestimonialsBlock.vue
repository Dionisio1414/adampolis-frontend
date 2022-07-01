<template>
    <article class="swiper-slide main-feedback__item">
        <div class="main-feedback__quote icon icon--quote-up"></div>
        <div class="main-feedback__comment">{{ testimonialItem.testimonial }}</div>
        <div>
            <i
                v-for="star in 5"
                :key="star"
                class="main-feedback__star icon icon--star"
                :class="{
                    'icon--star--fill': star <= internalStars
                }"
            >
            </i>
        </div>
        <div class="main-feedback__author">- {{ testimonialItem.name }}</div>
    </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { ITestimonial } from '~/types/testimonial.interface';

@Component({})
export default class ComponentTestimonialsBlock extends Vue {
    @Prop()
    public testimonialItem!: ITestimonial;

    public get internalStars(): number {
        return Math.max(1, this.testimonialItem.stars);
    }
}
</script>

<style lang="scss" scoped>
    @import '~/assets/styles/variables';
    @import '~/assets/styles/mixins/media';
    .main-feedback {
         &__item {
            padding: 20px;
            background-color: $color-white;
            border: 1px solid $color-grey;
            border-radius: 4px;
        }

        &__quote {
            height: 32px;
            width: 36px;
        }

        &__comment {
            color: $color-black;
            font-size: 14px;
            letter-spacing: 0;
            line-height: 22px;
            padding: 20px 0;
        }

        &__star {
            height: 16px;
            width: 16px;
            margin-right: 5px;
        }

        &__author {
            color: $color-pink;
            font-size: 14px;
            font-style: italic;
            font-weight: 600;
            letter-spacing: 0;
            line-height: 19px;
            padding-top: 16px;
        }
    }
</style>