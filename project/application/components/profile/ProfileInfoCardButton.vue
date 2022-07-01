<template>
    <button :disabled="disabled" class="btn btn-secondary btn-flex profile-info-card-button__button" @click="action">
        <i class="icon icon--plus profile-info-card-button__icon"></i>
        {{ title }}
    </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentProfileInfoCardButton extends Vue {
    @Prop({ default: '' }) public readonly title!: string;
    @Prop({ default: false }) public readonly disabled!: boolean;

    public action() {
        this.$emit('action');
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.profile-info-card-button {
    &__button {
        justify-content: center;
        border: 1px dashed rgba($color-grey, 0.6);
        border-radius: 0 0 4px 4px;
        background-color: $color-dark-grey;
        width: 100%;
        padding: 14px 0;
        color: $color-search-bg;
        font-size: 14px;
        line-height: 22px;

        &:hover {
            border: 1px dashed rgba($color-grey, 0.6);
        }
    }

    &__icon {
        width: 8px;
        height: 8px;
        margin-right: 10px;
    }
}
</style>
