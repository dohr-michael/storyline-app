import { Auth } from './auth';

declare module 'vue/types/vue' {

    interface Vue {
        $auth: Auth;
    }
}