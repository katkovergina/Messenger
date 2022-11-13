import { Component } from '../../utils/component.service'
import { WithRouterProps } from 'utils/Router.service';
import template from './link.hbs';

interface ILinkProps extends WithRouterProps {
    to: string;
    className: string;
    text: string;
}

export class Link extends Component {
    static componentName = 'Link';

    constructor({to, className, text}: ILinkProps) {
        super({
            text,
            to,
            className,
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();
                    // @ts-ignore
                    router.go(this.props.to);
                },
            },
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}