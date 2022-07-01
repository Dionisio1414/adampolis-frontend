<template>
    <main class="page suppliers">
        <div class="container">
            <div class="row">
                <div class="col">
                    <BreadCrumbs />
                </div>
            </div>
            <div v-if="isMobile" class="row">
                <div class="col">
                    <SuppliersFilterMobile class="suppliers__filter" @select-item="selectItem" />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="suppliers__wrapper card card--bordered">
                        <div class="d-none d-lg-block suppliers__header">
                            {{ $t('SuppliersPage.suppliers') }}
                        </div>
                        <SuppliersFilter
                            v-if="!isMobile"
                            class="suppliers__filter"
                            :selectedItem="selectedItem"
                            @select-item="selectItem"
                        />
                        <div v-if="suppliers && suppliers.length" class="row">
                            <div
                                class="col-12 col-lg-6"
                                v-for="(supplier, i) in suppliers"
                                :key="`${i}-${selectedItem}`"
                            >
                                <div class="suppliers__card">
                                    <SupplierCard :supplier="supplier" />
                                </div>
                            </div>
                        </div>
                        <div v-else class="row">
                            <div class="suppliers__no-result">
                                {{ $t('Suppliers.no_results') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { Component, mixins, Action, Getter } from 'nuxt-property-decorator';
import { BreadCrumbs } from '~/components';
import { SupplierCard, SuppliersFilter, SuppliersFilterMobile } from '~/components/suppliers';
import { ISupplier } from '~/types/supplier.interface';
import MixinWindowSize from '~/mixins/window-size';

@Component({
    components: {
        BreadCrumbs,
        SupplierCard,
        SuppliersFilter,
        SuppliersFilterMobile
    }
})
export default class PageSuppliers extends mixins(MixinWindowSize) {
    @Action('page-suppliers/fetchSuppliers') public fetchSuppliers!: (symbol: string) => Promise<void>;
    @Getter('page-suppliers/getSuppliers') public suppliers!: ISupplier;

    public selectedItem: string = 'a';

    public async selectItem(symbol: string): Promise<void> {
        await this.fetchSuppliers(symbol);
        this.selectedItem = symbol;
    }

    async asyncData({ store, error }: any): Promise<void> {
        try {
            await store.dispatch('page-suppliers/fetchSuppliers');
        } catch (e: any) {
            if(e?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(e);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.suppliers {
    padding-bottom: 80px;

    &__header {
        font-size: 24px;
        line-height: 33px;
        color: $color-dark-blue;
        font-weight: bold;
        margin-bottom: 20px;
    }

    &__wrapper {
        padding: 15px;
        padding-top: 0;
    }

    &__card {
        padding-top: 15px;
        height: 100%;
    }

    &__filter {
        margin-bottom: 20px;
    }

    &__no-result {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        width: 100%;
        font-weight: bold;
        color: $color-grey-error;
    }
}

@media (min-width: $breakpoint-lg) {
    .suppliers {
        &__wrapper {
            padding: 30px;
        }

        &__card {
            padding-top: 20px;
        }

        &__filter {
            margin-bottom: 0px;
        }

        &__no-result {
            margin-top: 30px;
        }
    }
}
</style>
