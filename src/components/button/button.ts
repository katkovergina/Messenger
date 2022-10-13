import { Component } from '../../utils/component.service'

import './button.css'
import template from './button.hbs';

interface IButtonProps {
    title: string;
    onClick?: () => void;
}

export class Button extends Component {
    static componentName = 'Button';

    constructor({onClick, title}: IButtonProps) {
        super({
            title,
            events: {
                click: onClick,
            },
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}