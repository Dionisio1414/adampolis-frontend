export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head(app) {
        const script = [];

        return {
            title: 'Adampolis',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1, user-scalable=0' },
                { hid: 'description', name: 'description', content: '' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
            script
        }
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/node_modules/normalize.css/normalize.css',
        '~/node_modules/swiper/css/swiper.css',
        '~/node_modules/bootstrap/scss/bootstrap-grid.scss',
        '~/assets/styles/main.scss'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~plugins/filters.ts',
        '~plugins/vue-js-modal.ts',
        {
            src: '~plugins/v-mask.ts',
            ssr: false
        },
        '~plugins/axios.ts',
        '~plugins/frag.ts',
        '~plugins/i18n-iso-countries.ts',
        '~plugins/vue-sanitize.ts',
        {
            src: '~/plugins/vue-autosuggest.ts', 
            ssr: false 
        },
        { 
            src: '~/plugins/vue2-datepicker.ts', 
            ssr: false 
        },
        {
            src: '~plugins/vue2-google-maps.ts',
            ssr: true,
        },
        {
            src: '~plugins/vue2-google-maps-cluster.ts',
            ssr: true,
        },
        {
            src: '~plugins/vue-notification.ts',
            ssr: false
        },
        {
            src: '~plugins/vue-range-component-fixed.ts',
            ssr: false
        },
        {
            src: '~plugins/v-scroll-lock.ts',
            ssr: false
        },
        {
            src: '~plugins/vue-awesome-swiper.ts',
            ssr: false
        },
        {
            src: '~plugins/vue-number-format.ts',
            ssr: false
        },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: false,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        '@nuxt/typescript-build',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/dayjs',
        'nuxt-i18n',
        'cookie-universal-nuxt',
        'nuxt-client-init-module'
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},

    dayjs: {
        locales: ['lt', 'en'],
        defaultLocale: 'lt',
        defaultTimeZone: 'Europe/Vilnius',
        plugins: [
          'utc',
          'timezone',
          'relativeTime'
        ]
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: [/^vue2-google-maps($|\/)/]
    },

    i18n: {
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
            useCookie: true,
            alwaysRedirect: true,
            cookieCrossOrigin: true,
            cookieKey: 'translation_token'
        },
        langDir: 'translation/',
        lazy: true,
        locales: [
            {
                code: 'en',
                file: 'en_US.js',
                iso: 'en_US'
            },
            {
                code: 'lt',
                file: 'lt_LT.js',
                iso: 'lt_LT' // Will be used as catchall locale by default
            }
        ],
        vueI18nLoader: true,
        defaultLocale: 'lt',
        vueI18n: {
            fallbackLocale: 'lt',
            numberFormats: {
                'lt': {
                    currency: {
                        style: 'currency',
                        currency: 'EUR',
                        currencyDisplay: 'symbol'
                    }
                }
            }
        }
    },

    router: {
        linkActiveClass: 'link-active',
        linkExactActiveClass: 'link-active-exact'
    },

    env: {
        api_url: process.env.api_url
    },

    loading: {
        color: '#4A96D1',
        height: '4px',
        failedColor: '#E50145'
    },

    publicRuntimeConfig: {
        apiURL: process.env.api_url,
        gmapApiKey: process.env.gmap_key
    },
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        }
    }
}
