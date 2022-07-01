<template>
    <div class="card__header flex--column flex--start">
        <span >{{ title }}</span>
        <span class="d-flex d-lg-none flex--center profile-info-card-header__back" @click="back">
            <i class="icon icon--arrow-left icon--s"></i>
            <span class="text text--xs text--normal text--underline">
                Grįžti
            </span>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentProfileInfoCardHeader extends Vue {
    @Prop({ default: '' })
    public readonly title!: string;

    public back() {
        this.$emit('back');
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.profile-info-card-header {
    &__back {
        margin-left: -10px;
        margin-top: 7px;
    }
}
</style>
