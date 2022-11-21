import Components from '../../../utils/Components';
import template from './delete.hbs';
import ChatsController from "../../../controllers/ChatsController";

interface ChatListItemProps {
    chatItem: any,
}

export class DeleteButton extends Components<any> {
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

    render() {
        return this.compile(template, this.props);
    }
}
