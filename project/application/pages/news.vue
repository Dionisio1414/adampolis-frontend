<template>
    <main class="page news">
        <div class="container">
            <div class="row">
                <div class="col">
                    <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <NuxtChild 
                        :newsList="newsList"
                        :meta="meta"
                        :status="status"
                    >
                    </NuxtChild>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter } from 'nuxt-property-decorator';
import { BreadCrumbs } from '~/components';
import { INewsListItems, INewsListMeta } from '~/types/news.interface';
import { IBreadcrumbs } from '~/types/breadcrumbs.interface';
import { EStatus } from '~/constants/status';

@Component({
    components: { BreadCrumbs },
    scrollToTop: true
})
export default class PageNews extends Vue {
    @Getter('page-news/getNewsList') public newsList!: INewsListItems;
    @Getter('page-news/getNewsListMeta') public meta!: INewsListMeta;
    @Getter('page-news/getStatus') public status!: EStatus;

    public get breadcrumbs(): IBreadcrumbs[] {
        const newsTitle: IBreadcrumbs[] = [{
            key: this.$t('News.news').toString(),
            title: this.$t('News.news').toString(),
            link: '/news'
        }],
        breadcrumbs = this.$route.params?.slug ? 
            [ 
                {
                    key: this.$route.params?.slug,
                    title: this.$route.params?.slug,
                    link: this.$route.params?.slug
                }
            ] : [];

        return [  ...newsTitle, ...breadcrumbs ];
    }

    public validate(): boolean {
        return false;
    }

    async asyncData({ store, error }: any): Promise<void> {
        try {
            await store.dispatch('page-news/fetchNewsList', {
                page: 1,
                limit: 9
            });
        } catch(err: any) {
            if(err?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(err);
        }
    }
}
</script>

<style lang="scss" scoped>
.news {
    padding-bottom: 80px;

    &__header {
        margin: 20px 0;
    }
}
</style>
