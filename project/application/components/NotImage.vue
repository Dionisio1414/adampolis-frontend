<template>
    <div class="not-image">
        <div class="not-image__content">
            <div 
                class="not-image__pic"
                :style="imageStyles"
            >
            </div>
            <div class="not-image__text" v-html="$t('MainProduct.notImage')"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator';
import MixinWindowSize from '~/mixins/window-size';

export interface IPictureStyles {
    width: string;
    height: string;
}

@Component({})
export default class ComponentNotImage extends mixins(MixinWindowSize) {
    @Prop({ default: 0 }) imageWidth!: number;
    @Prop({ default: 0 }) imageHeight!: number;
    @Prop({ default: 0 }) imageWidthMobile!: number;
    @Prop({ default: 0 }) imageHeightMobile!: number;

    public get imageStyles(): IPictureStyles {
        if(this.isMobile) {
            return {
                width: `${this.imageWidthMobile}px`,
                height: `${this.imageHeightMobile}px`
            };
        } else {
            return {
                width: `${this.imageWidth}px`,
                height: `${this.imageHeight}px`
            };
        }
    }

}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.not-image {
    display: flex;
    align-items: center;
    justify-content: center;

    &__pic {
        background-image: url('~assets/images/not-image-icon.svg');
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 auto 15px auto;
    }

    &__text {
        font-size: 14px;
        line-height: 18px;
        font-weight: bold;
        text-align: center;
        color: $color-grey;
        @media screen and (min-width: $breakpoint-lg) {
            font-size: 16px;
            line-height: 22px;
        }
    }
}
</style>