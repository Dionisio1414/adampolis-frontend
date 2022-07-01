<template>
    <div
      :class="internalWrapperClassNames"
      v-html="$sanitize(htmlContent)"
    >
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';

import { IContentType } from '~/types/content-type.interface';

@Component({})
export default class ComponentContentTypeText extends Vue {
    @Prop() public readonly contentType!: IContentType;

    @Inject('CT_WYSIWYG') public readonly wrapperClassNames?: string[];
   
    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['wysiwyg', 'card', 'card--bordered'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    public get htmlContent(): string {
        if(this.contentType?.content) {
            return this.contentType.content;
        } else {
            return '';
        }
    }

}
</script>
<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.wysiwyg {
    padding: 15px 15px 20px 15px;
    @media screen and (min-width: $breakpoint-lg) {
        padding: 30px 30px 40px 30px;
    }
    &__header {
        margin-bottom: 15px;
        @media screen and (min-width: $breakpoint-lg) {
            margin-bottom: 30px;
        }
    }
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
        a {
            font-size: 14px;
            line-height: 18px;
            color: $color-pink;
            @media screen and (min-width: $breakpoint-lg) {
                font-size: 16px;
                line-height: 24px;
            }
        }
        strong {
            font-size: 14px;
            line-height: 18px;
            color: #000;
            @media screen and (min-width: $breakpoint-lg) {
                font-size: 16px;
                line-height: 24px;
            }
        }
        pre {
            font-family: "Open Sans";
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 15px;
            color: #000;
            word-break: break-word;
            white-space: normal;
            margin: 0;
            @media screen and (min-width: $breakpoint-lg) {
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 30px;
            }
        }
        p {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 15px;
            color: #000;
            @media screen and (min-width: $breakpoint-lg) {
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 30px;
            }
            &:empty {
                display: none;
            }
        }
        ul {
            li {
                font-size: 14px;
                line-height: 22px;
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
        ol {
            li {
                font-size: 14px;
                line-height: 22px;
            }
        }
    }
}
</style>
