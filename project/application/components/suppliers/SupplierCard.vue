<template>
    <div class="supplier-card">
        <img class="supplier-card__image img-responsive" :src="supplier && supplier.image" alt="" />
        <div class="supplier-card__content">
            <p class="supplier-card__text">
                <span class="supplier-card__name">
                    {{ supplier && supplier.name }}
                </span>
                {{ supplier && supplier.description }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { ISupplier } from '~/types/supplier.interface';

@Component({
    components: {}
})
export default class ComponentSupplierCard extends Vue {
    @Prop({ required: true })
    public supplier!: ISupplier;
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.supplier-card {
    padding: 20px 10px 15px 10px;
    background-color: $color-light-grey;
    height: 100%;

    &__image {
        max-height: 24px;
    }

    &__content {
        margin-top: 20px;
    }

    &__text {
        font-size: 12px;
        color: $color-dark-blue;
        line-height: 20px;
    }

    &__name {
        font-weight: bold;
        color: $color-black;
        text-transform: uppercase;
    }
}

@media (min-width: $breakpoint-lg) {
    .supplier-card {
        padding: 30px;

        &__image {
            max-height: 30px;
        }

        &__content {
            margin-top: 30px;
        }
    }
}
</style>
