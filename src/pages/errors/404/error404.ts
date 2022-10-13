import { Component } from '../../../utils/component.service';
import template from './404.hbs';
import '../errors.css';

export class Error404 extends Component {
    
    constructor() {
        super({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}