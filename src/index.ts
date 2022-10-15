import './styles/style.css'

import { components } from './components';
import { registerComponent } from './utils/register-сomponent.service';

import  Chats  from './pages/chats';
import  Error404  from './pages/errors/404';
import  Error500  from './pages/errors/500';
import  Login  from './pages/login';
import  Settings  from './pages/settings';
import  SignUp  from './pages/sign-up';
import  StartPage  from './pages/start-page';

components.forEach((component) => {
    registerComponent(component.componentName, component);
});

window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');

    const path = window.location.pathname;

    let homePage;
    switch (path) {
        case '/':
            homePage = new StartPage();
            break;
        case '/authorization':
            homePage = new Login();
            break;
        case '/profile':
            homePage = new Settings();
            break;
        case '/registration':
            homePage = new SignUp();
            break;
        case '/chats':
            homePage = new Chats();
            break;
        case '/500':
            homePage = new Error500();
            break;
        case '/404':
        default:
            homePage = new Error404();
            break;
    }

    root?.append(homePage.getContent());
});