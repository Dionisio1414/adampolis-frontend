<template>
    <main class="page order-preview">
        <div class="container">
            <div class="row">
                <div class="col">
                    <OrderBlock :orders="orderData"></OrderBlock>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="order-preview__actions">
                        <button 
                            type="button" 
                            class="btn btn--link order-preview__actions-btn"
                            @click="goBack"
                        >
                            <i class="icon icon--arrow-left-black order-preview__actions-icon"></i>
                            {{ $t('OrdersPreview.btnReturnOrdersText') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter } from 'nuxt-property-decorator';
import OrderBlock from '~/components/order/OrderBlock.vue';
import { IOrderPreview } from '~/types/order-preview.interface';

@Component({
    components: {
        OrderBlock
    },
    middleware: ['auth-user-only']  
})
export default class PageOrderPreview extends Vue {
    @Getter('page-order/getOrderData') public orderData!: IOrderPreview | {};

    public goBack(): void {
        this.$router.push('profile/orders');
    }

    async asyncData({ query, store, error }: any): Promise<void> {
        try {
            await store.dispatch('page-order/fetchOrderPreview', query.id);
        } catch (e: any) {
            if(e?.code === 404) {
                error({ statusCode: 404 });
                return;
            }
            error(e);
        }
    }
}

</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.order-preview {
    padding: 30px 0 80px 0;
    @include media-md {
        padding: 10px 0 50px 0;
    }
    &__card,
    &__actions {
        margin: auto;
        max-width: 590px;
        @include media-md {
            max-width: 100%;
        }
    }
    &__card {
        margin-bottom: 20px;
    }
    &__actions {
        &-btn {
            display: inline-flex;
            align-items: center;
        }
        &-icon {
            font-size: 10px;
            margin-right: 5px;
        }
    }
}
</style> 