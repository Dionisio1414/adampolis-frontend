<template>
    <div :class="internalWrapperClassNames">
        <div 
            class="contact-block__title"
            v-if="contentType && contentType.title"
            v-html="$sanitize(contentType.title)"
        >
        </div>
        <div class="contact-block__list">
            <div 
                class="contact-block__list-item"
                v-for="(val, index) in contactListItems"
                :key="index"
            >
                <ContactBlockItem :data="val"></ContactBlockItem>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';
import { IContentType, IContentBlockItem } from '~/types/content-type.interface';
import ContactBlockItem from './ContactBlockItem.vue';

@Component({
    components: { ContactBlockItem }
})
export default class ComponentContactBlockList extends Vue {
    @Prop() public contentType!: IContentType;
    
    @Inject('CT_CONTACT_BLOCK_LIST') public readonly wrapperClassNames?: string[];

    public get contactListItems(): IContentBlockItem[] {
        return (this.contentType.items as IContentBlockItem[]) ?? [];
    }

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['contact-block'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }
    
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.contact-block {
    &__title {
        font-size: 20px;
        font-weight: bold;
        line-height: 27px;
        margin-bottom: 20px;
        color: $color-dark-blue;
    }
    &__list {
        display: flex;
        align-content: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        @media screen and (min-width: $breakpoint-lg) {
            margin: 0 -15px;
        }
        &-item {
            flex: 0 1 100%;
            max-width: 100%;
            &:not(:last-child) {
                margin-bottom: 10px;
                @media screen and (min-width: $breakpoint-lg) {
                    margin-bottom: 0;
                }
            }
            &:not(:nth-last-child(-n+3)) {
                @media screen and (min-width: $breakpoint-lg) {
                    margin-bottom: 30px;
                }
            }
            @media screen and (min-width: $breakpoint-lg) {
                flex: 0 1 calc(1/3 * 100% - 30px);
                max-width: calc(1/3 * 100% - 30px);
                margin: 0 15px;
            }
        }
    }
}
</style>