<template>
    <div class="contacts__block card card--bordered">
        <div class="contacts-badges">
            <div class="contacts-badges__item">
                <i class="icon icon--store"></i>
            </div>
            <div class="contacts-badges__item">
                <i class="icon icon--services"></i>
            </div>
        </div>
        <div class="contacts-title">{{ $t('Contacts.block.title') }}</div>
        <div class="contacts-info">
            <div class="contacts-info__item">
                <i class="icon icon--time contacts-info__item--icon"></i>
                <div class="shedule-list">
                    <span class="shedule-title">{{ $t('Contacts.block.workingHours') }}:</span>
                    <div class="shedule-time">
                        I-V 08:00 - 18:00
                    </div>
                    <div class="shedule-time">
                        VI-VII nedirbame
                    </div>
                </div>
            </div>
            <div class="contacts-info__item">
                <i class="icon icon--phone contacts-info__item--icon"></i>
                <div class="phone-list">
                    <a class="phone-list" href="tel:+37062300390">+37062300390</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ComponentContactsBlock extends Vue {}
</script>

<style lang="scss">
@import '~/assets/styles/variables';

.contacts {
    &__block {
        position: relative;
        padding: 15px;
        @media screen and (min-width: $breakpoint-lg) {
            padding: 20px;
        }
    }
    &-badges {
        position: absolute;
        top: 14px;
        right: 20px;
        &__item {
            font-size: 20px;
            background: $color-light-grey;
            border-radius: 4px;
            padding: 6px;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
    }
    &-title {
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        margin-bottom: 15px;
        color: $color-dark-blue;

        @media screen and (min-width: $breakpoint-lg) {
            line-height: 45px;
            margin-bottom: 20px;
        }
    }
    &-info {
        &__item {
            display: flex;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
            &--icon {
                font-size: 20px;
                margin-right: 10px;
            }
        }
    }
}

.shedule-list {
    line-height: 22px;
}

.phone-list {
    font-size: 12px;
    text-decoration: none;
    color: #000;
}
</style>
