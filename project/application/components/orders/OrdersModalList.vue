<template>
    <ol class="filter-list">
        <li class="filter-list__item" v-for="(val, index) in list" :key="index">
            <div class="form-group filter-list__form-group">
                <input 
                    :id="'category_' + val.code" 
                    type="checkbox" 
                    class="form-checkbox filter-list__input" 
                    :value="val.code"
                    v-model="values" 
                />
                <label :for="'category_' + val.code" class="form-label filter-list__form-label">
                    <div class="label filter-list__label">{{ val.name }}</div>
                </label>
            </div>
        </li>
    </ol>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { IOrdersFIlterItem } from '~/types/orders.interface';

@Component({})
export default class CatalogCategoryList extends Vue {
    @Prop()
    public list!: IOrdersFIlterItem[];
    @Prop()
    public type!: string;

    public values: string[] = [];

    @Watch('values')
    public onChangeValue(value: string[]): void {
        this.$emit('values', { type: this.type, value });
    }

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.filter-list {
    &__label {
        font-size: 14px;
        line-height: 18px;
    }
    &__input {
        + .filter-list__form-label {
            &::before {
                width: 18px;
                height: 18px;
                border-radius: 4px;
                border-color: $color-grey;
            }
        }
        &:checked {
            + .filter-list__form-label {
                &::before {
                    background-color: $color-pink;
                    border-color: $color-pink;
                    border-radius: 4px;
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
