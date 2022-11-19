import template from './link.hbs';
import {WithRouterProps} from '../../utils/Router';
import Components from '../../utils/Components';

interface LinkProps extends WithRouterProps {
    to: string;
    className: string;
    text: string;
}

export class Link extends Components<LinkProps> {
    static componentName = 'Link';

    constructor({to, className, text, router}: LinkProps) {
        super({
            to,
            className,
            text,
            events: {
                click: (e: MouseEvent) => {
                    e.preventDefault();

                    router.go(this.props.to);
                },
            },
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
