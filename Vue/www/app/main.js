import Vue from 'vue';
import home from "./page/home.vue";

//#start Vue application

new Vue({
    el: '#app',
    render: h => h(home)
});