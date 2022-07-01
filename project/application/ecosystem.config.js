module.exports = {
    apps: [
        {
            name: 'nuxt-ssr',
            exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start'
        }
    ]
};
