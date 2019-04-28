import Vue            from 'vue';
import './plugins/vuetify'
import App            from './App.vue';
import router         from './router';
import apolloProvider from './apollo-provider';
import auth           from './auth';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(auth);

Vue.config.productionTip = false;

new Vue({
    router,
    apolloProvider,
    render: (h) => h(App),
}).$mount('#app');
