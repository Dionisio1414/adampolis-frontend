<template>
    <section class="main-services">
        <div class="main-services__content">
            <div class="main-services__item" v-for="item in items" :key="item.id">
                <div class="main-services__image">
                    <img :src="require(`@/assets/images/${item.image}`)" />
                </div>
                <div class="main-services__details">
                    <div class="main-services__title">
                        {{ item.title }}
                    </div>
                    <div class="main-services__subtitle">
                        {{ item.subtitle }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ComponentMainServices extends Vue {
    public items = [
        {
            id: 1,
            title: 'Lorem ipsum',
            subtitle: 'Lorem ipsum dolor sit amet',
            image: 'service-1.svg'
        },
        {
            id: 2,
            title: 'Lorem ipsum',
            subtitle: 'Lorem ipsum dolor sit amet',
            image: 'service-2.svg'
        },
        {
            id: 3,
            title: 'Lorem ipsum',
            subtitle: 'Lorem ipsum dolor sit amet',
            image: 'service-3.svg'
        },
        {
            id: 4,
            title: 'Lorem ipsum',
            subtitle: 'Lorem ipsum dolor sit amet',
            image: 'service-4.svg'
        }
    ];
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.main-services {
    background-color: $color-dark-grey;
    border-radius: 0 0 4px 4px;

    &__content {
        display: flex;
        flex-wrap: wrap;
    }

    &__item {
        flex-grow: 1;
        width: 25%;
        display: flex;
        align-items: center;
        padding: 25px 0;
    }

    &__details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        font-size: 14px;
    }

    &__title {
        color: $color-dark-blue;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 19px;
    }

    &__subtitle {
        color: $color-black;
        letter-spacing: 0;
        line-height: 22px;
    }

    &__image {
        img {
            max-width: 48px;
            object-fit: cover;
            margin: 0 15px 0 30px;
        }
    }
}

@include media-md {
    .main-services {
        &__item {
            padding: 20px 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__image {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 65px;
            img {
                margin: 0 15px 0 0;
            }
        }
    }
}
</style>
