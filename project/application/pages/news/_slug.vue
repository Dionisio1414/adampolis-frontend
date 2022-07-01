<template>
    <div class="news-inner">
        <div class="news-inner__card  card card--bordered">
            <div class="news-inner__wrapper">
                <h2 class="news-inner__header">
                    Proveržis Kauno viešajame transporte: pradeda kursuoti pirmasis iš šimto hibridinių autobusų
                </h2>
                <p class="news-inner__date">
                    2020 09 10
                </p>

                <p class="news-inner__text news-inner__text--bold ">
                    Rugsėjo viduryje Kauną pasiekęs naujasis „MAN Lion’s City 12“ hibridinis autobusas penktadienį
                    pradėjo kursuoti miesto gatvėmis. Aukščiausius kokybės standartus Kauno viešajame transporte
                    įtvirtinantis hibridas žymi rekordinį „Kauno autobusų“ parko atsinaujinimą. Iki 2021 metų vidurio į
                    miesto gatves išriedės net 100 tokių modernių autobusų, įsigytų už 23,5 mln. eurų. Aukštai iškelta
                    kokybės kartelė
                </p>

                <p class="news-inner__text ">
                    „Viešojo transporto ateitis neatsiejama nuo tvarių ir ekologiškų sprendimų. Pastaruosius kelerius
                    metus vykstantys pokyčiai ir solidžios investicijos ne tik sumažins kaštus, triukšmo ir aplinkos
                    taršą, bet svarbiausia – užtikrins komfortišką susisiekimą kauniečiams ir miesto svečiams. Esame
                    bemaž pirmasis miestas Europoje, kuriame važinės toks kiekis modernių hibridinių autobusų ir manau,
                    kad tai – ne pabaiga. Šie pokyčiai žymi dar aukštesnius standartus mūsų miesto viešajame
                    transporte“, – apie naujausią „Kauno autobusų“ pirkinį kalbėjo Kauno meras Visvaldas Matijošaitis.
                    Kiekvieną dieną Kaune skaičiuojama apie 150–200 tūkst. kelionių miesto autobusais ir troleibusais,
                    todėl renkantis naują tiekėją atsižvelgta ne tik į kainos ir kokybės santykį, bet ir ilgalaikes
                    degalų bei aptarnavimo sąnaudas.
                </p>

                <img class="news-inner__img img-responsive" src="@/assets/images/news/news_mock_big_1.png" alt="" />

                <p class="news-inner__text ">
                    Po daugiau kaip pusmetį trukusio konkurso, pernai lapkritį, „Kauno autobusai“ sudarė 23,5 mln. eurų
                    sutartį su Vokietijos gamintojo atstovu Lietuvoje, bendrove „Adampolis“, dėl šimto „MAN Lion’s City
                    12“ autobusų. Tokio masto pirkimas – rekordinis Kauno miesto istorijoje.
                </p>

                <p class="news-inner__subheader">Sukurtas keleivių komfortui</p>
                <p class="news-inner__text ">
                    „Dar prieš penkerius metus galėjome tik pasvajoti, kad sugebėsime pasiūlyti tokios paslaugos kokybę
                    mūsų miesto gyventojams ir svečiams. Esu įsitikinęs, kad po kelerių metų, įgyvendinus visus
                    pagrindinius projektus, mūsų miesto viešasis transportas bus vertinamas ne tik kauniečių, bet ir
                    rodomas kaip pavyzdys visame regione“, – vykstančius pokyčius „Kauno autobusų“ parke komentavo
                    bendrovės generalinis direktorius Mindaugas Grigelis. Erdvus, 100 keleivių talpinantis, hibridinis
                    „MAN Lion‘s City 12“ turi viską, ko gali tikėtis vis reiklesni viešojo transporto keleiviai. Jų
                    patogumui autobuse veikia pajėgi salono šildymo sistema, o karštomis dienomis vėsina
                    kondicionierius.
                </p>

                <p class="news-inner__text ">
                    MAN gamyklos inžinierių sukurtoje transporto priemonėje yra 28 sėdimos vietos su specialiai Kauno
                    viešajam transportui sukurtu ilgaamžiu, lengvai valomu vilnos audiniu, kuris papildomai padengtas
                    antibakterine danga. Komforto detales salone papildo ir USB jungtys mobiliesiems prietaisams
                    įkrauti. 72 stovimomis vietomis ir atskira erdve vežimėliui aprūpintas autobusas keleivius pasitiks
                    su neslidžia bei jaukumo suteikiančia medžio parketo imitacijos grindų danga. Stabilumo ir papildomo
                    saugumo suteikia į autobuso salono dizainą integruoti bei skirtinguose aukščiuose išdėstyti ovalaus
                    profilio turėklai. „MAN Lion’s City 12“ autobusas taip pat pritaikytas žmonėms su negalia –
                    galvojant apie silpnaregius, čia įrengti du aukštos raiškos monitoriai bei ryškiai baltų šviesos
                    diodų maršrutų rodyklės. Stotelių pavadinimus bei kitą su maršrutu susijusią informaciją transliuoja
                    aštuonių garsiakalbių sistema. Trejos plačios dvigubos durys leis į žemagrindę transporto priemonę
                    lengviau patekti žmonėms su neįgaliųjų vežimėliais bei tėveliams su kūdikiais.
                </p>
            </div>

            <div class="news-inner__wrapper">
                <h2 class="news-inner__header news-inner__header--small">
                    {{ $t('News.related') }}
                </h2>
                <div class="news-inner__products">
                    <Slider
                        :ref="sliderRefName"
                        :settings="sliderSettings"
                        :withScrollbar="false"
                        :withArrows="false"
                        :wrapperClass="wrapperClass"
                    >
                        <CompleteProductCard class="swiper-slide" v-for="val in 2" :key="val" />
                    </Slider>
                </div>
            </div>
        </div>

        <div class="news-inner__card card card--bordered">
            <div class="news-inner__wrapper">
                <h2 class="news-inner__header news-inner__header--small">
                    {{ $t('News.otherNews') }}
                </h2>

                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-4" v-for="(item, i) in news" :key="i">
                        <div class="news-inner__item">
                            <NuxtLink :to="{ path: `/news/${item.id}` }">
                                <img class="news-inner__image img-responsive" :src="item && item.image" alt="" />
                                <p class="news-inner__date news-inner__date--card">{{ item && item.date }}</p>
                                <p class="news-inner__title">{{ item && item.title }}</p>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { SwiperOptions } from 'swiper';
import { INews } from '~/types/news.interface';
import CompleteProductCard from '~/components/catalogs/CompleteProductCard.vue';
import Slider from '@/components/Slider.vue';

@Component({
    components: {
        CompleteProductCard,
        Slider
    }
})
export default class ComponentNewsInner extends Vue {
    public news: INews[] = [
        {
            image: require('~/assets/images/news/news_mock_1.png'),
            date: '2020-09-10',
            title: 'Naujas servisas Vilniuje ir nauja sunkvežimių MAN karta',
            id: 0
        },
        {
            image: require('~/assets/images/news/news_mock_2.png'),
            date: '2020-09-10',
            title: 'Proveržis Kauno viešajame transporte: pradeda kursuoti pirmasis iš šimto hibridinių autobusų',
            id: 1
        },
        {
            image: require('~/assets/images/news/news_mock_3.png'),
            date: '2020-09-10',
            title: 'Vilniaus viešasis transportas už 19 mln. eurų perka 50 naujų MAN Lions City hibridinių autobusų',
            id: 2
        }
    ];

    public sliderRefName: string = `promotionsSlider-${Math.floor(100000 + Math.random() * 900000)}`;
    public wrapperClass: string = 'news-inner__slider';
    public show: boolean = false;
    public sliderSettings: SwiperOptions = {
        slidesPerView: 'auto',
        wrapperClass: this.wrapperClass,
        spaceBetween: 20,
        breakpoints: {
            768: {
                slidesPerView: 2,
                noSwiping: true
                // noSwipingClass: 'main-banners__slider-wrap'
            },
            1200: {
                slidesPerView: 2,
                noSwiping: true
                // noSwipingClass: 'main-banners__slider-wrap'
            }
        },
        on: {
            init: () => {
                this.swiperOnInit();
            },
            beforeDestroy: () => {
                this.swiperOnBeforeDestroy();
            },
            resize: () => {
                // @ts-ignore
                if (this.sliderRef && (this.sliderRef as any).swiperInstance) {
                    // @ts-ignore
                    this.sliderRef.swiperInstance.update();
                    // @ts-ignore
                    this.sliderRef.swiperInstance.init();
                }
                this.swiperOnResize();
            }
        }
    };

    public swiperOnInit(): void {
        this.show = true;
        this.$emit('onInit');
    }

    public swiperOnResize(): void {
        this.$emit('onResize');
    }

    public swiperOnBeforeDestroy(): void {
        this.show = false;
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.news-inner {
    &__wrapper {
        padding: 30px 15px;

        &:not(:first-child) {
            border-top: 1px solid $color-lightest-grey;
        }
    }

    &__card {
        &:not(:last-child) {
            margin-bottom: 30px;
        }
    }

    &__header {
        font-size: 20px;
        color: $color-dark-blue;
        line-height: 27px;
        font-weight: bold;
        max-width: 966px;

        &--small {
            margin-bottom: 20px;
        }
    }

    &__text {
        font-size: 14px;
        line-height: 19px;
        color: $color-dark-blue;

        &:not(:last-child) {
            margin-bottom: 30px;
        }

        &--bold {
            font-weight: bold;
        }
    }

    &__img {
        width: 100%;
        margin-bottom: 30px;
    }

    &__date {
        font-size: 12px;
        color: $color-search-bg;
        line-height: 18px;
        margin: 15px 0;

        &--card {
            margin: 10px 0;
        }
    }

    &__title {
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        color: $color-dark-blue;
        margin: 0;
    }

    a {
        text-decoration: none;
    }
}

@media (min-width: $breakpoint-lg) {
    .news-inner {
        &__wrapper {
            padding: 30px;
        }

        &__header {
            font-size: 24px;
            line-height: 33px;
            padding-top: 10px;

            &--small {
                font-size: 20px;
                line-height: 27px;
                padding-top: 0;
                margin-bottom: 20px;
            }
        }

        &__date {
            margin: 15px 0 20px 0;
            &--card {
                margin: 10px;
            }
        }

        &__title {
            margin: 0 10px;
        }

        &__text {
            font-size: 16px;
            line-height: 24px;
        }

        &__img {
            margin-bottom: 56px;
        }
    }
}
</style>
