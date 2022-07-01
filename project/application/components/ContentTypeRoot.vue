<template>
    <component
        :is="componentName"
        :contentType="contentType"
    />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { EContentTypes } from '~/constants/content-types';
import { IContentType } from '~/types/content-type.interface';

import {
    ImageText,
    TextBlock,
    ImageBlock,
    TextImageSection,
    ContactBlockList,
    JobOffersInfo,
    DepartmenList, 
    Locations,
    Columns,
    Wysiwyg

} from '~/components/content-types';

@Component({
    components: {
        ImageText,
        TextBlock,
        ImageBlock,
        TextImageSection,
        ContactBlockList,
        JobOffersInfo,
        DepartmenList,
        Locations,
        Columns,
        Wysiwyg
    }
})
export default class ComponentContentTypeRoot extends Vue {
    @Prop()
    public readonly contentType!: IContentType;

    public get componentName(): string | null {
        switch (this.contentType.code) {
            case EContentTypes.IMAGE_TEXT_50_50: {
                return 'ImageText';
            }
            case EContentTypes.TEXT_BLOCK: {
                return 'TextBlock';
            }
            case EContentTypes.IMAGE_BLOCK: {
                return 'ImageBlock';
            }
            case EContentTypes.TEXT_IMAGE_SECTION_40_60: {
                return 'TextImageSection';
            }
            case EContentTypes.CONTACT_BLOCK: {
                return 'ContactBlockList';
            }
            case EContentTypes.JOB_OFFFER: {
                return 'JobOffersInfo';
            }
            case EContentTypes.DEPARTMENT: {
                return 'DepartmenList';
            }
            case EContentTypes.LOCATIONS: {
                return 'Locations';
            }
            case EContentTypes.COLUMNS: {
                return 'Columns';
            }
            case EContentTypes.WYSIWYG: {
                return 'Wysiwyg';
            }
            default: {
                return null;
            }
        }
    }
}
</script>
