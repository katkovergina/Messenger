import { Component } from '../../utils/component.service';
import template from './sign-up.hbs';
import './sign-up.css';

export class SignUp extends Component{
    constructor() {
        super({
            click: () => {
                const forms = document.querySelectorAll('input')
                forms.forEach(elem => console.log(elem.value))
            }
        })
    }
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}