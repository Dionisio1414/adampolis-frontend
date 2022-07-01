<template>
    <div class="badge-tooltip">
        <div class="badge-tooltip__inner">{{ count }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentBadgeTooltip extends Vue {
    @Prop({ default: 0 })
    public readonly count!: number;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.badge-tooltip {
    position: relative;
    display: inline-block;

    &__inner {
        background-color: $color-accent-orange;
        color: $color-black;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 19px;
        text-align: center;
        border-radius: 4px;
        padding: 1px 8px;

        &:after {
            content: '';
            position: absolute;
            top: 50%;
            right: 100%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent $color-accent-orange transparent transparent;
        }
    }
}
</style>
