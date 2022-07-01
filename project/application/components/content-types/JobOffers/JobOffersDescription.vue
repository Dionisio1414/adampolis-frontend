<template>
    <div class="job-offers-description">
        <h3 class="job-offers-description__subheader">{{ title }}</h3>
        <div class="job-offers-description__text" v-html="$sanitize(description)"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentJobOffersDescription extends Vue {
    @Prop() public title!: string;
    @Prop() public description!: string;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.job-offers-description {
    margin-bottom: -20px;
    &__subheader {
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        margin: 0 0 20px 0;
        color: $color-dark-blue;
    }
    &__text {
        font-size: 14px;
        line-height: 22px;
        max-width: 632px;
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
            p {
                margin-bottom: 20px;
            } 
            ul {
                @extend p;
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