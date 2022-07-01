import Vue from 'vue';
import VueRangeSlider from 'vue-range-component-fixed';
import 'vue-range-component-fixed/dist/vue-range-slider.css';

VueRangeSlider.methods.handleKeyup = () => {};
VueRangeSlider.methods.handleKeydown = () => {};

Vue.component('VueRangeSlider', VueRangeSlider);