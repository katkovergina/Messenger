import { Component } from '../../utils/component.service';
import template from './login.hbs';
import './login.css';

export class Login extends Component {

    constructor() {
        super({
            click: () => {
                const forms = document.querySelectorAll('input');
                forms.forEach(elem => console.log(`${elem.name}:${elem.value}`));
                forms.forEach(elem => elem.value = '');
            }
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}