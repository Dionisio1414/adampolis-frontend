<template>
    <div class="catalog-accessories-card">
        <div class="catalog-accessories-card__content">
            <div class="catalog-accessories-card__header">
                <div class="catalog-accessories-card__picture">
                    <img
                        class="img-responsive width"
                        :src="require(`@/assets/images/prdukto-foto1-small.png`)"
                        alt=""
                    />
                </div>

                <div class="catalog-accessories-card__badges--absolute d-block d-lg-none">
                    <div
                        class="catalog-accessories-card__badge"
                        :class="{ 'catalog-accessories-card__badge--original': isOriginals }"
                    >
                        {{ isOriginals ? $t('MainProduct.original') : $t('MainProduct.analog') }}
                    </div>
                </div>

                <div class="catalog-accessories-card__information">
                    <div class="catalog-accessories-card__caption">{{ product.name }}</div>
                    <div class="catalog-accessories-card__list">
                        <div class="catalog-accessories-card__list-item">
                            {{ $t('MainProduct.code') }}: {{ product.code }}
                        </div>
                        <div class="catalog-accessories-card__list-item">
                            {{ $t('MainProduct.sku') }}: {{ product.sku }}
                        </div>
                        <div class="catalog-accessories-card__list-item">
                            Likutis:
                            <span class="catalog-accessories-card__list-item--bold">5 vnt</span>
                        </div>
                    </div>

                    <div class="catalog-accessories-card__badges d-block d-lg-none">
                        <div class="catalog-accessories-card__badge--brand">
                            <img
                                class="img-responsive width"
                                :src="require(`@/assets/images/suppliers/bosch.png`)"
                                alt=""
                            />
                        </div>
                    </div>

                    <div class="catalog-accessories-card__list prices">
                        <div class="catalog-accessories-card__list-item">
                            <div class="catalog-accessories-card__price">3.07 €</div>
                            <div class="catalog-accessories-card__description">
                                Su PVM
                                <span class="catalog-accessories-card__description-badge"
                                    >% {{ $t('MainProduct.onlyForYou') }}</span
                                >
                            </div>
                        </div>
                        <div class="catalog-accessories-card__list-item">
                            <div class="catalog-accessories-card__price">3.07 €</div>
                            <div class="catalog-accessories-card__price price--old">2.54 €</div>
                            <div class="catalog-accessories-card__description">
                                Be PVM
                                <span class="catalog-accessories-card__description-badge">{{
                                    $t('MainProduct.basePrice')
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="catalog-accessories-card__footer">
                        <InputProductsCounter
                            class="catalog-accessories-card__counter"
                            :disabled="formDisabled"
                            :minValue="1"
                            v-model="quantity"
                        />
                        <button @click="submit()" class="btn btn--pink catalog-accessories-card__submit d-lg-block d-none">
                            {{ $t('MainProduct.addToCart') }}
                        </button>
                        <FavoriteButton />
                    </div>
                    <button @click="submit()" class="btn btn--pink catalog-accessories-card__submit d-lg-none d-block">
                        {{ $t('MainProduct.addToCart') }}
                    </button>
                </div>
                <div class="catalog-accessories-card__badges d-none d-lg-block">
                    <div class="catalog-accessories-card__badge--brand">
                        <img
                            class="img-responsive width"
                            :src="require(`@/assets/images/suppliers/bosch.png`)"
                            alt=""
                        />
                    </div>
                    <div
                        class="catalog-accessories-card__badge"
                        :class="{ 'catalog-accessories-card__badge--original': isOriginals }"
                    >
                        {{ isOriginals ? $t('MainProduct.original') : $t('MainProduct.analog') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import CatalogAnalogsList from '~/components/catalogs/CatalogAnalogsList.vue';
import CatalogCardDetail from '~/components/catalogs/CatalogCardDetail.vue';
import SlideUpDown from 'vue-slide-up-down';
import { InputProductsCounter, FavoriteButton } from '~/components';

@Component({
    components: {
        CatalogAnalogsList,
        CatalogCardDetail,
        SlideUpDown,
        InputProductsCounter,
        FavoriteButton
    }
})
export default class CatalogAccessoriesCard extends Vue {
    quantity = 1;
    formDisabled = false;
    isDetail: boolean = false;
    isOriginals: boolean = false;

    public product = {
        name: 'Impreza, 1.6-2.0, 92-00, kair.',
        code: '588228',
        sku: 'KYB349024',
        quantity: '5',
        prices: {
            withtax: {
                price: 3.07,
                oldPrice: null
            },
            withouttax: {
                price: 3.07,
                oldPrice: 2.55
            }
        }
    };

    public submit() {
        console.log('submit');
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.catalog-accessories-card {
    position: relative;
    background: $color-white;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid $color-grey;

    &__content {
        display: flex;
        width: 100%;
        padding: 20px;
    }

    &__counter {
        max-width: 96px;
        margin-right: 20px;
        height: max-content;
    }

    &__prices {
        margin-top: 10px;
    }

    &__price {
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        margin-right: 8px;
        margin-top: 8px;
        color: $color-pink;

        &:last-child {
            margin-bottom: 12px;
        }

        &--old {
            text-decoration: line-through;
            color: $color-dark-blue;
        }
    }

    &__submit {
        font-size: 16px;
        min-width: 130px;
        margin-right: 20px;
    }

    &__like {
        min-height: 40px;
    }

    &__details {
        display: inline-flex;
        align-items: center;
        font-size: 16px;
        margin-left: auto;
        min-width: 116px;
        .icon {
            margin-left: auto;
        }
    }

    &__description {
        display: inline-block;
        font-size: 14px;
        line-height: 19px;
        color: $color-dark-blue;
    }

    &__description-badge {
        padding: 0 8px 2px 10px;
        font-size: 12px;
        color: $color-default;
        background-color: $color-accent-grey;
        border-radius: 4px;
        margin-left: 10px;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
    }

    &__badges {
        margin-left: auto;

        div:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    &__badges--absolute {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    &__badge {
        background-color: $color-accent-grey;
        font-size: 12px;
        line-height: 18px;
        line-height: 1;
        border-radius: 4px;
        padding: 3px 10px;
        text-align: center;
        margin-left: auto;
        width: max-content;

        &--brand {
            max-width: 90px;
            max-height: 20px;
            margin-left: auto;
        }
        &--original {
            background: $color-accent-orange;
        }
    }

    &__picture {
        max-width: 120px;
        max-height: 120px;
        margin-right: 20px;
    }

    &__caption {
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        margin-bottom: 10px;
        color: $color-dark-blue;
    }

    &__list-item {
        font-size: 14px;
        line-height: 21px;
        color: $color-dark-blue;

        &--bold {
            font-weight: bold;
        }
    }

    &__footer {
        display: flex;
        align-items: center;
        margin-top: 12px;
    }
}

@include media-lg {
    .catalog-accessories-card {
        &__header {
            flex-direction: column;
        }
        &__content {
            padding: 10px;
        }

        &__badges {
            margin-left: 0;
        }

        &__badge--brand {
            margin: 15px 0;
        }

        &__caption {
            font-size: 16px;
        }

        &__submit {
            margin-top: 20px;
            width: 100%;
        }
    }
}

@include media-md {
    .catalog-accessories-card__picture {
        height: 90px;
        width: 90px;
    }
}
</style>
