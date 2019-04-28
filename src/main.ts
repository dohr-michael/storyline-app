import Vue            from 'vue';
import App            from './App.vue';
import router         from './router';
import apolloProvider from './apollo-provider';
import auth           from './auth';
import './registerServiceWorker';

Vue.use(auth);

Vue.config.productionTip = false;

new Vue({
    router,
    apolloProvider,
    render: (h) => h(App),
}).$mount('#app');
