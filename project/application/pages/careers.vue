<template>
    <main class="page career">
        <div class="container">
            <div class="row">
                <div class="col">
                    <BreadCrumbs />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <CareerCard />
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <h2 class="career__header">{{ $t('CareerPage.lookingFor') }}</h2>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <CareerInfo />
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { BreadCrumbs } from '~/components';
import { CareerCard, CareerInfo } from '~/components/career';

@Component({
    components: {
        BreadCrumbs,
        CareerCard,
        CareerInfo
    }
})
export default class PageCareer extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.career {
    padding-bottom: 80px;

    &__header {
        font-size: 20px;
        line-height: 27px;
        color: $color-dark-blue;
        font-weight: bold;
        margin: 35px 0 20px 0;
    }
}

@media (min-width: $breakpoint-lg) {
    .career {
        &__header {
            margin: 40px 0 20px 0;
        }
    }
}
</style>
