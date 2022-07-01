<template>
    <div class="news-wrapper card card--bordered">
        <h2 class="news-wrapper__header">{{ $t('News.news') }}</h2>
        <div class="row">
            <template v-if="newsList.length">
                <div 
                    class="col-12 col-sm-6 col-lg-4" 
                    v-for="item in newsList" 
                    :key="item.id"
                >
                    <div class="news-wrapper__item">
                        <NuxtLink :to="{ path: `/news/${item.slug}` }">
                            <img 
                                v-if="item.image"
                                class="news-wrapper__image img-responsive img-responsive--width" 
                                :src="item.image" 
                                :alt="item.slug" 
                            />
                            <NotImage 
                                class="news-wrapper__image"
                                :imageWidth="70"
                                :imageHeight="70"
                                :imageWidthMobile="35"
                                :imageHeightMobile="35"
                                v-else
                            >
                            </NotImage>
                            <div 
                                class="news-wrapper__date"
                                v-if="item && item.createdAt"
                                v-html="item.createdAt"
                            ></div>
                            <div 
                                class="news-wrapper__title"
                                v-if="item && item.title"
                                v-html="item.title"
                            >
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="col">
                    <div class="news-wrapper__error">{{ $t('News.noNewsText') }}</div>
                </div>
            </template>
        </div>
        <div 
            v-if="showButton"
            class="news-wrapper__btn-container"
        >
            <button 
                class="news-wrapper__btn btn btn--secondary-black-border"
                @click="showMore"
            >
                {{ $t('News.showMore') }}
                <transition name="fade">
                    <div v-if="checkStatus" class="spinner">
                        <Spinner></Spinner>
                    </div>
                </transition>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Action } from 'nuxt-property-decorator';
import { INewsListItems, INewsListMeta, INewsListPayload } from '~/types/news.interface';
import NotImage from '~/components/NotImage.vue';
import Spinner from '~/components/Spinner.vue';
import { EStatus } from '~/constants/status';

@Component({
    components: { NotImage, Spinner }
})
export default class ComponentNewsWrapper extends Vue {
    @Action('page-news/fetchNewsList') public fetchNewsList!: (payload: INewsListPayload) => Promise<void>;

    @Prop({ default: () => [] }) public newsList!: INewsListItems;
    @Prop({ default: () => {} }) public meta!: INewsListMeta;
    @Prop() public status!: EStatus;

    public get showButton(): boolean {
        return !!(this.meta?.nextPage);
    }

    public get checkStatus(): boolean {
        return this.status === EStatus.PROCESSING;
    }

    public showMore(): void {
        this.fetchNewsList({
            page: this.meta?.nextPage ? this.meta?.nextPage : 1,
            limit: this.meta?.limit ? this.meta?.limit : 9,
            paginate: true
        })
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.news-wrapper {
    padding: 30px 15px;

    &__error {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        text-align: center;
        color: $color-search-bg;
    }

    &__header {
        font-size: 20px;
        color: $color-dark-blue;
        line-height: 27px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    &__item {
        margin-bottom: 30px;
        cursor: pointer;
    }

    &__date {
        font-size: 12px;
        color: $color-search-bg;
        line-height: 18px;
        margin: 10px 10px;
    }

    &__title {
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        color: $color-dark-blue;
        margin: 0 10px;
    }

    &__btn-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    &__btn {
        position: relative;
        font-weight: bold;
        margin: 0 auto;
    }

    &__image {
        height: 100%;
        max-height: 200px;
    }

    a {
        text-decoration: none;
    }
}

.spinner {
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    ::v-deep {
        .loader-spinner {
            width: 25px;
            height: 25px;
            margin: -12px 0 0 -12px;
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .news-wrapper {
        padding: 30px;

        &__header {
            margin-bottom: 30px;
            font-size: 24px;
            line-height: 33px;
        }

        &__item {
            margin-bottom: 40px;
        }

        &__btn-container {
            margin: 20px 0 50px 0;
        }
    }
}
</style>
