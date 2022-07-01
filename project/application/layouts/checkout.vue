<template>
    <div class="wrapper">
        <CheckoutHeader />
        <Nuxt />
        <Footer />
        <client-only>
            <notifications position="bottom right" :width="386">
                <template slot="body" slot-scope="{ item, close }">
                    <Notification :item="item" :closeCallback="close" />
                </template>
            </notifications>
        </client-only>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { CheckoutHeader } from '~/components/header';
import { Footer } from '@/components/footer';
import Notification from '~/components/Notification.vue';

@Component({
    components: {
        Footer,
        Notification,
        CheckoutHeader
    }
})
export default class LayoutCheckout extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.wrapper {
    background-color: $color-light-grey;
}
</style>
