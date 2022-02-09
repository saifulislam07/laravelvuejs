require('./bootstrap');
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import router from './router'
import App from './layouts/App'
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

Vue.component('todo', require('./components/Todo.vue').default);

const app = new Vue({
    el: '#app',
    components: { App },
    router
});
