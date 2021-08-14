import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router ({
    routes: [
        {
            path: "/",
            component: () => import('@/pages/Home'),
        },
        {
            path: '/item/:id',
            name: 'item',
            component: () => import('@/pages/Edit'),
        }
    ]
})