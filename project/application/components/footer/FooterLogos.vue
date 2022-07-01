<template>
    <div class="footer-logos">
        <img class="footer-logos__adampolis" src="~/assets/images/adampolis-footer.png" alt="adampolis" />
        <img class="footer-logos__tecalliance" src="~/assets/images/tecalliance-footer.png" alt="tecalliance" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentFooterLogos extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.footer-logos {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    img {
        width: calc(100% - 40px);
        object-fit: contain;
        max-width: 245px;
        &:first-child {
            margin-bottom: 20px;
        }
    }
}

@include media-md {
    .footer-logos {
        flex-direction: row;
        align-items: flex-start;
        border-top: 1px solid $color-default;
        padding: 30px 10px 8px;

        img {
            width: 135px;
            &:first-child {
                margin-bottom: 0;
                margin-right: 30px;
            }
        }
    }
}
</style>
