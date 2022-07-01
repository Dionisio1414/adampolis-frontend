<template>
    <Popper
        ref="dropdown"
        :trigger="trigger"
        :options="internalOptions"
        :append-to-body="appendToBody"
        transition="popper-dropdown"
        :enter-active-class="enterActiveClass"
        :leave-active-class="leaveActiveClass"
        :root-class="rootClass"
        @show="show"
        @hide="hide"
    >
        <div class="dropdown__wraper">
            <div class="dropdown animated">
                <slot :doClose="doClose" />
            </div>
        </div>
        <slot name="reference" slot="reference" :isOpen="isOpen" />
    </Popper>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import Popper from 'vue-popperjs';

@Component({
    components: { Popper },
})
export default class ComponentDropdown extends Vue {
    @Prop({ default: 'click' })
    public trigger!: string;

    @Prop({ default: 'popper-dropdown-enter-active' })
    public enterActiveClass!: string;

    @Prop({ default: 'popper-dropdown-leave-active' })
    public leaveActiveClass!: string;

    @Prop()
    public options!: Object;

    @Prop({ default: true })
    public appendToBody!: boolean;

    @Prop({ default: '' }) public rootClass!: string;

    get internalOptions(): any {
        return {
            placement: 'bottom',
            ...(this.options || {}),
        };
    }

    public isOpen: boolean = false;

    public show(): void {
        this.isOpen = true;
        this.$emit('show', ...arguments);
    }

    public hide(): void {
        this.isOpen = false;
        this.$emit('hide', ...arguments);
    }

    public doClose(): void {
        const dropdown: any = this.$refs.dropdown as any;

        if (!dropdown) {
            return;
        }

        dropdown.doClose();
    }

    public doShow(): void {
        const dropdown: any = this.$refs.dropdown as any;

        if (!dropdown) {
            return;
        }

        dropdown.doShow();
    }
}
</script>

<style lang="scss" scoped>
    .dropdown__wraper {
        z-index: 2000;
    }
</style>
