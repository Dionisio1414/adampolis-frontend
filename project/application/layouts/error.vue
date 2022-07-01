<template>
    <main class="page page-error">
        <div class="container">
            <div class="row">
                <div class="col">
                    <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
                </div>
            </div>
            <div class="page-error__wrapper">
                <div class="row">
                    <div class="col-12 col-lg-6 order-2 order-lg-1">
                        <div 
                            class="page-error__title" 
                            v-if="notFoundError"
                        >
                            <div class="page-error__title-text" v-html="$sanitize(errorsTextObject.titleFirst)"></div>
                            <div class="page-error__title-text" v-html="$sanitize(errorsTextObject.titleSecond)"></div>
                        </div>
                        <div class="page-error__title" v-html="$sanitize(errorsTextObject.title)" v-else></div>
                        <div class="page-error__description" v-html="$sanitize(errorsTextObject.description)"></div>
                        <div class="page-error__actions">
                            <nuxt-link :to="localePath('/')" class="btn btn--pink page-error__actions-btn">
                                {{ $t('ErrorPage.buttonText') }}
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 order-1 order-lg-2">
                        <div class="page-error__code">
                            {{ currentStatusCode }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import BreadCrumbs from '~/components/BreadCrumbs.vue';
import { IErrorPageText } from '~/types/error-page-text.interface';
import { IBreadcrumbs } from '~/types/breadcrumbs.interface';


@Component({
    components: { BreadCrumbs }
})
export default class LayoutError extends Vue {
    @Prop()
    public error?: any;

    public get notFoundError(): boolean {
        if(!this.error) return false;
        return this.error?.error?.code === 404 || this.error?.statusCode === 404;
    }

    public get unknownError(): boolean {
        return !this.error || !this.notFoundError;
    }

    public get currentStatusCode(): number | null {
       return this.error?.statusCode || null;
    }
  
    public get breadcrumbs(): IBreadcrumbs[] {
        return [
            {
                key: 'error',
                title: this.$t('ErrorPage.breadcrumbs.error').toString(),
                link: '/'
            }
        ];
    }

    public get errorsTextObject(): IErrorPageText {
        if(this.notFoundError) {
            return {
                titleFirst: this.$t('ErrorPage.errors.notFoundError.titleFirst').toString(),
                titleSecond: this.$t('ErrorPage.errors.notFoundError.titleSecond').toString(),
                description: this.$t('ErrorPage.errors.notFoundError.description').toString()
            } 
        } 
        
        return {
            title: this.$t('ErrorPage.errors.unknownError.title').toString(),
            description: this.$t('ErrorPage.errors.unknownError.description').toString()
        }
    }

}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.page-error {
    padding-bottom: 50px;
    @media screen and (min-width: $breakpoint-lg) {
        padding-bottom: 93px;
    }
    &__wrapper {
        background: $color-white;
        border: 1px solid rgba(203,208,216, .6);
        padding: 15px 15px 20px 15px;
        @media screen and (min-width: $breakpoint-lg) {
            padding: 30px;
        }
        @media screen and (min-width: $breakpoint-xl) {
            padding: 100px;
        }
    }
    &__code {
        font-size: 100px;
        line-height: 136px;
        font-weight: bold;
        color: $color-dark-grey;
        @media screen and (min-width: $breakpoint-lg) {
            font-size: 247px;
            line-height: 1;
            text-align: center;
        }
    }
    &__title {
        font-size: 24px;
        line-height: 33px;
        font-weight: bold;
        margin-bottom: 30px;
        color: $color-dark-blue;
        @media screen and (min-width: $breakpoint-lg) {
            font-size: 40px;
            line-height: 48px;
            margin-bottom: 20px;
        }
    }
    &__description {
        font-size: 16px;
        line-height: 24px;
        padding-right: 0;
        margin-bottom: 30px;
        color: $color-default;
        @media screen and (min-width: $breakpoint-lg) {
            padding-right: 100px;
        }
    }
    &__actions {
        &-btn {
            min-width: 210px;
            width: 100%;
            @media screen and (min-width: $breakpoint-lg) {
                width: auto;
            }
        }
    }
}
</style>
