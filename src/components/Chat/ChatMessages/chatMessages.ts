import template from './chatMessages.hbs';
import {withStore} from '../../../utils/Store';
import MessagesController from '../../../controllers/MessagesController';
import Components from '../../../utils/Components';
import {Validator} from "../../../utils/Validator";

interface ChatMessagesProps {
    chatId: number;
}

class ChatMessagesBase extends Components<any> {
    static componentName = 'ChatMessages';

    constructor({chatId}: ChatMessagesProps) {
        super({
            chatId,
            events: {
                submit: (e: Event) => {

                    e.preventDefault()
                    type validationMessageRes = {
                        result: boolean,
                        message: string
                    }

                    if (e.target == document.querySelector('form.footer-item__message')) {
                        const input = document.querySelector('.message-block__input') as HTMLInputElement;
                        const message = input?.value;
                        const selectedChatId = this.props.chatId;
                        const validator = new Validator();
                        const validationMessage: validationMessageRes =
                        validator.isMessage(message) as validationMessageRes;
                        if (selectedChatId || validationMessage.result === true) {
                            MessagesController.sendMessage(selectedChatId, message);
                        }
                    }

                },
            }

        });
    }

    init() {
        this.setProps({
            messages: this.createMessages(this.props)
        });
    }

    private createMessages(props: any) {
        if (!props.messages || Object.entries(props.messages).length === 0) {
            return {};
        }

        return props.messages.map((data: typeof props) => {
            return {...data, isMine: props.userId === data.user_id};
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

const withChatMessages = withStore((state: any) => {
    const selectedChatId = state.selectedChatId;

    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            userId: state.user?.id
        };
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user?.id
    };
});

//@ts-ignore
export const ChatMessages = withChatMessages(ChatMessagesBase);
