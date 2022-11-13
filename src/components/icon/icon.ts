import Components from '../../utils/Components';

import template from './icon.hbs';

interface IIcon {
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

export class Icon extends Components {
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
            }: IIcon) {
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

    protected render() {
        return this.compile(template, this.props);
    }
}