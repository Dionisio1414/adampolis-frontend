<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ header }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="modal-confirm-delete__body text">
                {{ message }}
            </div>
        </template>
        <template #footer>
            <modal-footer
                @cancel="close"
                @submit="submit"
                :btnCancelTitle="btnCancelTitle"
                :btnSubmitTitle="btnSubmitTitle"
                btnSubmitClass="btn--pink"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter
    }
})
export default class ModalConfirmDelete extends Vue {
    @Prop()
    public modal!: any;

    @Prop({ required: true })
    public readonly btnCancelTitle!: string;

    @Prop({ required: true })
    public readonly btnSubmitTitle!: string;

    @Prop({ required: true })
    public readonly header!: string;

    @Prop({ required: true })
    public readonly message!: string;

    @Prop() public callback!: (closeHandler: any) => void

    public submit(): void {
        this.callback(this.close)
    }

    @Emit('close')
    public close(): void {}
}
</script>

<style lang="scss" scoped>
.modal-confirm-delete {
    &__body {
        padding-bottom: 20px;
    }
}
</style>
