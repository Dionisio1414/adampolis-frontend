<template>
    <div class="career-card card">
        <div class="career-card__grid">
            <div class="career-card__item">
                <h2 class="career-card__header">
                    {{ $t('CareerPage.career') }}
                </h2>

                <p class="career-card__text">
                    {{ $t('CareerPage.cardText.paragraph_1') }}
                </p>
                <p class="career-card__text">
                    {{ $t('CareerPage.cardText.paragraph_2') }}
                </p>
                <p class="career-card__text">
                    {{ $t('CareerPage.cardText.paragraph_3') }}
                </p>
            </div>

            <div class="d-none d-lg-block career-card__item">
                <img class="img-responsive" src="@/assets/images/career/career.png" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
    components: {}
})
export default class ComponentCareerCard extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.career-card {
    padding: 30px 15px 15px 15px;

    &__header {
        font-size: 20px;
        line-height: 27px;
        color: $color-dark-blue;
        font-weight: bold;
        margin-bottom: 20px;
    }

    &__text {
        font-size: 14px;
        line-height: 22px;

        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .career-card {
        padding: 30px;

        &__header {
            margin-bottom: 30px;
            font-size: 24px;
            line-height: 33px;
        }

        &__grid {
            display: flex;
        }

        &__item {
            &:first-child {
                margin-right: 132px;
            }
        }
    }
}
</style>
