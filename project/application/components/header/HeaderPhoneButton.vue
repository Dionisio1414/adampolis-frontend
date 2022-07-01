<template>
    <a :href="'tel:' + $t('HeaderPhoneButton.link')">
        <div class="header-phone-button">
            <i class="icon icon--phone-white"></i>
        </div>
    </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentHeaderPhoneButton extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
.header-phone-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px 13px;
    cursor: pointer;
    i {
        height: 24px;
        width: 24px;
    }
}
</style>
