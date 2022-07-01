<template>
    <PasswordSwitch v-slot="{ show, inputType, switchHandler }">
        <input
            :id="id"
            :type="inputType"
            class="form-control"
            :class="inputClassNames"
            :disabled="disabled"
            v-model="internalValue"
            @focus="onInputFocus"
            @blur="onInputBlur"
        />
        <button
            type="button"
            class="btn btn--flat switch-button"
            :class="{
                'switch-button-active': show
            }"
            :disabled="disabled"
            @click="switchHandler"
            @focus="onSwitchFocus"
            @blur="onSwitchBlur"
        >
            <span
                class="icon"
                :class="{
                    'icon-password-hidden': !show,
                    'icon-password-visible': show
                }"
            ></span>
        </button>
    </PasswordSwitch>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { IDictionary } from '../types/dictionary.interface';
import PasswordSwitch from '~/components/PasswordSwitch.vue';

@Component({
    components: {
        PasswordSwitch
    }
})
export default class ComponentSwitchablePasswordInput extends Vue {
    @Prop()
    public id?: string;

    @Prop()
    public value?: string;

    @Prop()
    public disabled?: boolean;

    @Prop()
    public inputClassNames?: string | string[] | IDictionary<string>;

    public internalValue: string | null = null;

    public inputFocus: boolean = false;

    public switchFocus: boolean = false;

    public get componentFocus(): boolean {
        return this.inputFocus || this.switchFocus;
    }

    @Watch('value')
    public onValueChange(value: string): void {
        this.internalValue = value;
    }

    @Watch('internalValue')
    public onInternalValueChange(value: string): void {
        this.$emit('input', value);
    }

    @Watch('componentFocus')
    public onComponentFocusChange(newValue: boolean): void {
        if (newValue) {
            this.$emit('componentFocus', newValue);
        } else {
            this.$emit('componentBlur', newValue);
        }
    }

    public onFocus(): void {
        this.$emit('focus', ...arguments);
    }

    public onBlur(): void {
        this.$emit('blur', ...arguments);
    }

    public onInputFocus(): void {
        this.inputFocus = true;
    }

    public onInputBlur(): void {
        this.inputFocus = false;
    }

    public onSwitchFocus(): void {
        this.switchFocus = true;
    }

    public onSwitchBlur(): void {
        this.switchFocus = false;
    }

}
</script>

<style lang="scss" scoped>
.switch-button {
    font-size: 24px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 12px 1px;
}
</style>
