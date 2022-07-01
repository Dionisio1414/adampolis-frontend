<template>
    <div class="department-block card card--bordered">
        <div class="badges">
            <div class="badges__item" v-if="showStoreIcon">
                <i class="icon icon--store"></i>
            </div>
            <div class="badges__item" v-if="showConsultantIcon">
                <i class="icon icon--services"></i>
            </div>
        </div>

        <div
            class="department-block__title"
            v-if="data && data.block_title"
            v-html="$sanitize(data.block_title)"
        >
        </div>

        <div class="department-block__info">
            <div class="department-block__info-item">
                <i class="icon icon--time department-block__info-item--icon"></i>
                <div class="shedule-list">
                    <span class="shedule-title">{{ $t('Contacts.block.workingHours') }}:</span>
                    <div
                        class="shedule-time"
                        v-if="data && data.workweek"
                        v-html="$sanitize(data.workweek)"
                    >
                    </div>
                    <div
                        class="shedule-time"
                        v-if="data && data.weekend"
                        v-html="$sanitize(data.weekend)"
                    >
                    </div>
                </div>
            </div>
            <div class="department-block__info-item">
                <i class="icon icon--phone department-block__info-item--icon"></i>
                <div class="phone-list">
                    <a
                        v-if="data && data.phone"
                        v-html="$sanitize(data.phone)"
                        class="phone-list"
                        :href="`tel:${data.phone}`"
                    ></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { IContentDepartment } from '~/types/content-type.interface';

@Component({})
export default class ComponentDepartmentListItem extends Vue {
    @Prop() public readonly data!: IContentDepartment;

    public get showStoreIcon(): boolean {
        if(this.data && this.data.store) {
            return true;
        }

        return false;
    }

    public get showConsultantIcon(): boolean {
        if(this.data && this.data.consultant) {
            return true;
        }

        return false;
    }

}
</script>

<style lang="scss">
@import '~/assets/styles/variables';

.badges {
    position: absolute;
    top: 14px;
    right: 20px;
    &__item {
        font-size: 20px;
        background: $color-light-grey;
        border-radius: 4px;
        padding: 6px;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}

.department-block {
    position: relative;
    padding: 15px;
    @media screen and (min-width: $breakpoint-lg) {
        padding: 20px;
    }
    &__title {
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        margin-bottom: 15px;
        color: $color-dark-blue;

        @media screen and (min-width: $breakpoint-lg) {
            margin-bottom: 20px;
        }
    }
    &__info {
        &-item {
            display: flex;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
            &--icon {
                font-size: 20px;
                margin-right: 10px;
            }
        }
    }
}

.shedule-list {
    line-height: 22px;
}

.phone-list {
    font-size: 12px;
    text-decoration: none;
    color: #000;
}

</style>
