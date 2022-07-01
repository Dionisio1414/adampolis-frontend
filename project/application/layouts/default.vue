<template>
    <div class="wrapper">
        <HeaderHeadline v-if="showHeadline" @onSubmitCookie="submitCookieHandler" />
        <HeaderLinks v-if="!isCheckoutPage" />
        <Header />
        <HeaderSearchNav v-if="!isCheckoutPage" class="d-lg-flex" :class="{ 'd-flex': mainPage }" />
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
import { NuxtCookies } from 'cookie-universal-nuxt';
import dayjs from 'dayjs';
import { HeaderHeadline, HeaderLinks, Header, HeaderSearchNav } from '~/components/header';
import { Footer } from '@/components/footer';
import Notification from '~/components/Notification.vue';

import { COOKIE_POLICY_TOKEN, COOKIE_POLICY_EXPIRATION } from '../constants/cookiePolicyToken';

@Component({
    components: {
        HeaderHeadline,
        HeaderLinks,
        Header,
        HeaderSearchNav,
        Footer,
        Notification
    }
})
export default class LayoutDefault extends Vue {
    // @ts-ignore
    public cookiePolicy: string = '';
    get cookiePolicyToken(): string {
        return this.cookiePolicy;
    }
    set cookiePolicyToken(val: string) {
        this.cookiePolicy = val;
    }

    public get showHeadline(): boolean {
        const $cookies: NuxtCookies = this.$cookies;
        const cookieValue = $cookies.get(COOKIE_POLICY_TOKEN);

        return this.mainPage && !!!cookieValue && !this.cookiePolicyToken;
    }

    public get mainPage(): boolean {
        // @ts-ignore
        const routeName = this.$route.name || '';
        return routeName.indexOf('index') !== -1;
    }

    public get isCheckoutPage(): boolean {
        const routePath = this.$route.path || '';
        return routePath === '/checkout';
    }

    public submitCookieHandler(): void {
        const expires: Date = dayjs()
            .add(COOKIE_POLICY_EXPIRATION)
            .toDate();
        this.$cookies.set(COOKIE_POLICY_TOKEN, JSON.stringify(COOKIE_POLICY_TOKEN), { expires });
        this.cookiePolicyToken = COOKIE_POLICY_TOKEN;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.wrapper {
    min-height: 100vh;
    background-color: $color-light-grey;
}
</style>
