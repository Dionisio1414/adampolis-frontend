<template>
    <div class="suppliers-filter-mobile card card--shadow" @click="openModal">
        <p class="suppliers-filter-mobile__title">{{ $t('SuppliersPage.filter') }}</p>
        <i class="suppliers-filter-mobile__icon icon icon--filter-black"></i>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { EAlphabet } from '~/constants/alphabet';
import { IDictionary } from '~/types/dictionary.interface';
import SuppliersFilterModal from './SuppliersFilterModal.vue';
import { MODAL_CONFIG } from '~/constants/modalConfig';

@Component({
    components: { SuppliersFilterModal }
})
export default class ComponentSuppliersFilterMobile extends Vue {
    @Prop()
    public selectedItem!: string;

    public alphabet: IDictionary<string> = EAlphabet;
    public range: string = '0-9';
    public $modal: any;

    public selectItem(item: string = this.range): void {
        this.$emit('select-item', item);
    }

    public openModal() {
        this.$modal.show(
            SuppliersFilterModal,
            { modal: this.$modal, selectedItem: this.selectedItem },
            { ...MODAL_CONFIG, classes: 'modal--mobile-full' },
            {
                'before-close': (event: any) => {
                    if (event.params) {
                        this.selectItem(event.params);
                    }
                }
            }
        );
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.suppliers-filter-mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px 13px 15px;
    cursor: pointer;

    &__title {
        color: $color-dark-blue;
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
    }

    &__icon {
        width: 24px;
        height: 24px;
    }
}
</style>
