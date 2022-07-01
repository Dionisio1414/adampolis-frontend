<template>
    <div class="header-contacts d-lg-flex">
        <div class="header-contacts__column column">
            <a class="header-contacts__link" :href="`tel:${headerInformation && headerInformation.shop_phone}`"><i class="header-contacts__icon icon icon--phone-pink"></i>{{ headerInformation && headerInformation.shop_phone }}</a>
            <a class="header-contacts__link" :href="`tel:${headerInformation && headerInformation.shop_phone_checkout}`"><i class="header-contacts__icon icon icon--phone-pink"></i>{{ headerInformation && headerInformation.shop_phone_checkout }}</a>
        </div>
        <div class="header-contacts__column column">
            <div class="header-contacts__email">
                <a class="header-contacts__link" :href="`mailto:${headerInformation && headerInformation.shop_email}`"><i class="header-contacts__icon icon icon--mail-pink"></i>{{  headerInformation && headerInformation.shop_email }}</a>
                <span class="header-contacts__trigger">&nbsp;{{ $t('Header.Contacts.or') }} <span class="header-contacts__link">{{ $t('Header.Contacts.hint') }}</span></span>
            </div>
            <div class="header-contacts__hours">
                <i class="header-contacts__icon icon icon--time-pink"></i>
                <div>
                    <p>{{ $t('Header.Contacts.consult') }}</p>
                    <!-- <p>{{ $t('Header.Contacts.weekdaysHours') }} {{ $t('Header.Contacts.weekendsHours') }}</p> -->
                    <p v-html="transformTimesString"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Component } from 'nuxt-property-decorator';
import { IShopInfo } from '~/types/shop-info.interface';

@Component({
    computed: {
        ...mapGetters({
            headerInformation: 'header-shop-info/getShopInfo'
        })
    }
})
export default class ComponentHeaderContacts extends Vue {
    public headerInformation!: IShopInfo | null;

    public get transformTimesString(): string {
        if (this.headerInformation && this.headerInformation.shop_work_hours) {
            const { shop_work_hours } = this.headerInformation;
            const [firstTime, secondTIme] = shop_work_hours.split('\n');

            return `${firstTime}&nbsp;${secondTIme}`;
        } else {
            return '';
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.header-contacts {
    display: flex;

    &__column {
        display: flex;
        flex-direction: column;
        margin-right: 15px;
    }

    &__icon {
        height: 20px;
        width: 20px;
        margin-right: 8px;
    }

    &__link {
        color: $color-pink;
        font-size: 12px;
        line-height: 17px;
        text-decoration: underline;
        padding: 0;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        white-space: pre;
        &:hover {
            color: lighten($color-pink, 10);
        }
    }

    &__email {
        display: inline-flex;
        margin-bottom: 10px;
        color: $color-black;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 18px;
        align-items: center;

        a {
            margin: 0;
        }
    }

    &__trigger {
        display: inline-flex;
        padding-top: 1px;
        color: lighten($color-black, 10);

        span {
            margin-bottom: 0;
            cursor: pointer;
        }
    }

    &__hours {
        display: flex;
        color: $color-black;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 18px;
    }
}

@include media-lg {
    .header-contacts {
        &__link {
            margin-bottom: 10px;
        }
    }
}
</style>
