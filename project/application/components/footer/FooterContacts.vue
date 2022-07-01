<template>
    <div class="footer-contacts">
        <div slot="header" class="footer-contacts__title mb-md-15">
            <div>{{ $t('Footer.Contacts.title') }}</div>
        </div>
        <div class="footer-contacts__contacts" slot="content">
            <div class="footer-contacts__inner">
                <div class="flex-1">
                    <a 
                        v-if="shopPhone" 
                        class="footer-contacts__link" 
                        :href="shopPhone"
                    >
                        <i class="icon icon--phone footer-contacts__icon"></i>
                        {{ $sanitize(shopPhone) }}
                    </a>
                    <a 
                        v-if="shopEmail"
                        class="footer-contacts__link" 
                        :href="`mailto:${shopEmail}`"
                    >
                        <i class="icon icon--mail footer-contacts__icon"></i>
                        {{ shopEmail }}
                    </a>
                </div>
                <div class="flex-1 d-flex footer-contacts__hours">
                    <i class="icon icon--time footer-contacts__icon"></i>
                    <div v-html="$sanitize(transformTimesString)"></div>
                </div>
            </div>
            <FooterSocial></FooterSocial>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import FooterSocial from '~/components/footer/FooterSocial.vue';
import { IShopInfo } from '~/types/shop-info.interface';

@Component({
    components: { FooterSocial }
})
export default class ComponentFooterContacts extends Vue {
    @Prop() public shopInfo!: IShopInfo;

    public get transformTimesString(): string {
        if(this.shopInfo?.shop_work_hours) {
            const { shop_work_hours } = this.shopInfo;
            const [firstTime, secondTime] = shop_work_hours.split('\n');

            return `${firstTime.trim()}<br>${secondTime.trim()}`;
        } else {
            return '';
        }
    }

    public get shopEmail(): string {
        return this.shopInfo.shop_email.trim() ?? null
    }

    public get shopPhone(): string {
        return this.shopInfo.shop_phone.trim() ?? null
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.footer-contacts {
    &__title {
        color: $color-grey;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 19px;
    }

    &__accordion {
        border-top: none;
    }

    &__contacts {
        display: flex;
        flex-direction: column;
        .footer-contacts__link {
            color: $color-grey;
            font-size: 12px;
            line-height: 17px;
            text-decoration: underline;
            padding: 0;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
    }

    &__inner {
        display: flex;
        margin: 10px 0;
    }

    &__icon {
        height: 20px;
        width: 20px;
        margin-right: 8px;
    }

    &__link {
        padding: 4px 0;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 19px;
        color: $color-grey;
        &:hover {
            color: lighten($color-grey, 10);
        }
    }
    &__hours {
        padding-left: 10px;
        div {
            display: flex;
            flex-direction: column;
            color: $color-grey;
            font-size: 12px;
            line-height: 18px;
            white-space: nowrap;
        }
    }
}

@include media-md {
    .footer-contacts {
        &__title {
            display: none;
        }

        &__accordion {
            border-top: 1px solid $color-light-grey;
        }

        &__contacts {
            padding: 17px 20px 16px;

            .footer-contacts__link {
                margin-bottom: 15px;
            }
        }

        &__inner {
            flex-direction: column;
        }

        &__hours {
            padding-left: 0px;
        }
    }
}
</style>
