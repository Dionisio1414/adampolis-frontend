import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { IMenuTranslation, IMenuType, ITypeLinkPage } from '~/types/header-menu.interface';
import { EMenuTypes } from '~/constants/menu-types';

@Component({})
export default class MixinTypeLinkWrapper extends Vue {
    @Prop() public item!: IMenuType;
    @Prop() public locale!: string;
    @Prop() public classname!: string | string[];

    public localePath!: (str: string, locale: string) => string;

    public get linkHref(): string {
        if(!this.typeLink) return '/';

        switch (this.item.type) {
            case EMenuTypes.PAGE: {
                const typeLink = this.typeLink as ITypeLinkPage;
                return this.localePath(`/${(typeLink.page || {}).slug}`, this.locale);
            }
            case EMenuTypes.URL: {
                return (this.typeLink as IMenuTranslation)?.url || '/';
            }
            default: {
                return '/';
            }
        }
    }

    public get linkTitle(): string | null {
        if(!this.typeLink) return null;

        switch (this.item.type) {
            case EMenuTypes.PAGE: {
                return (this.typeLink as ITypeLinkPage)?.caption?.title;
            }
            case EMenuTypes.URL: {
                return (this.typeLink as IMenuTranslation)?.title;
            }
            default: {
                return null;
            }
        }
    }

    public get typeLink(): ITypeLinkPage | IMenuTranslation | null {
        if(this.item.type === EMenuTypes.PAGE && this.item.page) {
            return {
                caption: this.item.translations[this.locale],
                page: this.item.page?.translations[this.locale]
            }
        } else if(this.item.type === EMenuTypes.URL && this.item.translations) {
            return this.item.translations[this.locale];
        }

        return null;
    }

}
