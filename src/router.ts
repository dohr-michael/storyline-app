import Vue               from 'vue';
import Router, { Route } from 'vue-router';
import Login             from '@/app/views/Login.vue';
import Main              from '@/app/views/Main.vue';
import * as home         from '@/app/views/home';
import * as universes    from '@/app/views/universes';
import * as utils        from '@/utils';

Vue.use(Router);

const asyncRouter = (): Router => router;
const router: Router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                skipAuth: true,
            },
        },
        {
            path: '/',
            name: 'main',
            component: Main,
            redirect: {name: 'home'},
            children: [
                {
                    path: 'home',
                    name: 'home',
                    components: home,
                },
                {
                    path: 'universes',
                    name: 'universes',
                    components: {
                        Main: () => import(/* webpackChunkName: "universes" */ '@/app/views/universes/Universes.vue'),
                        Toolbar: () => import(/* webpackChunkName: "universes" */ '@/app/views/universes/UniversesToolbar.vue'),
                    },
                    props: {
                        Main: utils.router
                            .pagedRoute()
                            .withNewRouteName('new-universe')
                            .build(asyncRouter),
                        Toolbar: utils.router
                            .queryRoute()
                            .build(asyncRouter),
                    },
                    children: [
                        {
                            path: 'new',
                            name: 'new-universe',
                            component: () => import(/* webpackChunkName: "create-universe" */ '@/app/views/universes/CreateUniversePage.vue'),
                            props: {
                                listRouteName: 'universes',
                            },
                        },
                    ],
                },
            ],
        },
    ],
});

// "setup" of a global guard
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.skipAuth === true) { // check if "to"-route is "callback" and allow access
        next();
    } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
        next();
    } else { // trigger auth0 login
        router.app.$auth.login(to);
    }
});

export default router;
