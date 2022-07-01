<template>
    <div class="tabs">
        <div class="tabs-row">
            <div class="tabs-col">
                <div class="form-radio">
                    <input
                        id="type_1"
                        class="form-radio__field"
                        type="radio"
                        name="radio-1"
                        @change="changeTab(0)"
                        :checked="currentIndex === 0"
                    />
                    <label for="type_1" class="form-radio__label">
                        {{ $t('modals.registration.legalPersonText') }}
                    </label>
                </div>
            </div>
            <div class="tabs-col">
                <div class="form-radio">
                    <input
                        id="type_2"
                        class="form-radio__field"
                        type="radio"
                        name="radio-1"
                        @change="changeTab(1)"
                        :checked="currentIndex === 1"
                    />
                    <label for="type_2" class="form-radio__label">
                        {{ $t('modals.registration.individualText') }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class HeaderRegistrationFormTabs extends Vue {
    @Prop()
    public currentIndex!: number;

    public changeTab(index: number): void {
        this.$emit('index', index)
    }

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.tabs {
    margin-bottom: 30px;
    &-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    &-col {
        flex: 0 1 100%;
        &:not(:last-child) {
            margin-bottom: 20px;
            @media screen and (min-width: $breakpoint-lg) {
                margin-bottom: 0;
            }
        }
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 1 calc(50% - 20px);
        }
    }
}
</style>