<template>
    <div v-scroll-lock="true" class="headline-cookie-modal">
        <p>
            {{ $t('HeadlineCookieModal.description') }}

            <NuxtLink :to="localePath('/')" class="btn btn--inline-flex headline-cookie-modal__link">
                {{ $t('HeadlineCookieModal.link') }}
            </NuxtLink>
        </p>

        <button @click="submit()" class="btn btn--primary headline-cookie-modal__btn">
            {{ $t('HeadlineCookieModal.submit') }}
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentHeadlineCookieModal extends Vue {
    public submit(): void {
        this.$emit('close', true);
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.headline-cookie-modal {
    background-color: $color-white;
    border-radius: 4px;
    padding: 20px;
    font-size: 12px;
    margin: -20px 20px 20px;

    &__link {
        color: $color-pink;
        font-size: 12px;
        padding: 0;
        text-decoration: underline;
    }

    &__btn {
        margin-top: 20px;
        min-width: 122px;
    }
}
</style>
