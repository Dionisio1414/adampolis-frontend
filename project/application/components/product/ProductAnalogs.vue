<template>
    <div class="product-analogs">
        <div class="product-analogs__heading">
            {{ $t('ProductInner.analogs') }}
        </div>

        <div class="product-analogs__grid">
            <div class="row">
                <div
                    class="col-12 col-md-6 col-xl-3 product-analogs__card-container"
                    v-for="analog in analogsList"
                    :key="analog.id"
                >
                    <ProductAnalogCard 
                        :analog="analog" 
                        class="product-analogs__card"
                    >
                    </ProductAnalogCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import ProductAnalogCard from './card/ProductAnalogCard.vue';
import { IProductInner } from '~/types/product.interface';

@Component({
    components: { ProductAnalogCard }
})
export default class ComponentProductAnalogs extends Vue {
    @Prop({ required: true }) public analogsList!: IProductInner;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product-analogs {
    &__heading {
        font-size: 20px;
        color: $color-dark-blue;
        line-height: 27px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    &__card-container {
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .product-analogs {
        &__card-container {
            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }
}
</style>
