import Components from '../../../utils/Components';
import template from './delete.hbs';
import ChatsController from "../../../controllers/ChatsController";
import {withStore} from "../../../utils/Store";

interface ChatListItemProps {
    chatItem: any,
}

export class DeleteButton extends Components<ChatListItemProps> {
    static componentName = 'DeleteButton';

    constructor({chatItem}: ChatListItemProps) {
        super({
            chatItem,

            events: {
                click: () => {
                    ChatsController.deleteChat(chatItem.id);
                }
            }});
    }

    protected render() {
        return this.compile(template, this.props);
    }
}