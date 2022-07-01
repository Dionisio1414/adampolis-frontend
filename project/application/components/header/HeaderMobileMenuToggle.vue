<template>
    <div class="header-mobile-menu-toggle">
        <div
            class="header-mobile-menu-toggle__hamburger"
            :class="{ 'header-mobile-menu-toggle__hamburger--active': isOpen }"
            @click="toggleMobileMenu"
        >
            <span v-for="(item, index) in [1, 2, 3]" :key="index"></span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { EBreakpoints } from '../../constants/breakpoints';

import MobileMenu from './MobileMenu.vue';

@Component({})
export default class ComponentHeaderMobileMenuToggle extends Vue {
    public $modal: any;
    public modalName = 'MobileMenuModal';
    public isOpen = false;
    public menuEnabled: boolean = false;
    public resizeListener: () => void = () => this.checkWindowSize();

    public mounted(): void {
        this.checkWindowSize();
        window.addEventListener('resize', this.resizeListener);
    }

    public beforeDestroy(): void {
        window.removeEventListener('resize', this.resizeListener);
    }

    public checkWindowSize(): void {
        if (window.innerWidth < EBreakpoints.LG) {
            this.menuEnabled = true;
        } else {
            this.menuEnabled = false;
            if (this.isOpen) {
                this.toggleMobileMenu();
            }
        }
    }

    public toggleMobileMenu() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.openMobileMenuModal();
        } else {
            this.$modal.hide(this.modalName);
        }
    }

    public openMobileMenuModal(): void {
        this.$modal.show(
            MobileMenu,
            {},
            {
                resizable: false,
                adaptive: true,
                draggable: false,
                scrollable: false,
                height: '100%',
                minWidth: window.innerWidth,
                shiftY: 1,
                shiftX: 0,
                transition: 'slide-left',
                name: this.modalName,
                overlayTransition: 'fade',
                clickToClose: true,
                classes: ['modal-menu-wrapper'],
                focusTrap: true,
                class: ['modal-menu-container']
            },
            {
                'before-close': this.beforeClose
            }
        );
    }

    public beforeClose() {
        this.isOpen = false;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.header-mobile-menu-toggle {
    padding: 12px;
    justify-content: center;
    align-items: center;

    &__hamburger {
        width: 25px;
        height: 25px;
        position: relative;
        transform: rotate(0deg);
        transition: 0.5s ease-in-out;
        cursor: pointer;
        span {
            display: block;
            position: absolute;
            height: 3px;
            width: 100%;
            background: $color-white;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: 0.2s ease-in-out;

            &:nth-child(1) {
                top: 0px;
            }

            &:nth-child(2) {
                top: 11px;
            }

            &:nth-child(3) {
                top: 22px;
            }
        }
        &--active {
            span {
                &:nth-child(1) {
                    top: 11px;
                    transform: rotate(135deg);
                }
                &:nth-child(2) {
                    opacity: 0;
                    left: -60px;
                }
                &:nth-child(3) {
                    top: 11px;
                    transform: rotate(-135deg);
                }
            }
        }
    }
}
</style>
