<template>
    <div class="search-results">
        <div class="search-results__info">
            <div class="search-results__subcaption">
                <span class="search-results__text">{{ $t('Search.resultText') }}</span>
                <strong class="search-results__text--text">"{{ queryText }}":</strong>
                <strong class="search-results__text--count">{{ totalCount }}</strong>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentSearchResultBlock extends Vue {
    @Prop({ required: true }) public queryText!: string;
    @Prop({ required: true }) public totalCount!: number;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.search-results {
    background: $color-white;
    border-radius: 4px;
    border: 1px solid $color-grey;
    padding: 20px;
    &__text--count {
        margin-left: 10px;
    }
}

</style>