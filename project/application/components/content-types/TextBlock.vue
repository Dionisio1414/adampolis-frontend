<template>
    <div
      :class="internalWrapperClassNames"
      v-html="$sanitize(textContent)"
    >
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';

import { IContentType, IContentTypeTextBlock } from '~/types/content-type.interface';

@Component({})
export default class ComponentContentTypeText extends Vue {
    @Prop() public readonly contentType!: IContentType;

    @Inject('CT_TEXT_BLOCK_CLASSES') public readonly wrapperClassNames?: string[];
   
    public $sanitize!: (content: string) => string;

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['text-block'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    public get textContent(): string {
      return (this.contentType as IContentTypeTextBlock).text.value || '';
    }

}
</script>
