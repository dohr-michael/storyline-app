import Vue            from 'vue';
import App            from './App.vue';
import router         from './router';
import apolloProvider from './plugins/apollo';
import './plugins/auth';
import './plugins/vue-rx';
import './plugins/vuetify';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
    router,
    apolloProvider,
    render: (h) => h(App),
}).$mount('#app');
