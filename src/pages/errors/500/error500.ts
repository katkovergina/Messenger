import { Component } from '../../../utils/component.service';
import template from './500.hbs';
import '../errors.css';

export class Error500 extends Component {

    constructor() {
        super({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}