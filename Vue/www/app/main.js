import Vue from 'vue';
import home from './page/home.vue';
import helloworld from './webpage/helloworld.vue';

const NotFound = { template : "<h1> 404 </h1>"};
const sample = { template : "<button v-on:click='location'> home </button>",
    methods : {
        location : () => {
            window.location.href = "home";
        }
    }
};

const route = {
    '/simple' : sample,
    '/home' : home,
    '/helloworld' : helloworld
}

//#start Vue application
new Vue({
    el: '#app',
    data : {
        currentRoute : window.location.pathname
    },
    computed : {
        ViewComponent (){
            return route[this.currentRoute] || NotFound;
        }
    },
    render (h) { return h(this.ViewComponent) }
});