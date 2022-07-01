<template>
    <section class="main-discounts">
        <div class="main-discounts__heading">
            <div class="main-discounts__title">{{ $t('MainDiscounts.title') }}</div>
            <div class="main-discounts__more d-sm-none">
                {{ $t('MainDiscounts.showMore') }} <i class="icon icon--arrow-right-pink main-discounts__icon"></i>
            </div>
        </div>
        <div class="main-discounts__content">
            <div class="main-discounts__item" v-for="item in [1, 2]" :key="item">
                <MainProduct />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import MainProduct from '~/components/main/MainProduct.vue';

@Component({
    components: { MainProduct }
})
export default class ComponentMainDiscounts extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-discounts {
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

    &__content {
        display: flex;
    }

    &__item {
        flex-grow: 1;
        width: 45%;
        margin: 0 10px;
        &:first-child {
            margin-left: 0;
        }
        &:last-child {
            margin-right: 0;
        }
    }
}

@include media-lg {
    .main-discounts {
        &__title {
            font-size: 18px;
            line-height: 24px;
        }
    }
}
</style>
