<template>
    <div :class="internalWrapperClassNames">
        <div class="department__list">
            <div
                class="department__list-item"
                v-for="(val, index) in departmentListItems"
                :key="index"
            >
                <DepartmentListItem :data="val"></DepartmentListItem>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'nuxt-property-decorator';
import { IContentDepartment, IContentType } from '~/types/content-type.interface';
import DepartmentListItem from './DepartmentListItem.vue'

@Component({
    components: { DepartmentListItem }
})
export default class ComponentDepartmentList extends Vue {
    @Prop() public readonly contentType!: IContentType;

    @Inject('CT_DEPARTMENT') public readonly wrapperClassNames?: string[];

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['department'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    public get departmentListItems(): IContentDepartment[] {
        return (this.contentType.items as IContentDepartment[]) ?? [];
    }

}
</script>

<style lang="scss">
@import '~/assets/styles/variables';

.department {
    &__list {
        display: flex;
        align-content: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        @media screen and (min-width: $breakpoint-lg) {
            margin: 0 -15px;
        }
        &-item {
            flex: 0 1 100%;
            max-width: 100%;
            &:not(:last-child) {
                margin-bottom: 10px;
                @media screen and (min-width: $breakpoint-lg) {
                    margin-bottom: 0;
                }
            }
            &:not(:nth-last-child(-n+3)) {
                @media screen and (min-width: $breakpoint-lg) {
                    margin-bottom: 30px;
                }
            }
            @media screen and (min-width: $breakpoint-lg) {
                flex: 0 1 calc(1/3 * 100% - 30px);
                max-width: calc(1/3 * 100% - 30px);
                margin: 0 15px;
            }
        }
    }
}

</style>
