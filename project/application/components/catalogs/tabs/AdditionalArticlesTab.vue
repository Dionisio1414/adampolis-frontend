<template>
    <div class="product-tab-articles tab-content__item">
        <div class="product-tab-articles__wrapper">
            <div 
                class="product-tab-articles__text text"
                v-if="additionalArticles" 
                v-html="$sanitize(additionalArticles)"
            >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, InjectReactive } from 'nuxt-property-decorator';

@Component
export default class ComponentProductTabAdditionalArticles extends Vue {
    @InjectReactive('CATALOG_ADDITIONAL_ARTICLES') public additionalArticles!: string | null;
}
</script>

<style lang="scss" scoped>
.product-tab-articles {
    padding: 20px;
}
</style>