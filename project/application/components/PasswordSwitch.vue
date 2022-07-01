<template>
    <div class="password-switch">
        <slot
            :show="show"
            :inputType="inputType"
            :switchHandler="switchHandler"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentPasswordSwitch extends Vue {
    public show: boolean = false;

    public get inputType(): string {
        return this.show ? 'text' : 'password';
    }

    public switchHandler(): void {
        this.show = !this.show;
    }
}
</script>

<style lang="scss" scoped>
.password-switch {
    position: relative;
}
</style>
