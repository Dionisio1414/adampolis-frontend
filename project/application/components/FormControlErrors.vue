<template>
    <ul class="errors-list">
        <li
            class="errors-list__item"
            v-for="message in errorMesages"
            :key="message"
            v-html="message"
        >
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

import { IDictionary } from '../types/dictionary.interface';

@Component({})
export default class ComponentFormControlErrors extends Vue {
    @Prop() public validations!: IDictionary<any>;
    @Prop() public validationType!: string;
    @Prop() public validationKey!: string;

    public get errorMesages(): string[] {
        const result: string[] = [];

        if (this.validations && this.validations.hasOwnProperty('required') && !this.validations.required) {
            result.push(this.$t(`${this.validationType}.required`).toString());
        }

        if (this.validations && this.validations.hasOwnProperty('email') && !this.validations.email) {
            result.push(this.$t(`${this.validationType}.email`).toString());
        }

        if(this.validations && this.validations.hasOwnProperty('number') && !this.validations.email) {
            result.push(this.$t(`${this.validationType}.phone`).toString());
        }

        if (this.validations && this.validations.hasOwnProperty('minLength') && !this.validations.minLength) {
            result.push(this.$t(`${this.validationType}.minLength`, { min: this.validationKey }).toString());
        }
        if (this.validations && this.validations.hasOwnProperty('maxLength') && !this.validations.minLength) {
            result.push(this.$t(`${this.validationType}.maxLength`, { max: this.validationKey }).toString());
        }

        if (this.validations && this.validations.hasOwnProperty('digits') && !this.validations.digits) {
            result.push(this.$t(`${this.validationType}.digits`).toString());
        }

        if (this.validations && this.validations.hasOwnProperty('checkb') && !this.validations.checkb) {
            result.push(this.$t(`${this.validationType}.termsAndConditions`).toString());
        }

        if (this.validations && this.validations.hasOwnProperty('sameAsPassword') && !this.validations.sameAsPassword) {
            result.push(this.$t(`${this.validationType}.sameAsPassword`).toString());
        }

        if (this.validations && this.validations.hasOwnProperty('numeric') && !this.validations.numeric) {
            result.push(this.$t(`${this.validationType}.numeric`).toString());
        }

        if (this.validations && this.validations.hasOwnProperty('formatDate') && !this.validations.formatDate && this.validationKey) {
            result.push(this.$t(`${this.validationType}.formatDate`, { date: this.validationKey }).toString());
        }

        return result;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.errors-list {
    margin-top: 4px;
    &__item {
        font-size: 12px;
        line-height: 1;
        text-align: right;
        color: $color-pink;
        &:not(:last-child) {
            margin-bottom: 5px;
        }
    }
}

</style>
