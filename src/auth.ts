import Vue         from 'vue';
import { WebAuth } from 'auth0-js';
import Component   from 'vue-class-component';
import { Route }   from 'vue-router';
import config      from '@/environment';

const webAuth = new WebAuth({
    ...config.auth0,
});

function writeToStorage(key: string, value: string | null) {
    const storageKey = `auth.${key}`;
    if (!value) {
        sessionStorage.removeItem(storageKey);
    } else {
        sessionStorage.setItem(storageKey, value);
    }
}

function readFromStorage(key: string): string | null {
    return sessionStorage.getItem(`auth.${key}`);
}

export interface UserProfile {}

@Component({})
export class Auth extends Vue {
    private _token?: string | null;
    private _accessToken?: string | null;
    private _expiredAt?: number;
    private _profile?: UserProfile | null;
    private _state?: Route | null;

    get token(): string | null {
        if (!this._token) {
            this._token = readFromStorage('id_token');
        }
        return this._token;
    }

    set token(value: string | null) {
        this._token = value;
        writeToStorage('id_token', value);
    }

    get accessToken(): string | null {
        if (!this._accessToken) {
            this._accessToken = readFromStorage('access_token');
        }
        return this._accessToken;
    }

    set accessToken(value: string | null) {
        this._accessToken = value;
        writeToStorage('access_token', value);
    }

    get expiredAt(): number {
        if (this._expiredAt === 0 || this._expiredAt === undefined) {
            const v = readFromStorage('expired_at');
            this._expiredAt = v ? parseInt(v) : 0;
        }
        return this._expiredAt || 0;
    }

    set expiredAt(value: number) {
        const expiredAt = (value * 1000 + new Date().getTime());
        this._expiredAt = expiredAt;
        writeToStorage('expired_at', '' + expiredAt);
    }

    get profile(): UserProfile | null {
        if (!this._profile) {
            const v = readFromStorage('profile');
            this._profile = v ? JSON.parse(v) as UserProfile : null;
        }
        return this._profile;
    }

    set profile(value: UserProfile | null) {
        this._profile = value;
        writeToStorage('profile', value ? JSON.stringify(value) : null);
    }

    get state(): Route | null {
        if (!this._state) {
            const v = readFromStorage('state');
            this._state = v ? JSON.parse(v) as Route : null;
        }
        return this._state;
    }

    set state(value: Route | null) {
        this._state = value;
        writeToStorage('state', value ? JSON.stringify(value) : null);
    }


    login(expectedRoute: Route) {
        webAuth.authorize({
            state: btoa(JSON.stringify(expectedRoute)),
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.token = null;
            this.accessToken = null;
            this.expiredAt = -1;
            this.profile = null;
            this.state = null;
            webAuth.logout({
                returnTo: location.origin,
                clientID: config.auth0.clientID,
            });
        });
    }

    isAuthenticated(): boolean {
        return new Date().getTime() < this.expiredAt;
    }

    handleAuthentication(): Promise<any> {
        return new Promise((resolve, reject) => {
            webAuth.parseHash((err, authResult) => {
                if (authResult && authResult.idToken) {
                    this.expiredAt = authResult.expiresIn || 0;
                    this.token = authResult.idToken;
                    this.accessToken = authResult.accessToken || null;
                    this.profile = authResult.idTokenPayload;
                    this.state = authResult.state ? JSON.parse(atob(authResult.state)) : null;
                    resolve();

                } else if (err) {
                    this.logout();
                    reject(err);
                }

            });
        });
    }
}

export default {
    install: function (cVue: typeof Vue, options?: any) {
        cVue.prototype.$auth = new Auth();
    }
};