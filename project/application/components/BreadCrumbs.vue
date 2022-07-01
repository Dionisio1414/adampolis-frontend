<template>
    <div class="breadcrumbs">
        <ol class="breadcrumbs__list">
            <li class="breadcrumbs__item" v-if="isHomeLink">
                <NuxtLink :to="localePath('/')" class="breadcrumbs__link">
                    {{ $t('Breadcrumbs.homePageTitle') }}
                </NuxtLink>
                <div class="breadcrumbs__arrow"></div>
            </li>
            <li 
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="breadcrumb.key"
                class="breadcrumbs__item"
            >
                <template v-if="index < linkLimit">
                    <NuxtLink
                        class="breadcrumbs__link truncate"
                        :to="breadcrumb.link"
                    >
                        {{ breadcrumb.title }}
                    </NuxtLink>
                    <div class="breadcrumbs__arrow"></div>
                </template>

                <span v-else class="breadcrumbs__text truncate">{{ breadcrumb.title }}</span>
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { IBreadcrumbs } from '~/types/breadcrumbs.interface';

@Component({})
export default class ComponentBreadcrumbs extends Vue {
    @Prop() public breadcrumbs!: IBreadcrumbs[];
    @Prop({ default: true }) public isHomeLink!: boolean;

    public get linkLimit(): number {
        return this.breadcrumbs.length - 1;
    }
}
</script>
