<template>
    <main class="page policy">
        <div class="container">
            <div class="row">
                <div class="col">
                    <BreadCrumbs />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="policy__wrapper card card--bordered">
                        <h1 class="h1 policy__header">{{ getPrivacyPolicy.name }}</h1>
                        <div class="policy__content" v-html="$sanitize(getPrivacyPolicy.content)" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter } from 'nuxt-property-decorator';
import { BreadCrumbs } from '~/components';
import { IPage } from '~/types/page.interface';

@Component({
    components: {
        BreadCrumbs
    }
})
export default class PagePolicy extends Vue {
    @Getter('page-privacy-policy/getPrivacyPolicy') public getPrivacyPolicy!: IPage;

    async asyncData({ store, error }: any): Promise<void> {
        try {
            await store.dispatch('page-privacy-policy/fetchPrivacyPolicy');
        } catch (e) {
            error(e);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.policy {
    padding-bottom: 80px;

    &__header {
        margin-bottom: 30px;
    }

    &__wrapper {
        padding: 20px 15px 30px 15px;
    }

    &__content {
        ::v-deep {
            h2 {
                font-size: 16px;
                line-height: 22px;
                font-weight: bold;
                margin-bottom: 10px;
                color: $color-dark-blue;
            }
            p {
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 30px;
                color: #000;
                &:empty {
                    display: none;
                }
            }
        }
    }
}

@media (min-width: $breakpoint-lg) {
    .policy {
        &__wrapper {
            padding: 30px 30px 40px 30px;
        }
    }
}
</style>
