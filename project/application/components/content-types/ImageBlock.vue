<template>
    <div 
        v-if="showImage"
        :class="internalWrapperClassNames"
    >
        <img
            :src="imageUrl"
            class="img-responsive image-block__picture"
            :alt="imageAlt"
        >
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';

import { IContentType, IContentTypeImageBlock } from '~/types/content-type.interface';

@Component({})
export default class ComponentImageBlock extends Vue {
    @Prop() public readonly contentType!: IContentType;

    @Inject('CT_IMAGE_BLOCK_CLASSES') public readonly wrapperClassNames?: string[];

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['image-block'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    public get showImage(): boolean {
        return !!(this.contentType.properties && this.contentType.properties.img);
    }

    public get imageUrl(): string {
        return (this.contentType.properties as IContentTypeImageBlock).img;
    }

    public get imageAlt(): string {
        return (this.contentType.properties as IContentTypeImageBlock).image_alt;
    }
}
</script>
<style lang="scss" scoped>
    .image-block {
        &__picture {
            margin: auto;
        }
    }
</style>