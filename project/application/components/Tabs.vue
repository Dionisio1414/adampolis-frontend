<template>
    <div class="tabs">
        <div
            v-for="(val, index) in tabs"
            class="tabs__tab"
            :class="{ 'tabs__tab--active': index === currentIndex }"
            @click="changeTab(index)"
            :key="index"
        >
            {{ $t(val) }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({
    components: {}
})
export default class ComponentTabs extends Vue {
    @Prop()
    public tabs!: Array<string>;

    @Prop()
    public currentIndex!: number;

    public changeTab(index: number): void {
        this.$emit('change', index);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.tabs {
    display: flex;
    background: $color-accent-grey;
    border-top: 1px solid $color-grey;
    border-bottom: 1px solid $color-grey;
    border-right: 1px solid $color-grey;

    &__tab {
        font-size: 16px;
        line-height: 19px;
        font-weight: bold;
        border-right: 1px solid $color-grey;
        padding: 11px 23px 17px 17px;
        color: $color-dark-blue;
        cursor: pointer;
        transition: $transition ease-in-out;
        &--active,
        &:hover {
            background: $color-white;
            color: $color-pink;
        }

        &:first-child {
            border-left: 1px solid $color-grey;
        }
    }
}
</style>
