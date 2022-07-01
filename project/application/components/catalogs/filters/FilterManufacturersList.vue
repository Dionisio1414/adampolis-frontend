<template>
    <div class="catalog-category-list" v-frag>
        <ol class="catalog-category-list__list">
            <li class="catalog-category-list__item" v-for="(val, index) in manufacturers" :key="index">
                <div class="form-group catalog-category-list__form-group">
                    <input
                        v-model="form['article_manufacturers[]']"
                        :id="`taxon_${val.name}`"
                        type="checkbox"
                        class="form-checkbox catalog-category-list__input"
                        :value="val.id"
                        @change="updateManufacturers"
                    />
                    <label :for="`taxon_${val.name}`" class="form-label catalog-category-list__form-label">
                        <div class="label catalog-category-list__label">{{ val.name }}</div>
                    </label>
                </div>
            </li>
        </ol>
        <!-- <div class="catalog-category-list__actions" v-if="manufacturers.length >= 3">
            <button type="button" class="btn btn--link catalog-category-list__btn-link">Žiūrėti daugiau sandėlių</button>
        </div> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'nuxt-property-decorator';
import { ICatalogManufacturers } from '~/types/catalog.interface';
import storeFormMapper from '~/utils/store-form-mapper';

@Component({})
export default class ComponentFilterManufacturersList extends Vue {
    @Prop() public manufacturers!: ICatalogManufacturers[] | [];

    @Emit()
    public updateManufacturers(): void {}

    public get form(): any {
        return storeFormMapper({
            store: this.$store,
            getter: 'page-catalog-form/formValue',
            action: 'page-catalog-form/setFormField',
            fields: ['article_manufacturers[]']
        });
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
