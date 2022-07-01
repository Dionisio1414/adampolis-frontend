<template>
    <div class="header-profile d-lg-flex">
        <div class="header-profile__actions d-flex" v-if="!isAuth">
            <button @click="login" class="btn btn--primary header-profile__sign-button">
                {{ $t('HeaderProfile.login') }}
            </button>
            <button @click="signup" class="btn btn--secondary-black-border header-profile__sign-button">
                {{ $t('HeaderProfile.register') }}
            </button>
        </div>

        <div v-if="isAuth" class="d-flex">
            <div class="header-profile__profile">
                <span class="header-profile__icon icon icon--user user-menu-icon-profile"></span>
                <div class="d-flex">
                    <div class="header-profile__company">
                        <HeaderUserMenu />
                        <div class="header-profile__logout" @click="logoutHandler">{{ $t('HeaderProfile.logout') }}</div>
                    </div>
                </div>
            </div>
            <HeaderFavoriteButton class="header-profile__favorites" />
        </div>

        <HeaderCartButton class="header-profile__cart" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Action, Getter } from 'nuxt-property-decorator';
import HeaderUserMenu from '~/components/header/HeaderUserMenu.vue';
import HeaderFavoriteButton from '~/components/header/HeaderFavoriteButton.vue';
import HeaderCartButton from '~/components/header/HeaderCartButton.vue';
import HeaderRegistrationPopup from '~/components/header/HeaderRegistrationPopup.vue';
import HeaderLoginPopup from '~/components/header/HeaderLoginPopup.vue';

@Component({
    components: {
        HeaderUserMenu,
        HeaderFavoriteButton,
        HeaderCartButton,
        HeaderRegistrationPopup,
        HeaderLoginPopup
    }
})
export default class ComponentHeaderCustomer extends Vue {
    @Getter('auth/isAuthorized') public isAuth!: boolean

    @Action('auth/onLogout') public logout!: () => Promise<void>

    public $modal: any;
    public name: string = '';

    public get currentModalName(): string {
        return this.name;
    }

    public logoutHandler() {
        this.logout();
        this.$router.push('/');
    }

    public login() {
        this.$modal.show(
            HeaderLoginPopup,
            {
                modal: this.$modal,
            },
            {
                resizable: false,
                adaptive: true,
                draggable: false,
                scrollable: true,
                height: 'auto',
                minWidth: 0,
                maxWidth: 388,
                shiftY: 0.5,
                transition: 'modal',
                overlayTransition: 'fade',
                clickToClose: true,
                classes: 'login-popup modal--mobile-full'
            },
            {
                'before-close': this.beforeClose,
                'before-open': this.opened
            }
        );
    }

    public signup() {
        this.$modal.show(
            HeaderRegistrationPopup,
            {
                modal: this.$modal,
                modalName: this.currentModalName,
            },
            {
                resizable: false,
                adaptive: true,
                draggable: false,
                scrollable: true,
                height: 'auto',
                minWidth: 0,
                maxWidth: 590,
                shiftY: 0.5,
                transition: 'modal',
                overlayTransition: 'fade',
                clickToClose: true,
                classes: 'registration-popup modal--mobile-full'
            },
            {
                'before-close': this.beforeClose,
                'before-open': this.opened
            }
        );
    }

    private beforeClose(event: any): void {
        console.log('event', event);
    }

    public opened({ name }: any): void {
        this.name = name;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.header-profile {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;

    &__sign-button {
        width: 120px;
        padding: 9px 0;
        font-size: 16px;
        line-height: 22px;
        font-weight: 600;
        &:not(:first-child) {
            margin-left: 10px;
            @media screen and (min-width: $breakpoint-laptop) {
                margin-left: 18px;
            }
        }
    }

    &__cart {
        background-color: $color-pink;
        border-radius: 4px;
    }

    &__profile {
        display: flex;
        align-items: center;
        padding-right: 12px;
        border-right: 1px solid $color-grey;
    }

    &__icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        margin-right: 9px;
        margin-top: 5px;
    }
    &__logout {
        color: $color-default;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 17px;
        cursor: pointer;
        width: max-content;
    }

    &__favorites,
    &__cart {
        margin-left: 10px;
        @media screen and (min-width: $breakpoint-laptop) {
            margin-left: 18px;
        }
    }
}
</style>
