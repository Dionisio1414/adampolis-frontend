<template>
    <div class="product-tab-delivery tab-content__item">
        <div class="product-tab-delivery__wrapper">
            <div class="product-tab-delivery__caption">
                {{ $t('ProductInner.mountingSides')}}
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 text text--xs">
                    <p class="product-tab-delivery__text text text--s">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                        gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam
                        fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc
                        eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
                        laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo
                    </p>
                </div>
                <div class="col-12 col-lg-6 text text--xs">
                    <p class="product-tab-delivery__text text text--s">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                        gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam
                        fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc
                        eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
                        laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
@Component({})
export default class ComponentProductTabDelivery extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.product-tab-delivery {
    padding: 22px 0 0 0;
    &__caption {
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        margin-bottom: 20px;
        color: $color-dark-blue;
    }

    &__grid {
        display: grid;
        gap: 30px;
        grid-template-columns: 1fr 1fr;
    }

    &__text {
        line-height: 22px;
        margin-bottom: 20px;
    }
}

@media (min-width: $breakpoint-lg) {
    .product-tab-delivery {
        padding: 17px 30px 25px 17px;

        &__wrapper {
            padding: 10px;
        }

        &__text {
            margin-bottom: 0;
        }
    }
}
</style>
