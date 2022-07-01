<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('SuppliersPage.suppliersFilter') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="suppliers-filter-modal__grid">
                <div
                    class="suppliers-filter-modal__item card card--bordered"
                    :class="{ 'suppliers-filter-modal__item--active': selectedItem === range }"
                    @click="selectItem(range)"
                >
                    {{ range }}
                </div>
                <div
                    v-for="(letter, i) in alphabet"
                    :key="i"
                    class="suppliers-filter-modal__item card card--bordered"
                    :class="{ 'suppliers-filter-modal__item--active': selectedItem === letter }"
                    @click="selectItem(letter)"
                >
                    {{ letter }}
                </div>
            </div>
        </template>
        <template #footer>
            <modal-footer
                :showCancelBtn="false"
                :btnSubmitTitle="$t('SuppliersPage.applyFilter')"
                btnCancelTitle=""
                @submit="submit"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import { EAlphabet } from '~/constants/alphabet';
import { IDictionary } from '~/types/dictionary.interface';
@Component({
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter
    }
})
export default class ComponentModalChangePassword extends Vue {
    public alphabet: IDictionary<string> = EAlphabet;
    public range: string = '0-9';
    public selectedItem: string = '';

    public selectItem(item: string = this.range): void {
        this.selectedItem = item;
    }

    public submit(): void {
        this.$emit('close', this.selectedItem);
    }

    public close(): void {
        this.$emit('close');
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.suppliers-filter-modal {
    &__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
    }

    &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: $color-dark-blue;
        line-height: 19px;
        text-transform: uppercase;
        padding: 10px 10px 9px 10px;

        &--active {
            border-color: $color-pink;
            color: $color-pink;
            font-weight: 600;
        }
    }
}

.modal-footer {
    border-top: none;
}
</style>
