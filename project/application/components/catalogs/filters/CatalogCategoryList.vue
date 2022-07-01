<template>
    <div class="catalog-category-list" v-frag>
        <ol class="catalog-category-list__list">
            <li
                class="catalog-category-list__item"
                v-for="(val, index) in data.list"
                :key="index"
            >
                <div class="form-group catalog-category-list__form-group">
                    <template v-if="checkType">
                        <input
                            v-model="form[field]"
                            :id="`taxon_${val.name}`"
                            type="checkbox"
                            class="form-checkbox catalog-category-list__input"
                            :value="val.key"
                            :disabled="statusDisabled"
                            @click="clickHandler"
                        />
                        <label :for="`taxon_${val.name}`" class="form-label catalog-category-list__form-label">
                            <div class="label catalog-category-list__label">{{ val.name }}</div>
                        </label>
                    </template>
                    <template v-else>
                       <input
                            v-model="form[field]"
                            :id="`taxon_${val.key}`"
                            type="checkbox"
                            class="form-checkbox catalog-category-list__input"
                            :value="val.key"
                            :disabled="statusDisabled"
                            @click="clickHandler"
                        />
                        <label :for="`taxon_${val.key}`" class="form-label catalog-category-list__form-label">
                            <div class="label catalog-category-list__label">{{ val.key }}</div>
                        </label>
                    </template>
                </div>
            </li>
        </ol>
        <!-- <div class="catalog-category-list__actions" v-if="list.length >= 3">
            <button type="button" class="btn btn--link catalog-category-list__btn-link">Žiūrėti daugiau sandėlių</button>
        </div> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit, InjectReactive } from 'nuxt-property-decorator';
import { ICatalogAttributeData } from '~/types/catalog.interface';
import { EProductAttributeTypes } from '~/constants/product-attribute-types';
import storeFormMapper from '~/utils/store-form-mapper';
import { EStatus } from '~/constants/status';

@Component({})
export default class CatalogCategoryList extends Vue {
    @Prop() public data!: ICatalogAttributeData;
    @InjectReactive('CATALOG_STATUS') public status!: EStatus;

    public get statusDisabled(): boolean {
        return !!(this.status === EStatus.PROCESSING);
    }

    public get checkType(): boolean {
        return !!((this.data as ICatalogAttributeData).type === EProductAttributeTypes.SELECT)
    }

    private get field(): string {
        return `attributes[attribute_${this.data.code}][]`;
    }

    @Emit()
    public updateAttributes(): void {}

    public get form(): any {
        return storeFormMapper({
            store: this.$store,
            getter: 'page-catalog-form/formValue',
            action: 'page-catalog-form/setFormField',
            fields: [this.field]
        });
    }

    public clickHandler(): void {
        // click handler is fired before `setFormField` action complete,
        // so need to wait for it
        setTimeout(() => {
            this.updateAttributes();
        }, 0);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.catalog-category-list {
    &__form-group {
        .catalog-category-list__label {
            font-size: 14px;
            line-height: 18px;
        }
        .catalog-category-list__input {
            + .catalog-category-list__form-label {
                &::before {
                    width: 18px;
                    height: 18px;
                    border-radius: 4px;
                    border-color: $color-grey;
                }
            }
            &:disabled:checked {
                + .catalog-category-list__form-label {
                    &::before {
                        background-color: rgba(203,208,216,0.2);
                        border: 1px solid rgba(203,208,216,0.6);
                    }
                    .label {
                        color: rgba(0, 0, 0, .4);
                    }
                }
            }
            &:checked {
                + .catalog-category-list__form-label {
                    &::before {
                        background-color: $color-pink;
                        border-color: $color-pink;
                        border-radius: 4px;
                    }
                }
            }
        }
    }

    &__item {
        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }

    &__actions {
        padding-top: 20px;
    }

    &__btn-link {
        color: $color-pink;
    }
}
</style>
