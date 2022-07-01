<template>
    <div class="catalog-analogs-list">
        <template v-if="analogsList && analogsList.length">
            <div class="catalog-analogs-list__title">{{ $t('CatalogPage.Analogs.analogsTitle') }}</div>
            <div class="catalog-analogs-list__list">
                <template v-for="(val, index) in analogsList">
                    <template v-if="(index + 1) <= 4">
                        <CatalogAnalogsListItem
                            :analog="val"
                            :active="activeIndex === index"
                            :key="index"
                            @click.native="setAnalogHandler(val, index)"
                        >
                        </CatalogAnalogsListItem>
                    </template>
                    <template v-else> 
                        <SlideUpDown
                            :key="index"
                            :active="accordionActive" 
                            :duration="200"
                        >
                            <CatalogAnalogsListItem
                                :analog="val"
                                :active="index"
                                :key="index"
                                @click.native="setAnalogHandler(val, index)"
                            >
                            </CatalogAnalogsListItem>
                        </SlideUpDown>
                    </template>
                </template>
            </div>
            <div class="catalog-analogs-list__buttons">
                <button 
                    v-if="analogsList && analogsList.length > 4"
                    @click="switchAccordion"
                    type="button" 
                    class="btn btn--link catalog-analogs-list__btn"
                >
                    {{ $t('CatalogPage.Analogs.loadmore') }} {{ `(${analogsList.length})` }}
                </button>
            </div>
        </template>
        <template v-else>
            <div class="catalog-analogs-list__text">
                {{ $t('CatalogPage.Analogs.withoutText') }}
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, Emit } from 'nuxt-property-decorator';
import { IProductInner } from '~/types/product.interface';
import mixinAccordion from '~/mixins/accordion';
import CatalogAnalogsListItem from './CatalogAnalogsListItem.vue';

@Component({
    components: { CatalogAnalogsListItem }
})
export default class ComponentAnalogsList extends mixins(mixinAccordion) {
    @Prop() public analogsList!: IProductInner[];

    public activeIndex: number | null = null;

    @Emit('analogHandler')
    public setAnalogHandler(val: IProductInner, index: number): IProductInner {
        this.activeIndex = index;
        return val;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.catalog-analogs-list {
    background: $color-accent-grey;
    padding: 20px;
    height: 100%;
    &__text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        line-height: 27px;
        text-align: center;
        color: $color-grey-placeholder;
        width: 100%;
        height: 100%;
    }

    &__title {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;
    }

    &__list {
        margin-bottom: 15px;
    }

    &__btn {
        color: $color-pink;
    }
}
</style>
