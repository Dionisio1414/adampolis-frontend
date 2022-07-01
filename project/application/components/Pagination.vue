<template>
    <div class="pagination">
        <ul class="pagination__list">
            <li v-for="page in pagination" :key="page.key" class="pagination__item">
                <template v-if="page.type === 'ELLIPSIS'">
                    <span class="pagination__btn pages-ellipsis"> ... </span>
                </template>
                <button
                    v-else
                    class="pagination__btn"
                    :class="{
                        [getTriggerClassAttr(page)]: true,
                        'pagination__btn--control': getTriggerClassControl(page)
                    }"
                    :disabled="getTriggerDisabled(page)"
                    @click="handleChangePage(page)"
                >
                    <template v-if="page.type === 'PAGE'">
                        {{ page.value }}
                    </template>
                    <template v-else-if="page.type === 'PREVIOUS_PAGE_LINK'">
                        <span class="icon icon--arrow-left pagination__page-arrow"></span>
                    </template>
                    <template v-else-if="page.type === 'NEXT_PAGE_LINK'">
                        <span class="icon icon--arrow-right pagination__page-arrow"></span>
                    </template>
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { mixins } from 'nuxt-property-decorator';
import { PaginationModelItem } from 'ultimate-pagination';

import MixinPagination from '~/mixins/pagination';

export default class ComponentPagination extends mixins(MixinPagination) {
    public getTriggerClassAttr(page: PaginationModelItem): string {
        if (page.isActive && page.type === 'PAGE') {
            return 'pagination__btn--active';
        }

        return '';
    }

    public getTriggerDisabled(page: PaginationModelItem): boolean {
        return (
            (page.isActive && (page.type === 'NEXT_PAGE_LINK' || page.type === 'PREVIOUS_PAGE_LINK')) ||
            page.type === 'ELLIPSIS'
        );
    }

    public getTriggerClassControl(page: PaginationModelItem): boolean {
        return page.type === 'PREVIOUS_PAGE_LINK' || page.type === 'NEXT_PAGE_LINK';
    }

    public handleChangePage(page: PaginationModelItem): void {
        this.$emit('onPageChange', page.value);
    }
}
</script>
