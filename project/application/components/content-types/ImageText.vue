<template>
    <article :class="internalWrapperClassNames">
        <div 
            class="image-text__column"
            :class="{
                'image-text__column--right': isReverse,
                'image-text__column--description': !isReverse
            }"
        >
            <div class="image-text__content">
                <Heading
                    class="image-text__title"
                    v-if="contentType.properties && contentType.properties.title"
                    :tag="contentType.properties.title_tag"
                    v-html="$sanitize(contentType.properties.title)"
                >
                </Heading>
                <p 
                    v-if="contentType.properties && contentType.properties.text"
                    v-html="$sanitize(contentType.properties.text)"
                >
                </p>
            </div>
        </div>
        <div 
            class="image-text__column"
            :class="{
                'image-text__column--left': isReverse,
                'image-text__column--picture': !isReverse
            }"
        >
            <img 
                class="img-responsive img-responsive--width img-responsive--height" 
                :src="contentType.properties.img" 
                :alt="contentType.properties.image_alt"
            >
        </div>
    </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';
import { IContentType, IContentTypeProperty } from '~/types/content-type.interface';
import Heading from '~/components/Heading.vue';

@Component({
    components: { Heading }
})
export default class ComponentImageText extends Vue {
    @Prop() public readonly contentType!: IContentType;
    @Inject('CT_IMAGE_TEXT_50_50') public readonly wrapperClassNames?: string[];

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['image-text'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    public get contentTypeProperties(): IContentTypeProperty | null {
        return this.contentType?.properties ? this.contentType.properties : null;
    }

    public get isReverse(): boolean {
        return (this.contentType.properties as IContentTypeProperty)?.reverse;
    }
}
</script>


<style lang="scss" scoped>
@import '~/assets/styles/variables';

.image-text {
    background: #fff;
    display: flex;
    flex-wrap: wrap; 
    + .image-text {
        padding-top: 30px;
        @media screen and (min-width: $breakpoint-lg) {
            padding-top: 0;
        }
    }
    ::v-deep {
        + *:not(.image-text) {
            margin-top: 40px;
        }
    }
    &__column {
        flex: 0 1 100%;
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 1 50%;
        }
        &:first-child {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            @media screen and (min-width: $breakpoint-lg) {
                justify-content: center;
            }
        }
        &:last-child {
            min-height: 225px;
            @media screen and (min-width: $breakpoint-lg) {
                min-height: 450px;
            }
        }
        &--right {
            order: 1;
            padding: 30px 15px;
            @media screen and (min-width: $breakpoint-lg) {
                order: 2;
                padding: 0;
            }
        }
        &--left {
            order: 2;
            @media screen and (min-width: $breakpoint-lg) {
                order: 1;
            }
        }
        &--description {
            padding: 30px 15px;
            @media screen and (min-width: $breakpoint-lg) {
                padding: 0;
            }
        }
    }

    &__content {
        max-width: 100%;
        @media screen and (min-width: $breakpoint-lg) {
            max-width: 387px;
        }
        ::v-deep p {
            font-size: 14px;
            line-height: 22px;
            color: #000;
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 20px;
        line-height: 27px;
        @media screen and (min-width: $breakpoint-lg) {
            font-size: 24px;
            line-height: 33px;
        }
    }
}
</style>
