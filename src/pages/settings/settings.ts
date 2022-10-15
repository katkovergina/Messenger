import { Component } from '../../utils/component.service';
import template from './settings.hbs';
import './settings.css';

export class Settings extends Component {

    constructor() {
        super({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}