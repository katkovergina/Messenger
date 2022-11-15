import Components from '../../utils/Components';
import template from './button.hbs';

interface ButtonProps {
    label: string;
    className: string;
    type?: string;
    onClick?: () => void;
}

export class Button extends Components<ButtonProps> {
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

    protected render() {
        return this.compile(template, this.props);
    }
}
