<template>
    <div class="product-tab-documents tab-content__item">
        <div class="product-tab-documents__wrapper">
            <div class="d-none d-lg-block product-tab-documents__caption">
                {{ $t('CatalogPage.ProductCard.tabs.documentsTabText') }}
            </div>
            <ul class="product-tab-documents__list">
                <li 
                    class="product-tab-documents__item"
                    v-for="(val, index) in files"
                    :key="index"
                >
                    <i class="icon icon--document product-tab-documents__icon"></i>
                    <a 
                        :href="transformFilePath(val.path)" 
                        class="product-tab-documents__link" 
                        target="_blank"
                    > 
                        {{ val.path | formatFileName }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, InjectReactive } from 'nuxt-property-decorator';
import { IProductInnerFile } from '~/types/product.interface';

@Component({})
export default class ComponentProductTabDocuments extends Vue {
    @InjectReactive('PRODUCT_INNER_FILES') public files!: IProductInnerFile[] | [];

    public transformFilePath(path: string): string {
        const { apiURL } = this.$config;

        if(!path.includes('https')) {
            return `${apiURL}${path}`;
        } else {
            return path;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product-tab-documents {
    padding: 20px 0 0 0;
    &__caption {
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        margin-bottom: 20px;
        color: $color-dark-blue;
    }

    &__item {
        display: flex;
        align-items: center;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }

    &__link {
        font-size: 14px;
        color: $color-pink;
    }
}

@media (min-width: $breakpoint-lg) {
    .product-tab-documents {
        padding: 30px;
    }
}
</style>
