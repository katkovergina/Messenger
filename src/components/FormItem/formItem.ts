import Components from '../../utils/Components';
import {Validator} from '../../utils/Validator';
import template from './fromItem.hbs';

interface FormItemProps {
    className: string,
    label: string,
    name: string,
    type: string,
    validation: string
    needButton: boolean
    id?: number,
    onSubmit: () => void
}

export class FormItem extends Components<any> {
    static componentName = 'FormItem';

    constructor({label, id, validation, needButton, ...props}: FormItemProps) {
        const validator = new Validator();
        type validationMessageRes = {
            result: boolean,
            message: string
        }
        super({
            ...props,
            label,
            id,
            needButton,
            onFocus: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value) as validationMessageRes;

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value) as validationMessageRes;

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
            onInput: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value) as validationMessageRes;

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
        });
    }

    public getName() {
        return (this.element?.querySelector('input') as HTMLInputElement).name;
    }

    public getValue() {
        return (this.element?.querySelector('input') as HTMLInputElement).value;
    }

    render() {
        return this.compile(template, this.props);
    }
}
