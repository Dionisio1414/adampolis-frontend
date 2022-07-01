<template>
    <Dropdown
        :options="{
            placement: 'bottom-start',
            modifiers: {
                flip: {
                    name: 'flip',
                    enabled: false
                },
                offset: {
                    offset: '0,7.5px'
                },
                keepTogether: {
                    enabled: false
                }
            }
        }"
        :appendToBody="true"
    >
        <template v-slot="{ doClose }">
            <div class="dropdown__body width-min-214">
                <div v-for="item in items" :key="item.id">
                    <HeaderLink
                        :item="item"
                        :locale="locale" 
                        :classname="['dropdown__trigger', 'dropdown__trigger--flex']"
                        @click.native="doClose"
                    >
                    </HeaderLink>
                </div>
            </div>
        </template>
        <template v-slot:reference="{ isOpen }">
            <button class="btn btn--flex btn--default header-links-info__button">
                {{ getLocaleTitle }}
                <span
                    class="icon icon--arrow-down dropdown__arrow"
                    :class="{ 'dropdown__arrow--active': isOpen }"
                ></span>
            </button>
        </template>
    </Dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import Dropdown from '~/components/Dropdown.vue';
import { IMenuType, IMenuTranslation } from '~/types/header-menu.interface';
import HeaderLink from './HeaderLink.vue';

@Component({
    components: { Dropdown, HeaderLink }
})
export default class ComponentHeaderLinksInfo extends Vue {
    @Prop()
    public items!: IMenuType;
    @Prop()
    public title!: IMenuTranslation;
    @Prop()
    public locale!: string;

    public get getLocaleTitle(): string {
        return this.title ? ((this.title as any)[this.locale] || {}).title : '';
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.dropdown__body {
    padding-top: 10px;
    padding-bottom: 6px;
    margin-top: -8px;
}

.header-links-info {
    &__button {
        font-size: 12px;
        color: $color-default;
        padding: 9px 10px;
    }
}
// .main {
//     font-size: 12px;
//     color: $color-default;
//     padding: 9px 10px;
// }
// .user-menu-icon {
//     &-profile {
//         font-size: 20px;
//         margin-top: -2px;
//         margin-bottom: -2px;
//     }

//     &-my-account,
//     &-orders,
//     &-logout {
//         font-size: 16px;
//     }
// }


</style>
