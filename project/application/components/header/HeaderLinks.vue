<template>
    <div class="header-links">
        <div class="container">
            <div class="header-links__wrapper">
                <template v-for="headerLink in headerLinksItems">
                    <template v-if="headerLink.children.length">
                        <HeaderLinksInfo
                            :key="headerLink.id"
                            :items="headerLink.children"
                            :title="headerLink.translations"
                            :locale="currentLocal"
                        >
                        </HeaderLinksInfo>
                    </template>
                    <template v-else>
                        <HeaderLink
                            :classname="['btn', 'btn--flex', 'header-links__link']"
                            :item="headerLink"
                            :locale="currentLocal"
                            :key="headerLink.id"
                        >
                        </HeaderLink>
                    </template>
                </template>

                <button
                    type="button"
                    class="nav-link btn btn--flex header-links__flag"
                    v-for="locale in $i18n.locales"
                    :key="locale.code"
                    :disabled="processingTranslates || locale.code === currentLocal"
                    @click.stop="switchLocale(locale.code)"
                >
                    <!-- <NuxtLink :to="switchLocalePath(locale.code)"> -->
                    <span :class="`icon-flag icon-flag--${locale.code}`"></span>
                    <!-- </NuxtLink> -->
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter, Action, Watch } from 'nuxt-property-decorator';
import HeaderLinksInfo from '~/components/header/HeaderLinksInfo.vue';
import { IShopMenu } from '~/types/shop-menu.interface';
import { IMenuItem } from '~/types/header-menu.interface';
import HeaderLink from './HeaderLink.vue';
import { IActionPayloadWithLocale } from '~/types/action-payload-with-locale.interface';
import { IDictionary } from '~/types/dictionary.interface';
import { EStatus } from '~/constants/status';
import { IPage } from '~/types/page.interface';

@Component({
    components: { HeaderLinksInfo, HeaderLink }
})
export default class ComponentHeaderLinks extends Vue {
    @Getter('page-home-menu/getTopHeader') public topHeader!: IShopMenu[];
    @Getter('translations/getStatus') public translationsStatus!: EStatus;
    @Getter('page-static/getPage') public page!: IPage | null;

    @Action('translations/fetchTranslations') public fetchTranslations!: (payload: IActionPayloadWithLocale) => Promise<void>;

    public switchLocalePath!: (locale: string) => string;
    public localePath!: (slug: string, locale?: string) => string;

    public get currentLocal(): string {
        return this.$i18n.locale;
    }

    public get rounteNameAll(): boolean {
        return !!(this.$route?.name?.startsWith('all'))
    }

    public get headerLinksItems(): IMenuItem[] {
        return this.topHeader[0]?.items || [];
    }

    public get processingTranslates(): boolean {
        return this.translationsStatus === EStatus.PROCESSING;
    }

    public switchLocale(locale: string): void  {
        if(this.rounteNameAll) {
            const pageSlug: string | undefined = (this.page?.slugs || {})[locale]
            
            if (!pageSlug) {
                this.$router.replace({ path: this.localePath('/', locale) })
                return
            }

            this.$router.replace({ path: this.localePath(`/${pageSlug}`, locale) })
        } else {
            this.$router.replace(this.switchLocalePath(locale))
        }
    }

    @Watch('$i18n.locale')
    public async watchLocaleHandler(newVal: string): Promise<void> {
        const _locale: string = newVal

        await this.fetchTranslations({ _locale });

        const currentLang: string = this.$i18n.locale;
        const translates: IDictionary<string> = this.$store.getters['translations/getTranslationsData'][currentLang];

        this.$i18n.setLocaleMessage(currentLang, translates);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.header-links {
    background-color: $color-white;
    border-bottom: 1px solid $color-grey;
    @include media-lg {
        display: none;
    }
    &__wrapper {
        display: flex;
        justify-content: flex-end;
    }

    &__link {
        font-size: 12px;
        color: $color-default;
        padding: 13px 12px;

        &:last-child {
            padding-right: 0;
        }
    }

    &__flag {
        padding: 0;
        margin-left: 10px;
        span {
            display: block;
            width: 22px;
            height: 14px;
        }
        &:disabled {
            a {
                pointer-events: none;
                cursor: not-allowed;
            }
        }
    }

    .nav-link {
        background: transparent;
        border: none;
        outline: none;
    }
}

</style>
