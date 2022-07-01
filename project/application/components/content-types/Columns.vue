<template>
    <div :class="internalWrapperClassNames">
        <Heading
            class="columns__title"
            v-if="contentType && contentType.title"
            :tag="contentType.title_tag"
            v-html="$sanitize(contentType.title)"
        >
        </Heading>
        <div 
            v-if="contentItems.length"
            class="columns__row" 
        >
            <div 
                class="columns__col"
                v-for="(val, index) in contentItems"
                :key="index"
                v-html="$sanitize(val)"
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
export default class ComponentColumns extends Vue {
    @Prop() public readonly contentType!: IContentType;

    @Inject('CT_COLUMNS') public readonly wrapperClassNames?: string[];

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['columns', 'card', 'card--bordered'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    public get contentItems(): string | string[] {
        return (this.contentType?.items as string[]) ?? [];
    }

}
</script>
<style scoped lang="scss">
@import '~/assets/styles/variables';

.columns {
    font-size: 14px;
    line-height: 22px;
    padding: 20px 15px;
    @media screen and (min-width: $breakpoint-lg) {
        padding: 30px;
    }
    &__title {
        margin-bottom: 20px;
        @media screen and (min-width: $breakpoint-lg) {
            margin-bottom: 30px;
        }
    }
    &__row {
        display: flex;
        flex-wrap: wrap;
    }
    &__col {
        flex: 0 1 100%;
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 1 calc(33.3333% - 15px);
            margin-right: auto;
        }
        &:not(:last-child) {
            margin-bottom: 20px;
            @media screen and (min-width: $breakpoint-lg) {
                margin-bottom: 0;
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
            pre {
                font-family: "OpenSans";
                margin: 0;
            }
            a {
                line-height: 35px;
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
</style>
