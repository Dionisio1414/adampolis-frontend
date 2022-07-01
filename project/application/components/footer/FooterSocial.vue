<template>
    <div class="footer-social">
        <div class="footer-social__title">
            <div>{{ $t('Footer.Social.title') }}</div>
        </div>
        <div class="footer-social__icons">
            <a :href="'link'" target="_blank" class="btn footer-social__link">
                <span class="social-links-icon icon icon--facebook footer-social__icon"></span>
            </a>
            <a :href="'link'" target="_blank" class="btn footer-social__link">
                <span class="social-links-icon icon icon--instagram footer-social__icon"></span>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentFooterSocial extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.footer-social {
    &__icons {
        padding: 10px 0 0;

        .icon--instagram {
            height: 27px;
            width: 28px;
        }
        .icon--facebook {
            height: 27px;
            width: 27px;
        }
    }

    &__icon {
        margin: 0 8px;
        &:first-child {
            margin-left: 0;
        }
    }

    &__link {
        padding: 0;
        &:hover {
            opacity: 0.7;
        }
    }

    &__title {
        color: $color-grey;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 19px;
    }
}

@include media-md {
    .footer-social {
        &__title {
            display: none;
        }
    }
}
</style>
