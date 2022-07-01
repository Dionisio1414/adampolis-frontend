<template>
    <div :class="internalWrapperClassNames">
        <div class="text-image-section__grid">
            <div class="text-image-section__item">
                <Heading
                    class="text-image-section__header"
                    v-if="contentType.properties && contentType.properties.title"
                    :tag="contentType.properties.title_tag"
                    v-html="$sanitize(contentType.properties.title)"
                >
                </Heading>
                <div 
                    class="text-image-section__text"
                    v-if="contentType.properties && contentType.properties.text"
                    v-html="$sanitize(contentType.properties.text)"
                >
                </div>
            </div>
            <div 
                v-if="showImage" 
                class="d-none d-lg-block text-image-section__item"
            >
                <img 
                    class="picture img-responsive img-responsive--width" 
                    :src="contentType.properties.img" 
                    :alt="contentType.properties.image_alt || ''"
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';
import { IContentType } from '~/types/content-type.interface';
import Heading from '~/components/Heading.vue';

@Component({
    components: { Heading }
})
export default class ComponentTextImageSection extends Vue {
    @Inject('CT_TEXT_IMAGE_SECTION_40_60') public readonly wrapperClassNames?: string[];
    @Prop() public readonly contentType!: IContentType;

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['text-image-section'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    public get showImage(): boolean {
        return !!(this.contentType.properties?.img);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.text-image-section {
    background-color: $color-white;
    padding: 30px 15px 15px 15px;

    &__header {
        font-size: 20px;
        line-height: 27px;
        color: $color-dark-blue;
        font-weight: bold;
        margin-bottom: 20px;
    }

    &__text {
        font-size: 14px;
        line-height: 22px;
        ::v-deep {
            h1 {
                font-family: "Open Sans";
                font-size: 24px;
                font-weight: bold;
                line-height: 33px;
                margin-bottom: 15px;
                color: $color-dark-blue;
                @media screen and (min-width: $breakpoint-lg) {
                    margin-bottom: 30px;
                }
            }
            h2 {
                font-family: "Open Sans";
                font-size: 20px;
                font-weight: bold;
                line-height: 27px;
                margin-bottom: 10px;
                color: $color-dark-blue;
            }
            h3 {
                font-family: "Open Sans";
                font-size: 18px;
                font-weight: bold;
                line-height: 24px;
                margin-bottom: 10px;
                color: $color-dark-blue;
            }
            h4 {
                font-family: "Open Sans";
                font-size: 16px;
                font-weight: bold;
                line-height: 22px;
                margin-bottom: 10px;
                color: $color-dark-blue;
            }
            h5, h6 {
                font-family: "Open Sans";
                font-size: 14px;
                font-weight: bold;
                line-height: 19px;
                margin-bottom: 10px;
                color: $color-dark-blue;
            }
            pre {
                font-family: "OpenSans";
                margin: 0;
                white-space: normal;
                word-break: break-word;
            }
            a {
                color: $color-pink;
            }
            ul {
                li {
                    position: relative;
                    padding-left: 10px;
                    &::before {
                        content: "";
                        background: $color-pink;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}

.picture {
    max-height: 300px;
}

@media (min-width: $breakpoint-lg) {
    .text-image-section {
        padding: 30px;

        &__header {
            margin-bottom: 30px;
            font-size: 24px;
            line-height: 33px;
        }

        &__grid {
            display: flex;
            justify-content: space-between;
        }

        &__item {
            &:first-child {
                flex: 0 1 calc(38% - 45px);
            }
            &:last-child {
                flex: 0 1 calc(62% - 45px);
            }
        }
    }
}
</style>
