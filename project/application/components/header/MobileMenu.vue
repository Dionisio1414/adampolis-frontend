<template>
    <div
        class="mobile-menu"
        v-scroll-lock="scrollLockFlag"
        :style="inlineStylesWrapper"
        :class="{ 'no-max-height': isOpenCatalog }"
    >
        <div class="mobile-menu__search container">
            <Search @search="searchHandler"></Search>
        </div>

        <div class="p-relative" :style="inlineStylesInner" :class="{ 'overflow-hidden': isOpenCatalog }">
            <MobileMenuCatalog
                @toMainMenu="triggerCatalog"
                @setCategory="triggerCategories"
                :menuItems="menuItemsList"
                class="catalog"
                :class="{ 'mobile-menu__catalog--active': isOpenCatalog }"
            />
            <MobileMenuCategories
                @toCatalog="isOpenCategories = false"
                @onNavigate="clickAction"
                class="mobile-menu__categories"
                :category="category"
                :class="{ 'mobile-menu__categories--active': isOpenCategories }"
            />
            <div class="mobile-menu__catalog-button container" @click="triggerCatalog">
                <div class="mobile-menu__catalog-button--inner">
                    <i class="icon icon--catalog mobile-menu__icon"></i>
                    {{ $t('MobileMenu.catalog') }}
                </div>
                <i class="icon icon--arrow-right-grey mobile-menu__icon"></i>
            </div>
            <div class="mobile-menu__static-pages container">
                <NuxtLink
                    :to="localePath(`${item.path}`)"
                    class="dropdown__trigger dropdown__trigger--flex mobile-menu__link"
                    v-for="(item, index) in staticPages"
                    :key="index"
                    @click.native="clickAction"
                >
                    {{ $t(`${item.title}`) }}
                </NuxtLink>
            </div>
            <div class="mobile-menu__profile">
                <div class="d-flex mobile-menu__buttons container" v-if="!isAuthorized">
                    <button @click="login" class="btn btn--primary mobile-menu__sign-button">
                        {{ $t('MobileMenu.login') }}
                    </button>
                    <button @click="signup" class="btn btn--secondary-black-border mobile-menu__sign-button">
                        {{ $t('MobileMenu.register') }}
                    </button>
                </div>
                <template v-else>
                    <div class="d-flex mobile-menu__profile--inner">
                        <div class="mobile-menu__company container">
                            <span class="mobile-menu__company-avatar">
                                <i
                                    class="mobile-menu__company-icon icon icon--user user-menu-icon-profile mobile-menu__icon"
                                ></i>
                            </span>
                            <span>{{ profileData.companyName }}</span>
                        </div>
                        <HeaderUserMenuLinks @onNavigate="clickAction" class="container" />
                    </div>
                    <div @click="logoutHandler" class="mobile-menu__logout container">
                        <span>{{ $t('MobileMenu.logout') }}</span>
                        <i class="icon icon--logout mobile-menu__icon"></i>
                    </div>
                </template>
            </div>

            <div class="mobile-menu__localization container">
                <button
                    type="button"
                    v-for="(locale, index) in $i18n.locales"
                    :key="locale.code"
                    class="btn d-flex mobile-menu__flag flex-1"
                    @click.stop="switchLang(locale.code)"
                    :disabled="processingTranslates"
                >
                    <span :class="`mobile-menu__flag-icon icon-flag icon-flag--${locale.code}`"></span>
                    <span
                        class="mobile-menu__title"
                        :class="{ 'mobile-menu__title--active': currentLocale === locale.code }"
                    >
                        {{ locations[index].title }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Component, Getter, Action } from 'nuxt-property-decorator';

import MobileMenuCatalog from '~/components/header/MobileMenuCatalog.vue';
import MobileMenuCategories from '~/components/header/MobileMenuCategories.vue';
import HeaderUserMenuLinks from '~/components/header/HeaderUserMenuLinks.vue';
import HeaderLoginPopup from '~/components/header/HeaderLoginPopup.vue';
import HeaderRegistrationPopup from '~/components/header/HeaderRegistrationPopup.vue';
import { Search } from '~/components';

import { LOCATIONS } from '~/constants/locations';
import { MOBILE_MENU_STATIC_LINKS } from '~/constants/mobileMenuStaticLinks';

import { IMenuItem } from '~/types/header-menu.interface';
import { MODAL_CONFIG } from '~/constants/modalConfig';

interface IInlineStylesInner {
    'max-height': string;
    'min-height': string;
}

interface IInlineStylesWrapper {
    'max-height': string;
    'margin-top': string;
}
import { IProfileData } from '~/types/profile-data.interface';
import { IActionPayloadWithLocale } from '~/types/action-payload-with-locale.interface';
import { IDictionary } from '~/types/dictionary.interface';
import { EStatus } from '~/constants/status';
import { IPage } from '~/types/page.interface';

@Component({
    components: {
        MobileMenuCatalog,
        MobileMenuCategories,
        HeaderUserMenuLinks,
        Search
    }
})
export default class ComponentMobileMenu extends Vue {
    @Getter('page-profile-data/getProfileData') public profileData!: IProfileData;
    @Getter('page-home-menu/getMainMenu') public menu!: [IMenuItem];
    @Getter('auth/isAuthorized') public isAuthorized!: boolean;
    @Getter('translations/getStatus') public translationsStatus!: EStatus;
    @Getter('page-static/getPage') public page!: IPage | null;
    
    @Action('auth/onLogout') public logout!: () => Promise<void>;
    @Action('translations/fetchTranslations') public fetchTranslations!: (payload: IActionPayloadWithLocale) => Promise<void>;

    public locations: { title: string; value: string }[] = LOCATIONS;
    public staticPages: { title: string; path: string }[] = MOBILE_MENU_STATIC_LINKS;
    public category: any = null;
    public $i18n!: VueI18n;
    public $modal: any;
    public name: string = '';
    public isOpenCatalog: boolean = false;
    public isOpenCategories: boolean = false;
    public windowInner: number = 0;
    public timer: ReturnType<typeof setTimeout> | null = null;
    public scrollLockFlag: boolean = true;
    public switchLocalePath!: (locale: string) => string;
    public localePath!: (slug: string) => string;

    public get currentLocale(): string {
        return this.$i18n.locale;
    }

    public get windowSize(): number {
        return Math.round(this.windowInner);
    }

    public get inlineStylesWrapper(): IInlineStylesWrapper {
        return { 'max-height': `calc(100% - ${this.windowSize}px)`, 'margin-top': `${this.windowSize}px` };
    }

    public get inlineStylesInner(): IInlineStylesInner {
        return {
            'max-height': `${window.innerHeight - this.windowSize - 60}px`,
            'min-height': `${window.innerHeight - this.windowSize - 60}px`
        };
    }

    public get menuInstance(): IMenuItem {
        return (this.menu as any)[0].items[0] ?? null;
    }

    public get menuItemsList(): IMenuItem[] {
        return this.menuInstance?.children ?? [];
    }

    public get menuTitle(): string | null {
        return (this.menuInstance?.translations || {})[this.$i18n.locale]?.title || null;
    }

    public get processingTranslates(): boolean {
        return this.translationsStatus === EStatus.PROCESSING;
    }

    public logoutHandler(): void {
        this.logout();
        this.$router.push('/');
    }

    public login(): void {
        this.$modal.show(
            HeaderLoginPopup,
            {
                modal: this.$modal
            },
            {
                ...MODAL_CONFIG,
                classes: 'login-popup modal--mobile-full',
                class: ['modal-menu-container']
            },
            {
                'opened': this.clickAction
            }
        );
    }

    public signup(): void {
        this.$modal.show(
            HeaderRegistrationPopup,
            {
                modal: this.$modal
            },
            {
                ...MODAL_CONFIG,
                classes: 'registration-popup modal--mobile-full',
                class: ['modal-menu-container']
            },
            {
                'opened': this.clickAction
            }
        );
    }

    public triggerCatalog(): void {
        this.isOpenCatalog = !this.isOpenCatalog;
    }

    public triggerCategories(category: any): void {
        this.category = category;
        this.$nextTick(() => {
            this.isOpenCategories = !this.isOpenCategories;
        });
    }

    public resetComponent(): void {
        this.category = null;
        this.isOpenCatalog = false;
        this.isOpenCategories = false;
    }

    public clickAction(): void {
        this.resetComponent();
        this.$emit('close');
    }
    public mounted(): void {
        window.addEventListener('resize', () => this.checkWindowSize());
        window.addEventListener('scroll', () => this.checkWindowSize());
        this.checkWindowSize();
    }

    public beforeDestroy(): void {
        window.removeEventListener('resize', () => this.checkWindowSize());
        window.removeEventListener('scroll', () => this.checkWindowSize());
    }

    public checkWindowSize(): void {
        const offsetTop =
            (((document.querySelector('header') || {}) as HTMLHeadElement).getBoundingClientRect() || {}).top || 0;
        this.windowInner = offsetTop + 50;
    }

    public searchHandler(): void {
        this.clickAction();
    }

    public async switchLang(_locale: string): Promise<any> {
        if(_locale !== this.currentLocale) {
            const routeName = this.$route.name;
            const currentSlug = String(this.page?.slugs[_locale]);

            await this.fetchTranslations({ _locale });
            await this.$router.replace(this.switchLocalePath(_locale));
            this.clickAction();

            if(routeName?.startsWith('all')) {
                await this.$router.replace(this.localePath(`/${currentSlug}`));
            }

            const currentLang: string = this.$i18n.locale;
            const translates: IDictionary<string> = this.$store.getters['translations/getTranslationsData'][currentLang];
            
            this.$i18n.setLocaleMessage(currentLang, translates);
        }
        
        return false;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.mobile-menu {
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: $color-white;
    position: relative;
    width: 100vw;
    max-width: $breakpoint-md;
    height: 100vh;

    @media (min-width: $breakpoint-sm) {
        max-width: 400px;
    }

    &__search {
        background-color: $color-dark-grey;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    &__catalog-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 13px;
        padding-bottom: 13px;

        i {
            font-size: 9px;
        }

        &--inner {
            color: $color-dark-blue;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0;
            line-height: 19px;
            display: flex;
            align-items: center;

            i {
                font-size: 24px;
                margin-right: 10px;
            }
        }
    }

    &__static-pages {
        padding-top: 10px;
        padding-bottom: 10px;
        border-top: 1px solid $color-grey;

        .mobile-menu__link {
            color: $color-dark-blue;
            font-size: 14px;
            letter-spacing: 0;
            line-height: 19px;
            padding: 9px 0;
            margin: 2px 0;
        }
    }

    &__company {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        color: $color-dark-blue;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 19px;
    }

    &__company-avatar {
        height: 40px;
        width: 40px;
        border: 1px solid $color-dark-grey;
        background-color: $color-white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 50%;
    }

    &__company-icon {
        font-size: 24px;
    }

    &__profile {
        border-top: 1px solid $color-grey;

        &--inner {
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: $color-light-grey;
            flex-direction: column;
        }

        ::v-deep {
            .link {
                color: $color-dark-blue;
                font-size: 14px;
                letter-spacing: 0;
                line-height: 19px;
                padding: 8px 0;
                margin: 2px 0;
            }
        }
    }

    &__logout {
        border-top: 1px solid $color-grey;
        background-color: $color-light-grey;
        color: $color-dark-blue;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 19px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 10px;

        i {
            font-size: 24px;
        }
    }

    &__buttons {
        padding-top: 10px;
        padding-bottom: 10px;
        flex-direction: column;
        .btn {
            margin: 5px 0;
            &:first-child {
                margin-top: 0;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &__localization {
        display: flex;
        justify-content: space-between;
        padding-top: 16px;
        padding-bottom: 16px;
        border-top: 1px solid $color-grey;

        .mobile-menu__flag {
            align-items: center;
            padding: 0;
        }
        .mobile-menu__title {
            color: $color-grey-placeholder;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0;
            line-height: 19px;
            padding-left: 10px;
            &--active {
                color: $color-dark-blue;
            }
        }
        .btn {
            background: transparent;
            border: none;
            outline: none;
        }
    }

    &__catalog,
    &__categories {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        transform: translateX(100%);
        transition: all 0.2s ease-out;
        will-change: transform;
        opacity: 0;

        &--active {
            opacity: 1;
            -webkit-overflow-scrolling: touch; /*MAKES OVERFLOWN OBJECTS HAVE INERTIA SCROLLING*/
            transform: translateX(0);
        }
    }

    &__categories {
        z-index: 2;
    }
}

@include media-lg {
    .mobile-menu {
        max-width: 400px;
    }
}
</style>
