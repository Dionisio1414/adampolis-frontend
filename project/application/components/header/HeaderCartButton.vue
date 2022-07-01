<template>
    <Dropdown
        ref="dropdown"
        :options="{
            placement: 'bottom-end',
            modifiers: {
                offset: {
                    offset: '0,22px'
                },
                keepTogether: {
                    enabled: false
                }
            }
        }"
        :appendToBody="true"
    >
        <template>
            <div class="dropdown__body">
                <HeaderCartDropdown
                    @close="close"
                >
                </HeaderCartDropdown>
            </div>
        </template>
        <template v-slot:reference="{ isOpen }">
            <div class="header-cart-button__cart d-md-flex d-none" v-scroll-lock="isOpen">
                <i class="header-cart-button__icon icon icon--shopping-cart"></i>
                <BadgeTooltip :count="cartQuantity"></BadgeTooltip>
            </div>
            <NuxtLink :to="localePath('/basket')" class="dropdown__trigger dropdown__trigger--flex d-flex d-md-none">
                <i class="header-cart-button__icon icon icon--shopping-cart"></i>
                <BadgeTooltip :count="cartQuantity"></BadgeTooltip>
            </NuxtLink>
        </template>
    </Dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import { Dropdown, BadgeTooltip } from '~/components/index';
import HeaderCartDropdown from '~/components/header/HeaderCartDropdown.vue';

@Component({
    components: { BadgeTooltip, HeaderCartDropdown, Dropdown }
})
export default class ComponentHeaderCartButton extends Vue {
    @InjectReactive('HEADER_CART_QUANTITY') public cartQuantity!: number;

    public close(): void {
        (this.$refs.dropdown as any)?.doClose();
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.header-cart-button {
    &__cart {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        cursor: pointer;
    }

    &__icon {
        height: 24px;
        width: 24px;
        margin-right: 8px;
    }
}

.dropdown__trigger {
    opacity: 1;
    padding: 8px;
}

.dropdown__body {
    min-width: 287px;
}
</style>
