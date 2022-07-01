<template>
    <div class="mobile-menu-catalog mobile-menu__catalog">
        <div @click="back" class="mobile-menu-catalog__back container">
            <i class="icon icon--arrow-left-grey"></i> {{ $t('MobileMenuCatalog.goback') }}
        </div>
        <div class="mobile-menu-catalog__items">
            <div
                class="mobile-menu-catalog__item container"
                v-for="item in menuItems"
                :key="item.id"
                @click="setCategory(item)"
            >
                {{ (item.translations[currentLocal] || {}).title }}
                <i v-if="item.children && item.children.length" class="icon icon--arrow-right-grey"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { IMenuItem } from '~/types/header-menu.interface';

@Component({})
export default class ComponentMobileMenuCatalog extends Vue {
    @Prop()
    public readonly menuItems!: any[];
    public back() {
        this.$emit('toMainMenu');
    }

    public setCategory(item: [IMenuItem]) {
        this.$emit('setCategory', item);
    }

    public get currentLocal(): string {
        return this.$i18n.locale;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.mobile-menu-catalog {
    &__back {
        background-color: $color-dark-grey;
        padding-top: 17px;
        padding-bottom: 15px;
        border-top: 1px solid $color-grey;

        i {
            font-size: 9px;
        }
    }
    &__items {
        height: 100%;
        max-height: calc(100% - 50px);
        overflow: scroll;
        background-color: $color-white;
    }

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $color-dark-blue;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 19px;
        padding-top: 13px;
        padding-bottom: 13px;
        border-top: 1px solid $color-dark-grey;
        cursor: pointer;

        i {
            font-size: 9px;
        }
    }
}
</style>
