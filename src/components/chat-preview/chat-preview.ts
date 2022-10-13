import { Component } from '../../utils/component.service'

import './chat-preview.css'
import template from './chat-preview.hbs';

interface IChatPreview {
    avatar: string
    chatName: string
    message: string
    time: Date
}

export class ChatPreview extends Component {
    static componentName = 'ChatPreview';

    constructor({avatar, chatName,  message, time}: IChatPreview) {
        super({
            avatar, 
            chatName,  
            message, 
            time
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}