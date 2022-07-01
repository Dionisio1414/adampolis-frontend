<template>
    <div 
        v-if="jobOfferListItems.length"
        :class="internalWrapperClassNames"
    >
        <h2 
            class="job-offers__title"
            v-if="contentType && contentType.title"
            v-html="$sanitize(contentType.title)"
        >
        </h2>
        <div class="job-offers__block card card--bordered">
            <JobOffersAccordion 
                v-for="(val, index) in jobOfferListItems" 
                :key="index"
                :index="index" 
                :currentIndex="currentTabIndex" 
                @change="changeIndex"
                class="job-offers__accordion"
            >
                <template #header>
                    <div class="job-offers__head">
                        <div>
                            <div
                                class="job-offers__heading"
                                :class="{ 'job-offers__heading--active': currentTabIndex === index }"
                                v-if="val.block_title"
                                v-html="$sanitize(val.block_title)"

                            >
                            </div>
                            <div
                                class="job-offers__city"
                                v-if="val.city"
                                v-html="$sanitize(val.city)"
                            >
                            </div>
                        </div>
                        <!-- <div class="d-none d-lg-block">
                            <button class="job-offers__btn btn btn--pink" @click.stop="">
                                {{ $t('CareerPage.info.apply') }}
                            </button>
                        </div> -->
                    </div>
                </template>

                <template #content>
                    <div class="job-offers__content">
                        <JobOffersDescription 
                            v-if="val.information"
                            :title="$t('CareerPage.info.jobDescription')"
                            :description="val.information"
                            class="job-offers__content--block"
                        >
                        </JobOffersDescription>
                        <JobOffersDescription 
                            v-if="val.requirements"
                            :title="$t('CareerPage.info.requirements')"
                            :description="val.requirements"
                            class="job-offers__content--block"
                        >
                        </JobOffersDescription>
                        <JobOffersAddress
                            v-if="val.address || val.work_hours"
                            :address="val.address"
                            :workhours="val.work_hours"
                            class="job-offers__content--block"
                        >
                        </JobOffersAddress>

                        <div class="job-offers__content--block d-block d-lg-none">
                            <button class="job-offers__btn btn btn--pink" @click.stop="">
                                {{ $t('CareerPage.info.apply') }}
                            </button>
                        </div>
                    </div>
                </template>
            </JobOffersAccordion>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';
import { IContentType, IContentJobOffer } from '~/types/content-type.interface';
import { 
    JobOffersAccordion, 
    JobOffersAddress, 
    JobOffersDescription
} from '../JobOffers';
import { IChangePayload } from '~/types/job-offers.interface';

@Component({
    components: { 
        JobOffersAccordion,
        JobOffersAddress,
        JobOffersDescription
    }
})
export default class ComponentJobOffersInfo extends Vue {
    @Prop() public contentType!: IContentType;
    @Inject('CT_JOB_OFFERS_CLASSES') public readonly wrapperClassNames?: string[];

    public currentTabIndex: number = 0;
    public changeIndex({ index, accordionActive:isActive }: IChangePayload): void {
        // if(!isActive) this.currentTabIndex = 0;
        // else this.currentTabIndex = index;
        this.currentTabIndex = index;
    }

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['job-offers'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    public get jobOfferListItems(): IContentJobOffer[] {
        return (this.contentType?.items as IContentJobOffer[]) ?? [];
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.job-offers {
    padding-bottom: 0;

    &__block {
        padding: 15px 15px 0 15px;
        @media (min-width: $breakpoint-lg) {
            padding: 30px 30px 0 30px;
        }
    }

    &__accordion {
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    &__title {
        font-size: 20px;
        line-height: 27px;
        color: $color-dark-blue;
        font-weight: bold;
        margin-bottom: 20px;
    }

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

    &__content {
        padding: 30px 0;
        &--block {
            &:not(:last-child) {
                margin-bottom: 30px;
            }
        }
    }
    
}

@media (min-width: $breakpoint-lg) {
    .job-offers {

        &__btn {
            min-width: 132px;
            width: auto;
            margin-top: 0;
        }

        &__content {
            padding: 0;
            margin-left: 30px;
        }

        &__list-item {
            &:not(:last-child) {
                margin-bottom: 4px;
            }
        }
    }
}
</style>
