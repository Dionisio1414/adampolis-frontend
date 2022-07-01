<template>
    <footer class="footer d-flex">
        <div class="footer__content">
            <div class="footer__inner">
                <div class="content-row">
                    <div 
                        class="content-col content-border" 
                        v-for="item in getFooterItems" 
                        :key="item.title"
                    >
                        <FooterNavList :item="item"></FooterNavList>
                    </div>
                    <div class="content-col">
                        <FooterContacts :shopInfo="shopInfo"></FooterContacts>
                    </div>
                    <div class="content-col">
                        <FooterLogos></FooterLogos>
                    </div>
                </div>
            </div>
        </div>
        <div class="container d-flex footer__bottom">
            <div>
                <span v-for="(item, index) in siteLinks" :key="item.href" class="footer__sitelinks">
                    <a :href="item.href">{{ item.title }}</a>
                    <span v-if="index < siteLinks.length - 1">,</span>
                </span>
            </div>
            <div>
                <span class="footer__title">{{ $t('Footer.Developer.title') }}:</span>
                <NuxtLink :to="localePath('/')" class="btn btn--inline-flex footer__link--underline">
                    {{ $t('Footer.Developer.company') }}
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator';
import FooterNavList from '~/components/footer/FooterNavList.vue';
import FooterContacts from '~/components/footer/FooterContacts.vue';
import FooterLogos from '~/components/footer/FooterLogos.vue';
import { FOOTER_SITE_LINKS } from '../../constants/footerSitelinks';
import { IMenuItem } from '~/types/header-menu.interface';
import { IShopMenu } from '~/types/shop-menu.interface';
import { IShopInfo } from '~/types/shop-info.interface';

@Component({
    components: {
        FooterNavList,
        FooterContacts,
        FooterLogos
    }
})
export default class ComponentFooter extends Vue {
    @Getter('page-home-menu/getFooter') public footerItems!: IShopMenu[];
    @Getter('header-shop-info/getShopInfo') public shopInfo!: IShopInfo;

    public siteLinks: { title: string; href: string }[] = FOOTER_SITE_LINKS;

    public get getFooterItems(): IMenuItem[] {
        return this.footerItems[0]?.items.slice(0, 2) || [];
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.footer {
    flex-direction: column;
    background-color: $color-dark-blue;

    &__content {
        padding: 30px 24px 22px;
        border-bottom: 1px solid $color-default;
    }

    &__inner {
        max-width: 1200px;
        margin: auto;
        width: 100%;
    }

    .content {
        &-row {
            display: flex;
        }

        &-col {
            flex: 1 1 0;
        }
    }

    &__bottom {
        padding-top: 22px;
        padding-bottom: 22px;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 300;
    }

    &__sitelinks {
        display: inline-flex;
        a {
            color: $color-grey;
            font-size: 12px;
            letter-spacing: 0;
            line-height: 18px;
            &:hover {
                color: lighten($color-grey, 10);
            }
        }
        span {
            color: $color-grey;
            margin-right: 5px;
        }
    }

    &__title,
    &__link {
        color: $color-grey;
        padding: 0;
        text-decoration: none;
        font-weight: 300;

        &--underline {
            @extend .footer__link;
            &:hover {
                color: lighten($color-grey, 10);
            }
            padding-right: 13px;
            text-decoration: underline;
        }
    }
}

@include media-lg {
    .footer {
        &__content {
            & > div {
                margin-left: auto;
                margin-right: auto;
                width: 100%;
                max-width: #{$container-width + ($grid-gutter * 2)};
            }
        }
    }
}

@include media-md {
    .footer {
        &__content {
            padding: 0;
        }

        &__bottom {
            flex-direction: column;
            & > div {
                &:last-child {
                    margin-top: 10px;
                }
            }
        }

        &__sitelinks {
            a {
                text-decoration: none;
            }
        }

        &__title,
        &__link {
            margin: 5px 0;
            font-size: 12px;
        }
    }

    .content {
        &-border {
            border-bottom: 1px solid $color-default;
        }
        &-row {
                display: block !important;
        }
    }
}
</style>
