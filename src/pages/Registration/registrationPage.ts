import Components from '../../utils/Components';
import template from './registration.hbs';
import './registration.css';
import FormItem from '../../components/FormItem';
import AuthController from '../../controllers/AuthController';

export class RegistrationPage extends Components {
    constructor() {
        super({
            events: {
                submit: (e: Event) => {
                    e.preventDefault()
                    const values = Object
                        .values(this.children)
                        .filter(child => child instanceof FormItem)
                        .map((child) => ([(child as FormItem).getName(), (child as FormItem).getValue()]));
    
                    const data = Object.fromEntries(values);
    
                    AuthController.signup(data);
                },
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
