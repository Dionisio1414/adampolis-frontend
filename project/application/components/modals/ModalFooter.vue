<template>
    <div class="modal-footer">
        <button
            v-if="showCancelBtn"
            type="button"
            class="btn  modal-footer__btn"
            :class="`${btnCancelClass}`"
            :disabled="disabled"
            @click="cancel"
        >
            {{ btnCancelTitle }}
        </button>
        <button 
            type="submit" 
            class="btn modal-footer__btn" 
            :class="`${btnSubmitClass}`"
            :disabled="disabled"
            @click="submit"
        >
            {{ btnSubmitTitle }}
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'nuxt-property-decorator';
@Component({})
export default class ModalHeader extends Vue {
    @Prop({ required: true })
    public readonly btnCancelTitle!: string;

    @Prop({ required: true })
    public readonly btnSubmitTitle!: string;

    @Prop({ default: 'btn--primary' })
    public readonly btnSubmitClass!: string;

    @Prop({ default: 'btn--dark-grey' })
    public readonly btnCancelClass!: string;

    @Prop({ default: true })
    public readonly showCancelBtn!: boolean;

    @Prop({ default: false }) public readonly disabled!: boolean;

    @Emit('cancel')
    public cancel(): void {}

    @Emit('submit')
    public submit(): void {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    &__btn {
        min-width: 164px;
    }
}

@include media-lg {
    .modal-footer {
        flex-direction: column-reverse;
        width: 100%;
        border-top: 1px solid rgba($color-grey, 0.6);
        padding-top: 20px;

        &__btn {
            width: 100%;
            &:last-child {
                margin-bottom: 15px;
            }
        }
    }
}
</style>
