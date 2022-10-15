import { Component } from '../../utils/component.service'

import './info-item.css'
import template from './info-item.hbs';

interface IInfoItem {
    nameField: string
    fieldValue: string
}

export class InfoItem extends Component {
    static componentName = 'InfoItem';

    constructor({ nameField, fieldValue }: IInfoItem) {
        super({
            nameField, 
            fieldValue
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}