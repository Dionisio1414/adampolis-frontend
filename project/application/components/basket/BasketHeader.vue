<template>
    <div class="basket-header">
        <div class="row">
            <div class="col">
                <div class="basket-header__title">
                    {{ $t('BasketPage.basketHeader.title') }}                
                </div>
            </div>
            <div class="col-8 col-lg-6 text-right">
                <NuxtLink 
                    to="/" 
                    class="basket-header__link"
                >
                    <i class="icon icon-arr icon-arr--left"></i>
                    {{ $t('BasketPage.basketHeader.topBtnText') }}                
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
@Component({})
export default class ComponentBasketHeader extends Vue {}

</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.basket {
    &-header {
        padding: 20px 0;
        &__link {
            color: $color-dark-blue;
        }
    }
}

.icon {
    width: 6px;
    height: 10px;
    margin-right: 4px;
}
</style>