<template>
    <div class="checkout-tabs">
        <template v-if="isMobile">
            <multiselect
                class="form-control checkout-tabs__form-control"
                v-model="mobileCurrentTab"
                :options="tabs"
                label="name"
                :allow-empty="false"
                track-by="name"
                :disabled="submitStatus"
                :searchable="false"
            >
                <span slot="noResult">{{ $t('MainFilter.errorMessage') }}</span>
            </multiselect>
            <p class="checkout-tabs__message " v-if="tabs[selectedTab].message">
                {{ tabs[selectedTab].message }}
            </p>
        </template>
        <template v-else>
            <div
                class="checkout-tabs__tab"
                :class="{ 
                    'checkout-tabs__tab--active': selectedTab === i,
                    'checkout-tabs__tab--disabled': submitStatus
                }"
                v-for="(tab, i) in tabs"
                :key="i"
                @click="changeTab(i)"
            >
                <div class="form-radio">
                    <input
                        :id="`tab-${i}`"
                        class="form-radio__field"
                        type="radio"
                        :name="`tab-${i}`"
                        :checked="i == selectedTab"
                    />
                    <label :for="`tab-${i}`" class="form-radio__label checkout-tabs__title">
                        {{ tab.name }}
                    </label>
                </div>
                <div v-if="tab.message" class="checkout-tabs__message">{{ tab.message }}</div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, Watch, InjectReactive } from 'nuxt-property-decorator';
import Multiselect from 'vue-multiselect';

import MixinWindowSize from '~/mixins/window-size';
import { EBreakpoints } from '~/constants/breakpoints';
import ITab from './CheckoutWrapper.vue';
import { EStatus } from '~/constants/status';

@Component({
    components: {
        Multiselect
    }
})
export default class ComponentCheckoutTabs extends mixins(MixinWindowSize) {
    @Prop() public tabs!: ITab[];
    @Prop() public currentIndex!: number;

    @InjectReactive('PAYMENT_STATUS') public paymentStatus!: EStatus;

    @Watch('mobileCurrentTab')
    public handleIndex(): void {
        if (this.tabs.indexOf(this.mobileCurrentTab) === this.currentIndex) return;
        this.changeTab(this.tabs.indexOf(this.mobileCurrentTab));
    }

    public mobileCurrentTab: ITab = this.tabs[0];

    public get selectedTab(): number {
        return this.currentIndex;
    }

    public get isMobile(): boolean {
        return this.windowWidth < EBreakpoints.LG;
    }

    public get submitStatus(): boolean {
        return this.paymentStatus === EStatus.PROCESSING;
    }

    public changeTab(id: number): void {
        this.$emit('changeTab', id);
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.checkout-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-basis: 288px;

    &__tab {
        display: flex;
        flex-direction: column;
        height: max-content;
        width: 100%;
        padding: 20px 15px;
        border-bottom: 1px solid $color-lightest-grey;
        cursor: pointer;

        &--active {
            background-color: $color-white;
        }

        &--disabled {
            opacity: .5;
            pointer-events: none;
        }
    }

    &__content {
        margin-left: 17px;
    }

    &__title {
        font-size: 16px;
        font-weight: 600;
        color: $color-dark-blue;
    }

    &__message {
        font-size: 12px;
        color: $color-dark-blue;
        margin-top: 10px;
        // margin-left: 20px;
    }

    &__form-control {
        border: 1px solid rgba(203, 208, 216, 0.6);
    }
}

@media (min-width: $breakpoint-lg) {
    .checkout-tabs {
        background-color: $color-accent-grey;

        &__tab {
            padding: 30px 20px;
        }

        &__message {
            font-size: 12px;
            color: $color-dark-blue;
            margin-top: 10px;
            margin-left: 28px;
            margin-bottom: 0;
        }
    }
}
</style>
