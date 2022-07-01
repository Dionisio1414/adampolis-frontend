<template>
    <div v-frag>
        <div class="contacts__top-title">
            <h1 class="h1 contacts-title">{{ $t('Contacts.title') }}</h1>
        </div>
        <div class="contacts__top-info">
            <div class="contacts__top-row">
                <div class="contacts__top-col">

                    <div class="list list--info">
                        <div class="list__item">
                            <a class="contacts-phone" href="tel:880060700">8 800 60 700</a>
                        </div>
                        <div class="list__item">
                            <a class="btn btn--link contacts-email" href="mailto:info@adampolis.lt">info@adampolis.lt</a>
                            <span class="or">{{ $t('Contacts.top.or') }}</span>
                            <a class="btn btn--link contacts-helper" href="#">{{ $t('Contacts.top.leaveMessage') }}</a>
                        </div>
                    </div>

                    <span class="list-title">{{ $t('Contacts.top.consultByPhone') }}:</span>
                    <ul class="list">
                        <li class="list__item">I-V: 9:00-18:00</li>
                        <li class="list__item">VI 10:00-18:00</li>
                    </ul>
                </div>
                <div class="contacts__top-col">
                    <span class="list-title">{{ $t('Contacts.top.requisites') }}:</span>
                    <ul class="list">
                        <li class="list__item">{{ $t('Contacts.top.companyCodeText') }}: 234522530</li>
                        <li class="list__item">{{ $t('Contacts.top.pvmMk')  }}: LT345225314</li>
                    </ul>
                </div>
                <div class="contacts__top-col">
                    <span class="list-title">{{ $t('Contacts.top.checkingAccount') }}:</span>
                    <ul class="list">
                        <li class="list__item">OP Corporate Bank plc Lietuvos filialas</li>
                        <li class="list__item">{{ $t('Contacts.top.bankCode')}}: 21500</li>
                        <li class="list__item">A.S LT312150051000054814</li>
                        <li class="list__item">SWIFT: OKOYLT2X</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentContactsTopBlock extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.contacts__top {
    &-title {
        margin-bottom: 20px;
        @media screen and (min-width: $breakpoint-lg) {
            margin-bottom: 30px;
        }
    }
    &-row {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    &-col {
        flex: 0 1 100%;
        @media screen and (min-width: $breakpoint-lg) {
            flex: 0 1 calc(33.3333% - 15px);
            margin-bottom: 0;
        }
    }
}

.list {
    font-weight: normal;
    line-height: 22px;
    color: #000;
    &--info {
        margin-bottom: 10px;
    }
}

.list--info {
    .list__item {
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}

.contacts {
    &-phone {
        text-decoration: none;
        color: #000;
    }
    &-email,
    &-helper {
        color: $color-pink;
    }
    &-title {
        font-size: 20px;
        @media screen and (min-width: $breakpoint-lg) {
            font-size: 24px;
        }
    }
}


</style>