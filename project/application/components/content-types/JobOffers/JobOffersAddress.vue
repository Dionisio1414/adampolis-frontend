<template>
    <div class="job-offers-address">
        <div class="job-offers-address__flex" v-if="showAddress">
            <i class="job-offers-address__icon icon icon--address-grey"></i>
            <span class="job-offers-address__text" v-html="$sanitize(address)"></span>
        </div>
        <div class="job-offers-address__flex" v-if="showWorkhours">
            <i class="job-offers-address__icon icon icon--time"></i>
            <span class="job-offers-address__text" v-html="$sanitize(workhours)"></span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentJobOffersAddress extends Vue {
    @Prop() public address!: string;
    @Prop() public workhours!: string;

    public get showAddress(): boolean {
        return !!(this.address && this.address.length);
    }

    public get showWorkhours(): boolean {
        return !!(this.workhours && this.workhours.length);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.job-offers-address {
    &__flex {
        display: flex;
        align-items: center;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
    &__icon {
        margin-right: 10px;
        width: 16px;
        height: 16px;
    }
}

</style>