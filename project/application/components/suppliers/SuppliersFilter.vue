<template>
    <div class="suppliers-filter card card--bordered">
        <div
            class="suppliers-filter__item"
            :class="{ 'suppliers-filter__item--active': selectedItem === range }"
            @click="selectItem(range)"
        >
            {{ range }}
        </div>

        <div
            class="suppliers-filter__item"
            :class="{ 'suppliers-filter__item--active': selectedItem === letter }"
            v-for="(letter, i) in alphabet"
            :key="i"
            @click="selectItem(letter)"
        >
            {{ letter }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { EAlphabet } from '~/constants/alphabet';
import { IDictionary } from '~/types/dictionary.interface';

@Component({
    components: {}
})
export default class ComponentSuppliersFilter extends Vue {
    @Prop()
    public selectedItem!: string;

    public alphabet: IDictionary<string> = EAlphabet;
    public range: string = '0-9';

    public selectItem(item: string = this.range): void {
        this.$emit('select-item', item);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.suppliers-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 15px 13px 15px;

    &__item {
        cursor: pointer;
        font-size: 14px;
        line-height: 19px;
        color: $color-dark-blue;
        font-weight: 600;
        padding: 5px;
        text-transform: uppercase;

        &--active {
            color: $color-pink;
        }
    }
}
</style>
