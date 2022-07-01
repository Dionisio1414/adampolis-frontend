<template>
  <div class="search-input">
      <input 
        class="form-control search-input__control"
        type="text"
        v-model="value"
        :placeholder="$t('OrdersPage.searchPlaceholder')"
    >
    <button
        type="button"
        class="btn btn--flat search-input__button"
        @click="inputHandler"
    >
        <i class="icon icon--search"></i>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Emit } from 'nuxt-property-decorator';
import { debounce } from 'lodash';

@Component({})
export default class ComponentOrdersSearchInput extends Vue {
    public value: string | null = null;

    @Watch('value')
    inputHandler = debounce(this.updateSearch, 400);

    @Emit()
    public updateSearch(): string | null {
        return this.value;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.search-input {
    position: relative;

    &__control {
        width: calc(100% - 43px);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        @media screen and (min-width: $breakpoint-lg) {
            width: 100%;
            text-overflow: unset;
            white-space: normal;
            overflow: unset;
        }
    }

    &__button {
        font-size: 24px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 8px 10px;
        background: $color-search-bg;
        border-radius: 0 4px 4px 0;
        @media screen and (min-width: $breakpoint-lg) {
            background: transparent;
            border-radius: 0;
        }
    }
}
</style>
