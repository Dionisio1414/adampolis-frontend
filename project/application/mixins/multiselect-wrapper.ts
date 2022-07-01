import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import Multiselect from 'vue-multiselect';

/**
 * To use ONLY when `options` prop is an array
 * of objects
 */
@Component({
    components: { Multiselect }
})
export default class MixinMulstiselectWrapper extends Vue {
    @Prop()
    public options!: Array<any>;

    @Prop()
    public value!: any;

    @Prop()
    public label?: string;

    @Prop()
    public trackBy?: string;

    @Prop()
    public searchable?: boolean;

    @Prop()
    public disabled?: boolean;

    @Prop()
    public allowEmpty?: boolean;

    @Prop()
    public valueKey!: string;

    @Prop({default: '' })
    public placeholder?: string;

    @Prop({default: 'No elements found' })
    public noResult?: string;

    @Prop({ default: false })
    public multiple!: boolean;

    @Prop({ default: true })
    public closeOnSelect!: boolean;

    public internalValue: any = null;

    private valueChangedHandler(newValue: any): void {
        const value: any = this.options.find((o: any) => o[this.valueKey] === newValue);

        if (value === this.internalValue) {
            return;
        }

        if (value == undefined) {
            this.internalValue = null;
        }

        this.internalValue = value;
    }

    @Watch('value')
    public onValueChanged(newValue: any): void {
        this.valueChangedHandler(newValue);
    }

    @Watch('internalValue')
    public onInternalValueChanged(newValue: any): void {
        if (!newValue) {
            this.$emit('input', null);
            return;
        }

        const value: any = newValue[this.valueKey];

        if (value === this.value) {
            return;
        }

        this.$emit('input', value);
    }

    @Watch('options')
    public onOptionsChanged(newValue: Array<any>): void {
        const value: any = newValue.find(o => o[this.valueKey] === this.internalValue);

        if (value === this.internalValue) {
            return;
        }

        if (value == null) {
            this.internalValue = null;
        }

        this.internalValue = value;
    }

    public created(): void {
        this.valueChangedHandler(this.value);
    }

    public selectHandler(): void {
        this.$emit('select', ...arguments)
    }

    public removeHandler(): void {
        this.$emit('remove', ...arguments)
    }

    public searchChangeHandler(): void {
        this.$emit('searchChange', ...arguments)
    }

    public tagHandler(): void {
        this.$emit('tag', ...arguments)
    }

    public openHandler(): void {
        this.$emit('open', ...arguments)
    }

    public closeHandler(): void {
        this.$emit('close', ...arguments)
    }
}
