<template>
    <main class="page contacts">
        <div class="container">
            <div class="row">
                <div class="col">
                    <BreadCrumbs></BreadCrumbs>
                </div>
            </div>
            <div class="contacts__top card card--bordered">
                <div class="row">
                    <div class="col">
                        <ContactsTopBlock></ContactsTopBlock>
                    </div>
                </div>
            </div>
            <div class="contacts__middle">
                <div class="row contacts__middle-row">
                    <div
                        v-for="val in 3" 
                        :key="val"
                        class="col-12 col-lg-4 contacts__middle-col"
                    >
                        <ContactsBlock></ContactsBlock>
                    </div>
                </div>
            </div>
            <div class="contacts___map">
                <Map
                    :markers="markers"
                    :center="{lat: 54.68631719706287, lng: 25.290792053854407}"
                    :zoom="9"
                    :options="{
                        zoomControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        disableDefaultUi: false
                    }"
                >
                </Map>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { BreadCrumbs } from '~/components';
import ContactsTopBlock from '~/components/contacts/ContactsTopBlock.vue';
import ContactsBlock from '~/components/contacts/ContactsBlock.vue';
import { IMarkers } from '~/types/markers.interface';
import Map from '~/components/content-types/Locations.vue';

@Component({
    components: {
        BreadCrumbs,
        ContactsTopBlock,
        ContactsBlock,
        Map
    }
})
export default class PageContacts extends Vue {
    public markers: IMarkers[] = [
        {
            lat: 54.68631719706287, 
            lng: 25.290792053854407
        },
        {
            lat: 54.668455431553724,
            lng: 25.12666385574068,
        },
        {
            lat: 54.63778508715263,
            lng: 24.93297695181443,
        },
    ]
}
</script>

<style lang="scss">
@import '~/assets/styles/variables';

.contacts {
    padding-bottom: 50px;
    @media screen and (min-width: $breakpoint-lg) {
        padding-bottom: 80px;
    }
    &__top {
        padding: 30px 15px;
        margin-bottom: 20px;
        @media screen and (min-width: $breakpoint-lg) {
            padding: 30px;
            margin-bottom: 30px;
        }
    }
    &__middle {
        margin-bottom: 30px;
        &-col {
            &:not(:last-child) {
                margin-bottom: 20px;
                @media screen and (min-width: $breakpoint-lg) {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>

