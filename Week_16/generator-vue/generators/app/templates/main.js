import Hello from './hello.vue';
import Vue from 'Vue';

new Vue({
    el: "#app",
    render: h => h(Hello)
});