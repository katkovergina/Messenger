import Components from '../../utils/Components';

import template from './icon.hbs';

interface IconProps {
    width: string
    height: string
    viewBox: string
    className?: string
    dPath?: string
    stroke?: string
    fill?: string
    strokeLinejoin?: string
    cx?: string
    cy?: string
    r?: string
    strokeCircle?: string
}

export class Icon extends Components<IconProps> {
    static componentName = 'Icon';

    constructor({ width,
                height,
                viewBox,
                className,
                dPath,
                stroke,
                fill,
                strokeLinejoin,
                cx,
                cy,
                r,
                strokeCircle
            }: IconProps) {
        super({
            width,
            height,
            viewBox,
            className,
            dPath,
            stroke,
            fill,
            strokeLinejoin,
            cx,
            cy,
            r,
            strokeCircle
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
