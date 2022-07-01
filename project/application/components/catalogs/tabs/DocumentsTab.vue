<template>
    <div class="documents-tab tab-content__item">
        <div class="documents-tab__wrapper">
            <div class="documents-tab__caption">
                {{ $t('CatalogPage.ProductCard.tabs.documentsTabText') }}
            </div>
            <ul class="documents-tab__list">
                <li 
                    class="documents-tab__item" 
                    v-for="(val, index) in files"
                    :key="index"
                >
                    <i class="icon icon--document documents-tab__icon"></i>
                    <a 
                        :href="transformFilePath(val.path)" 
                        class="documents-tab__link"
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
import { ICatalogProductFiles } from '~/types/catalog.interface';
@Component({})
export default class DocumentsTab extends Vue {
    @InjectReactive('CATALOG_PRODUCT_FILES') public files!: ICatalogProductFiles[] | [];

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

.documents-tab {
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
</style>
