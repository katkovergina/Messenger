import { Component } from '../../utils/component.service';
import template from './start-page.hbs';
import './start-page.css';

export class StartPage extends Component {

    constructor() {
        super({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}