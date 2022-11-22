import Components from '../../utils/Components';
import template from './authorization.hbs';
import './authorization.css';
import FormItem from '../../components/FormItem';
import AuthController from '../../controllers/AuthController';

export class AuthorizationPage extends Components {

    constructor() {
        super({
            events: {
            submit: (e: Event) => {
                e.preventDefault()
                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof FormItem)
                    .map((child) => ([child.props.name, (child as FormItem).getValue()]));
                const data = Object.fromEntries(values);
                AuthController.signin(data);
            },
        },
    })
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
