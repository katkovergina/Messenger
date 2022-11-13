import API, {AuthAPI, SignInData, SignUpData} from '../API/auth.api';
import store from '../utils/store.service';
import router from '../utils/Router.service';

export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SignInData) {
        try {
            await this.api.signin(data);

            await this.fetchUser();

            router.go('/messenger');
        } catch (e: any) {
            console.error(`ашипка${e}`);
        }
    }

    async signup(data: SignUpData) {
        try {
            await this.api.signup(data);

            await this.fetchUser();

            router.go('/messenger');
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async fetchUser() {
        const user = await this.api.read();

        store.set('user', user);
    }

    async logout() {
        try {
            await this.api.logout();

            router.go('/');
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new AuthController();