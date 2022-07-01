<template>
    <main class="page">
        <div class="container">
            <div class="row">
                <div class="col">
                    <Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="page-content">
                        <ContentTypeRoot
                            v-for="(contentType, index) in contentTypes"
                            :key="index"
                            :contentType="contentType"
                        >
                        </ContentTypeRoot>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter, Provide } from 'nuxt-property-decorator';
import Breadcrumbs from '~/components/BreadCrumbs.vue'
import { IPage } from '~/types/page.interface';
import { EStatus } from '~/constants/status';
import { IBreadcrumbs } from '~/types/breadcrumbs.interface';
import ContentTypeRoot from '~/components/ContentTypeRoot.vue';
import { IContentType } from '~/types/content-type.interface';
import { ContentDefault } from '~/components/content-types';
import { Context } from '@nuxt/types';

@Component({
    components: {
        Breadcrumbs,
        ContentTypeRoot,
        ContentDefault
    }
})
export default class PageStatic extends Vue {
    @Getter('page-static/getPage') public page!: IPage;

    @Provide('CT_CONTENT_DEFAULT_CLASSES')
    private contentDefaultClasses: string[] = ['mb-xs-40', 'mb-lg-40'];

    @Provide('CT_IMAGE_TEXT_50_50')
    private image_text_50_50: string[] = [''];

    @Provide('CT_IMAGE_BLOCK_CLASSES')
    private imageBlockClasses: string[] = ['mb-xs-55', 'mb-lg-55'];

    @Provide('CT_TEXT_BLOCK_CLASSES')
    private textBlockClasses: string[] = ['mb-xs-20', 'mb-lg-20'];

    @Provide('CT_JOB_OFFERS_CLASSES')
    private jobOffersClasses: string[] = ['mb-xs-20', 'mb-lg-20'];

    @Provide('CT_PAGE_CONTACT_DATA_CLASSES')
    private pageContactDataClasses: string[] = [''];

    @Provide('CT_TEXT_IMAGE_SECTION_40_60')
    private text_image_section_40_60: string[] = ['mb-xs-40', 'mb-lg-40'];

    @Provide('CT_CONTACT_BLOCK_LIST')
    private contactBlockList: string[] = ['mb-xs-40', 'mb-lg-40'];

    @Provide('CT_DEPARTMENT')
    private department: string[] = ['mb-xs-40', 'mb-lg-40'];

    @Provide('CT_LOCATIONS')
    private locations: string[] = ['mb-xs-20', 'mb-lg-20'];

    @Provide('CT_COLUMNS')
    private columns: string[] = ['mb-xs-20', 'mb-lg-20'];

    @Provide('CT_WYSIWYG')
    private wysiwyg: string[] = [];

    public get breadcrumbs(): IBreadcrumbs[] | [] {
        return [{
            key: this.$route.params.pathMatch,
            title: this.page?.breadcrumb ? this.page.breadcrumb : '',
            link: this.$route.params.pathMatch
        }] || [];
    }

    public get contentTypes(): IContentType[] | [] {
        return this.page?.contentTypes ? this.page.contentTypes : [];
    }

    public async asyncData({ params, store, error, app }: Context): Promise<void> {
        try {
            const slug: string | undefined = params?.pathMatch?.split('/')?.pop();

            await store.dispatch('page-static/fetchPage', slug);
            const status = store.getters['page-static/getStatus'];

            if(status === EStatus.ERROR) {
                const err: any = store.getters['page-static/getError'];
                throw err;
            }
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
@import '~/assets/styles/variables.scss';

.page-content {
    padding-bottom: 80px;
}

</style>
