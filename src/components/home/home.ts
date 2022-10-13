import { Component } from '../../utils/component.service'

import './home.css'
import template from './home.hbs';

interface IHome {
    text: string
}

export class Home extends Component {
    static componentName = 'Home';

    constructor({text}: IHome) {
        super({
            text
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}