<template>
    <Popper
        ref="popover"
        :disabled="disabled"
        :trigger="trigger"
        :append-to-body="true"
        :options="tooltipOptions"
        transition="popper-dropdown"
        enter-active-class="popper-dropdown-enter-active"
        leave-active-class="popper-dropdown-leave-active"
        @show="onShow"
        @hide="onHide"
    >
        <div :class="wrapClassNames">
            <div class="tooltip animated">
                <slot name="tooltip" />
                <div class="tooltip__arrow"></div>
            </div>
        </div>
        <slot name="ref" slot="reference" />
    </Popper>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import Popper from 'vue-popperjs';
import { Placement, PopperOptions } from 'popper.js';

@Component({
    components: { Popper },
})
export default class ComponentTooltip extends Vue {
    @Prop({ default: false })
    public disabled!: boolean;

    @Prop({ default: 'hover' })
    public trigger!: string;

    @Prop({ default: 'top' })
    public placement!: Placement;

    @Prop({ default: false })
    public forModal!: boolean;

    public get tooltipOptions(): PopperOptions {
        return {
            placement: this.placement,
            modifiers: {
                offset: {
                    offset: '0,19px',
                },
                arrow: {
                    element: '.tooltip__arrow',
                },
            },
        };
    }

    public get wrapClassNames(): string[] {
        const result = ['tooltip__wrap'];

        if (this.forModal) {
            result.push('tooltip__wrap--z-1000');
        }

        return result;
    }

    public onShow(): void {
        this.$emit('show', ...arguments);
    }

    public onHide(): void {
        this.$emit('hide', ...arguments);
    }

    public doShow(): void {
        (this.$refs.popover as any).doShow();
    }
}
</script>