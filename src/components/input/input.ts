import { Component } from '../../utils/component.service'

import './input.css'
import template from './input.hbs';

interface IInput {
    type?: string
    name: string
    placeholder?: string
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
}

export class Input extends Component {
    static componentName = 'Input';

    constructor({onFocus, onBlur, onInput, ...props}: IInput) {
        super({
            ...props,
            events: {
                focus: onFocus,
                blur: onBlur,
                input: onInput,
            },
        })
    }

    protected render() {
        return this.compile(template, this.props);
    }
}