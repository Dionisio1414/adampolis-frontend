import Vue from 'vue';

Vue.filter('formatFileName', (value: string) => {
    let file: string = '';

    if(value.includes('https')) file = value.split('filename').pop()?.replace('%', '') || '';
    else file = value.split('/').pop() || '';

    return file; 
});