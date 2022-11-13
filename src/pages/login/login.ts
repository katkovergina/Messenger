import { Component } from '../../utils/component.service';
import template from './login.hbs';
import './login.css';
import Form from '../../components/form'
import AuthController from '../../controllers/auth.controller';

export class Login extends Component {

    constructor() {
        super({
            onSubmit: () => {
                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof Form)
                    .map((child) => ([(child as Form).getName(), (child as Form).getValue()]));

                const data = Object.fromEntries(values);

                AuthController.signin(data);
            },
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}