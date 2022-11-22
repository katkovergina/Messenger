import Components from '../../../utils/Components';
import template from './messageButton.hbs';

interface MessageButtonProps {
    label: string;
    className: string;
    onClick?: () => void;
}

export class MessageButton extends Components<any> {
    static componentName = 'MessageButton';

    constructor({onClick, label, className}: MessageButtonProps) {
        super({
            label,
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
