<template>
    <div class="steps-bar card card--bordered">
        <div
            class="steps-bar__step"
            :class="{ 'steps-bar__step--active': i === currentStep, 'steps-bar__step--done': currentStep > i }"
            v-for="(step, i) in steps"
            :key="i"
        >
            <div class="steps-bar__number">
                <i v-if="currentStep > i" class="steps-bar__icon icon icon--check"></i>
                <span v-else>
                    {{ i + 1 }}
                </span>
            </div>
            <div class="steps-bar__title">{{ step }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

export interface IStep {
    title: string;
}

@Component({
    components: {}
})
export default class PageCheckout extends Vue {
    @Prop({ required: true }) public steps!: Array<string>;
    @Prop({ required: true }) public currentStep!: number;
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.steps-bar {
    display: flex;
    width: 100%;

    &__step {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        padding: 12px 15px;
        border-right: 1px solid $color-lightest-grey;

        &:last-child {
            border-right: none;
        }

        &--active {
            width: 100%;
            justify-content: flex-start;

            .steps-bar {
                &__number {
                    background-color: $color-accent-orange;
                    border-color: $color-accent-orange;
                    color: $color-white;
                    margin-right: 15px;
                }

                &__title {
                    display: block;
                    color: $color-dark-blue;
                }
            }
        }

        &--done {
            .steps-bar {
                &__number {
                    background-color: $color-accent-green;
                    border-color: $color-accent-green;
                    color: $color-white;
                }

                &__title {
                    color: $color-dark-blue;
                }
            }
        }
    }

    &__number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        font-size: 14px;
        color: $color-dark-blue;
        font-weight: bold;
        border: 1px solid $color-lightest-grey;
        border-radius: 50%;
    }

    &__title {
        display: none;
        color: $color-grey-placeholder;
        font-weight: 600;
        font-size: 14px;
    }
}

@media (min-width: $breakpoint-lg) {
    .steps-bar {
        &__step {
            width: 100%;
            padding: 12px;

            &--active {
                justify-content: center;
            }
        }

        &__title {
            display: block;
            font-size: 16px;
        }

        &__number {
            width: 36px;
            height: 36px;
            margin-right: 20px;
            font-size: 20px;
        }
    }
}
</style>
