import Components from '../../utils/Components';
import template from './input.hbs';

interface InputProps {
    className: string,
    name: string;
    type?: string;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
}

export class Input extends Components<any> {
    static componentName = 'Input';

    constructor({className, name, type, placeholder, onFocus, onBlur, onInput, ...props}: InputProps) {
        super({
            ...props,
            className,
            name,
            type,
            placeholder,
            events: {
                focus: onFocus,
                blur: onBlur,
                input: onInput,
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
