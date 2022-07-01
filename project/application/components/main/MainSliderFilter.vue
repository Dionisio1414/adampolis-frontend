<template>
    <section class="main-slider-filter">
        <div class="main-slider-filter__slider d-lg-block">
            <MainSlider />
        </div>
        <MainFilter 
            class="main-slider-filter__filter"
            @updateModifications="updateModifications"
            @updateTaxons="updateTaxons"
            @vinHandler="vinHandler"
        >
        </MainFilter>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'nuxt-property-decorator';
import MainSlider from '~/components/main/MainSlider.vue';
import MainFilter from '~/components/main/MainFilter.vue';

@Component({
    components: {
        MainSlider,
        MainFilter
    }
})
export default class ComponentMainSliderFiter extends Vue {
    @Emit('updateModifications')
    public updateModifications(id: number): number {
        return id;
    }
    @Emit('updateTaxons')
    public updateTaxons(id: number): number {
        return id;
    }
    @Emit('vinHandler')
    public vinHandler(vin: string): string {
        return vin;
    } 
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-slider-filter {
    display: flex;
    &__slider {
        width: calc(100% - 387px);
    }
}

@include media-lg {
    .main-slider-filter {
        margin: 0 0 30px 0;
        max-height: 100%;

        &__filter {
            padding: 20px 10px;
            background-color: $color-default;
            margin: 0 -10px;
        }
    }
}
</style>
