<template>
    <Accordion
        @openStart="openStartHandler"
    >
        <template #title>{{ attribute.name || '' }}</template>
        <template #content>
            <keep-alive>
                <component
                    v-if="componentName"
                    :is="componentName"
                    :data="componentData"
                    @update-attributes="updateAttributes"
                    ref="refComponent"
                >
                </component>
            </keep-alive>
        </template>
    </Accordion>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'nuxt-property-decorator';
import { ICatalogAttributeConfiguration, ICatalogAttributeData, ICatalogAttributes, ICatalogAttributeValues, IRange } from '~/types/catalog.interface';
import { EProductAttributeTypes } from '~/constants/product-attribute-types';
import CatalogCategoryList from './CatalogCategoryList.vue';
import FilterMobileRange from './FilterMobileRange.vue';
import Accordion from '~/components/Accordion.vue';

@Component({
    components: {
        FilterMobileRange,
        CatalogCategoryList,
        Accordion
    }
})
export default class ComponentFilterAttributesControl extends Vue {
    @Prop() public attribute!: ICatalogAttributes;

    @Emit()
    public updateAttributes(): void {}

    public timer: ReturnType<typeof setTimeout> | number | null = null;

    public openStartHandler(): void {
        const refs = (this.$refs.refComponent as any)?.$refs;
        clearTimeout(this.timer as any);
        this.timer = setTimeout(() => {
            if(refs && refs.rangeSlider) {
                (refs.rangeSlider as any)?.refresh();
            }

            return;
        }, 0)
    }

    public get componentName(): string | null {
        switch(this.attribute.type) {
            case EProductAttributeTypes.SELECT:
            case EProductAttributeTypes.TEXT:
                return 'CatalogCategoryList';
            case EProductAttributeTypes.FLOAT:
                return 'FilterMobileRange';
            default:
                return null;
        }
    }

    public get componentData(): ICatalogAttributeData | IRange | null {
        switch(this.attribute.type) {
            case EProductAttributeTypes.SELECT:
                return {
                    code: this.attribute.code,
                    type: 'select',
                    list: this.attribute?.configuration as ICatalogAttributeConfiguration[]
                }
            case EProductAttributeTypes.TEXT:
                return {
                    code: this.attribute.code,
                    type: 'text',
                    list: this.attribute?.values as ICatalogAttributeValues[]
                }
            case EProductAttributeTypes.FLOAT:
                const rangeObject = ({
                    code: this.attribute.code,
                    value: Object.values((this.attribute as any)?.range),
                    min: this.attribute.range?.min,
                    max: this.attribute.range?.max,
                    disabled: false,
                    name: this.attribute.name
                }) as IRange;
                return rangeObject;
            default:
                return null;
        }
    }

}
</script>
