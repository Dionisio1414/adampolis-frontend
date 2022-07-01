<template>
    <AccordionResponsive class="footer-nav-list" :toggleClass="'mb-md-15'">
        <div 
            v-if="title"
            slot="header" 
            class="footer-nav-list__title"
            v-html="$sanitize(title)"
        >
        </div>
        <ul slot="content" class="footer-nav-list__list">
            <li 
                v-for="childItem in item.children" 
                :key="childItem.id" 
                class="footer-nav-list__item"
            >
                <FooterNavListLink 
                    :item="childItem" 
                    :locale="currentLocal"
                    :classname="['btn', 'btn--inline-flex', 'footer-nav-list__link']"
                >
                </FooterNavListLink>
            </li>
        </ul>
    </AccordionResponsive>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import AccordionResponsive from '~/components/AccordionResponsive.vue';
import { IMenuItem } from '~/types/header-menu.interface';
import FooterNavListLink from './FooterNavListLink.vue';

@Component({
    components: { AccordionResponsive, FooterNavListLink }
})
export default class ComponentFooterNavList extends Vue {
    @Prop() public item!: IMenuItem;

    public get currentLocal(): string {
        return this.$i18n.locale;
    }

    public get title(): string {
        return (this.item.translations[this.currentLocal] || {}).title ?? null
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.footer-nav-list {
    padding: 0 10px;
    @media screen and (min-width: $breakpoint-lg) {
        padding: 0;
    }

    &__title {
        color: $color-grey;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 1;
        @media screen and (min-width: $breakpoint-lg) {
            margin-bottom: 20px;
        }
    }

    &__list {
        list-style: none;
        padding: 0;
        margin: 0;
        line-height: 1.22;
    }
    
}

</style>
