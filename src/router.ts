import Vue    from 'vue';
import Router from 'vue-router';
import Home   from './views/Home.vue';
import Login  from './views/Login.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: Login,

        }
    ],
});

// "setup" of a global guard
router.beforeEach((to, from, next) => {
    console.log('router:', to.name, from.name);
    if (to.name == 'login') { // check if "to"-route is "callback" and allow access
        next();
    } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
        next();
    } else { // trigger auth0 login
        router.app.$auth.login(to);
    }
});

export default router;
