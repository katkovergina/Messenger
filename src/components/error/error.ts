import { Component } from '../../utils/component.service'

import template from './error.hbs';

export class Error extends Component {
    static componentName = 'Error';

    protected render() {

        return this.compile(template, this.props);
    }
}