import './styles/style.css'

import { components } from './components';
import { registerComponent } from './utils/register-сomponent.service';

import  Chats  from './pages/chats';
import  Error404  from './pages/errors/404';
import  Error500  from './pages/errors/500';
import  Login  from './pages/login';
import  Settings  from './pages/settings';
import  SignUp  from './pages/sign-up';
import  router from './utils/Router.service'
import  AuthController from './controllers/auth.controller';

window.addEventListener('DOMContentLoaded', async () => {
    components.forEach((component) => {
        registerComponent(component.componentName, component);
    });

    router
        .use('/', Login)
        .use('/sign-up', SignUp)
        .use('/messenger', Chats)
        .use('/settings', Settings)
        .use('/500', Error500)
        .use('/404', Error404)

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case '/':
        case '/sign-up':
            isProtectedRoute = false;
            break;
    }

    try {
       await AuthController.fetchUser();

        router.start();

        if (!isProtectedRoute) {
            router.go('/messenger');
        }
    } catch (e) {
        router.start();

        if (isProtectedRoute) {
            router.go('/');
        }
    }
});