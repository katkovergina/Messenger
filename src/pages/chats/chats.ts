import { Component } from '../../utils/component.service';
import template from './chats.hbs';
import './chats.css';

export class Chats extends Component {

    constructor() {
        super({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}