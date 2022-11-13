import { Component } from '../../utils/component.service'
import { Validator } from '../../utils/validator.service';
import './form.css';
import template from './form.hbs';

interface IForm {
    className?: string,
    className_label?: string,
    label?: string,
    name?: string,
    type?: string,
    validation: string
}

export class Form extends Component {
    static componentName = 'Form';

    constructor({label, validation, ...props}: IForm) {
        const validator = new Validator();

        super({
            ...props,
            label,
            onFocus: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
            onInput: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
        });
    }

    public getName() {
        return (this.element.querySelector('input') as HTMLInputElement).name;
    }

    public getValue() {
        return (this.element.querySelector('input') as HTMLInputElement).value;
    }

    protected render() {
        return this.compile(template, this.props);
    }
}