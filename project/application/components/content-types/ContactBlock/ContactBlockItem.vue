<template>
    <div class="contact-block-item">
        <div class="contact-block-item__information">
            <div 
                class="caption"
                v-if="data && data.block_title"
                v-html="$sanitize(data.block_title)"
            >
            </div>
            <div 
                v-if="isAddress" 
                class="description"
                v-html="$sanitize(data.content)"
            >
            </div>
            <a 
                v-else 
                :href="linkType" 
                class="link"
                v-html="$sanitize(data.content)"
            >
            </a>
        </div>
        <div class="contact-block-item__icon" v-if="data && data.icon">
            <img
                class="img-responsive img-responsive--width"
                :src="require(`~/assets/images/contact-${currentType}.svg`)"
                :alt="`icon-${currentType}`"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { EContactTypes } from '~/constants/contactTypes';
import { IContentBlockItem } from '~/types/content-type.interface';

@Component({})
export default class ComponentContactBlockItem extends Vue {
    @Prop() public data!: IContentBlockItem;

    public $sanitize!: (value: string, options?: any) => string

    public get isAddress(): boolean {
        return this.data.icon.toLowerCase() === EContactTypes.ADDRESS.toLowerCase();
    }

    public get currentType(): string {
        return this.data.icon.toLowerCase() || '';
    }

    public get linkType(): string {
        switch (this.currentType) {
            case EContactTypes.PHONE.toLowerCase():
                return this.$sanitize(
                    `tel:${this.data.content}`,
                    {
                        allowedTags: [],
                        allowedAttributes: {},
                        allowedStyles: {}
                    }
                ).trim().replace(/\s/g, '');
            case EContactTypes.EMAIL.toLowerCase():
                return this.$sanitize(
                    `mailto:${this.data.content}`,
                    {
                        allowedTags: [],
                        allowedAttributes: {},
                        allowedStyles: {}
                    }
                ).trim();
            default:
                return '';
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.contact-block-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border: 1px solid rgba(203, 208, 216, 0.6);
    border-radius: 4px;
    padding: 20px;

    @include media-lg {
        padding: 15px;
    }

    &__information {
        flex: 0 1 calc(80% - 15px);
    }
    &__icon {
        background: $color-light-grey;
        border-radius: 50%;
        padding: 19px;
        width: 70px;
        height: 70px;
        @include media-lg {
            padding: 13px;
            width: 50px;
            height: 50px;
        }
    }

    .caption {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        color: $color-dark-blue;
    }

    .description {
        font-size: 16px;
        line-height: 24px;
        color: $color-search-bg;
    }

    .link {
        @extend .description;
        display: block;
        text-decoration: none;
        word-break: break-all;
    }
}
</style>
