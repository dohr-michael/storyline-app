import Vue     from 'vue';
import Vuetify from 'vuetify';
import fr      from 'vuetify/src/locale/fr';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
    iconfont: 'mdi',
    lang: {
        locales: {fr},
        current: 'fr'
    },
});
