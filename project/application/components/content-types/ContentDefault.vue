<template>
    <div 
        :class="internalWrapperClassNames" 
    >
        <div class="content-default__header">
            <h1 class="h1" v-html="$sanitize(title)"></h1>
        </div>
        <div class="content__block" v-html="$sanitize(content)"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';

@Component({})
export default class ComponentContentDefault extends Vue {
    @Prop() public content!: string;
    @Prop() public title!: string;

    @Inject('CT_CONTENT_DEFAULT_CLASSES') public readonly wrapperClassNames?: string[];

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['content-default', 'card', 'card--bordered'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.content-default {
    padding: 15px 15px 20px 15px;
    @media screen and (min-width: $breakpoint-lg) {
        padding: 30px 30px 40px 30px;
    }
    &__header {
        margin-bottom: 15px;
        @media screen and (min-width: $breakpoint-lg) {
            margin-bottom: 30px;
        }
        .h1 {
            font-size: 20px;
            line-height: 28px;
            @media screen and (min-width: $breakpoint-lg) {
                font-size: 24px;
                line-height: 33px;
            }
        }
    }
    ::v-deep {
        h2, h3, h4, h5, h6 {
            font-size: 14px;
            line-height: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: $color-dark-blue;
            @media screen and (min-width: $breakpoint-lg) {
                font-size: 16px;
                line-height: 22px;
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
    }
}
</style>