import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history', //retira a # da url
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("./components/Home")
        },
        {
            path: '/carrinho',
            name: 'carrinho',
            component: () => import("./components/Carrinho")
        },
    ]
});