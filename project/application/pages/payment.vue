<template>
    <main class="payment-wrapper">
        <div class="payment-wrapper__spinner">
            <Spinner></Spinner>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Spinner from '~/components/Spinner.vue';
import qs from 'qs';

export interface IPaymentQueryParams {
    encoded?: string;
}

@Component({
    layout: 'checkout',
    components: { Spinner }
})
export default class PagePayment extends Vue {
    private encodeParams(params: IPaymentQueryParams): void {
        try {
            const encodedResultString: string = (params.encoded as string)?.replace(/,/g, '');
            const encodedString: string = atob(encodedResultString);
            const { order_nr, status } = qs.parse(encodedString);
            // @ts-ignore
            this.$router.push({ 
                path: '/checkout', 
                query: { orderNumber: order_nr, status: status } 
            });
        } catch(err: any) {
            throw new Error(err);
        }
    }

    public mounted(): void {
        const params: IPaymentQueryParams = this.$route.query;
        this.encodeParams({ encoded: params?.encoded });
    }
}
</script>

<style lang="scss" scoped>
.payment-wrapper {
    position: relative;
    height: 100vh;
    min-height: 100vh;
    &__spinner {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
}
</style>