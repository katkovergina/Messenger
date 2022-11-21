import Components from '../../utils/Components';
import template from './button.hbs';

interface ButtonProps {
    label: string;
    className: string;
    type?: string;
    onClick?: () => void;
}

export class Button extends Components<any> {
    static componentName = 'Button';

    constructor({onClick, label, type, className}: ButtonProps) {
        super({
            label,
            type,
            className,
            events: {
                click: onClick,
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
