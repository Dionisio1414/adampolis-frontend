<template>
    <div class="modal-header">
        <div class="modal-header__actions">
            <h3 class="modal-header__title">
                <slot name="title" />
            </h3>
            <div class="modal-header__close" @click="close">
                <img class="img-responsive" :src="require('@/assets/images/close.svg')" alt="" />
            </div>
        </div>
        <div class="modal-header__descriptions">
            <p class="modal-header__description">
                <slot name="description" />
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
@Component({})
export default class ModalHeader extends Vue {
    public close(): void {
        this.$emit('close');
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.modal-header {
    position: relative;
    border-bottom: 1px solid $color-grey;
    padding: 15px 20px;

    &__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        font-size: 20px;
        font-weight: bold;
        line-height: 27px;
        color: $color-dark-blue;
        width: 100%;
    }

    &__close {
        position: absolute;
        top: 15px;
        right: 15px;
        max-width: 24px;
        max-height: 24px;
        cursor: pointer;
    }

    &__descriptions {
        p {
            font-size: 12px;
            font-weight: normal;
            line-height: 18px;
            margin-top: 10px;
            &:empty {
                margin-top: 0;
            }
        }
    }
}
</style>
