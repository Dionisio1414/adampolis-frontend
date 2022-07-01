<template>
    <div class="modal-window">
        <div class="modal-window__wrapper">
            <slot name="header" />
            <div class="modal-window__main">
                <slot name="main" />
            </div>
        </div>
        <div class="modal-window__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import MixinViewportUnits from '~/mixins/viewport-units';

@Component({})
export default class ModalWindow extends mixins(MixinViewportUnits) {}
</script>

<style lang="scss">
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.modal-window {
    position: relative;
    background: $color-white;
    border-radius: 4px;
    box-shadow: 0 2px 5px 0 rgba($color-black, 0.15);
    height: auto;
    margin: 10px;
    @media (min-width: $breakpoint-lg) {
        margin: 0;
    }

    &__wrapper {
        overflow-x: hidden;
        overflow-y: scroll;
        @media screen and (min-width: $breakpoint-lg) {
            overflow-y: hidden;
        }   
    }

    &__main {
        padding: 20px 15px 0 15px;
        @media (min-width: $breakpoint-lg) {
            padding: 20px 20px 0 20px;
        }

    }
    &__footer {
        padding: 0 20px 20px 20px;
    }
}
</style>
