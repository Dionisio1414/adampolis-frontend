<template>
  <ul class="errors-list">
        <template v-if="isArrayValidations">
            <li
                class="errors-list__item"
                v-for="message in errorMesages"
                :key="message"
            >
                {{ message }}
            </li>
        </template>
        <li
            v-else
            class="errors-list__item"
        >
            {{ errorMesages }}
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

// import { IFormFieldServerError } from '~/types/form-field-server-error.interface';

@Component({})
export default class ComponentFormControlServerErrors extends Vue {
    @Prop() public validations?: string | string[];

    public get isArrayValidations(): boolean {
        return Array.isArray(this.validations);
    }

    public get errorMesages(): string | string[] {
        if (!this.validations) return [];

        if(this.isArrayValidations) {
            return this.validations.slice(0, 1);
        } else {
            return this.validations;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.errors-list {
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
