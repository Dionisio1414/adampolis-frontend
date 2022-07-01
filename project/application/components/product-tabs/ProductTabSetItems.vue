<template>
    <div class="product-tab-set-items tab-content__item">
        <div class="product-tab-set-items__wrapper">
            <CompleteProductCard 
                class="product-tab-set-items__card" 
                v-for="val in setList" 
                :key="val.id"
                :product="val"
            >
            </CompleteProductCard>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import CompleteProductCard from '~/components/catalogs/CompleteProductCard.vue';
import { IProductInner } from '~/types/product.interface';

@Component({
    components: { CompleteProductCard }
})
export default class ComponentProductTabSetItems extends Vue {
    @InjectReactive('PRODUCT_INNER_SET') public setList!: IProductInner[];
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.product-tab-set-items {
    padding: 20px 0 0 0;
    @media (min-width: $breakpoint-lg) {
        padding: 30px;
    }
    &__wrapper {
        display: flex;
        flex-wrap: wrap;
        @media (min-width: $breakpoint-lg) {
            margin: 0 -15px;
        }
    }
    &__card {
        flex: 1 1 100%;
        max-width: 100%;
        &:not(:last-child) {
            margin-bottom: 15px;
            @media (min-width: $breakpoint-lg) {
                margin-bottom: 0;
            }
        }
        @media (min-width: $breakpoint-lg) {
            flex: 0 1 calc(1/2 * 100% - 30px);
            max-width: calc(1/2 * 100% - 30px);
            margin: 0 15px;
        }
    }
}
</style>
