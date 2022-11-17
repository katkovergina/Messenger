import Components from '../../utils/Components';
import template from './chat.hbs';
import './chat.less';
import {withStore} from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';
import FormItem from '../../components/FormItem';

export default class ChatPageBase extends Components {
    constructor() {
        super({
            events: {
                submit: (e: Event) => {
                    e.preventDefault()
                    if(e.target == document.getElementById('3')) {
                        const values = Object
                        .values(this.children)
                        .filter(child => child instanceof FormItem)
                        .filter(child => child.element?.attributes.hasOwnProperty('chats_create'))
                        .map((child) => ([(child as FormItem).getName(), (child as FormItem).getValue()]));
                        const overlay = document.querySelector('#overlay-modal');
                        const modalElem = document.querySelector('.modal[data-modal="chats_create"]');
                        const data = Object.fromEntries(values);
                        ChatsController.createChat(data);
                        modalElem?.classList.remove('active');
                        overlay?.classList.remove('active');
                    }
                }
            },
            clickCreateChat: (e: PointerEvent) => {
                e.preventDefault();
                console.log('chat-create');

                const overlay = document.querySelector('#overlay-modal');
                const modalElem = document.querySelector('.modal[data-modal="chats_create"]');

                modalElem.classList.add('active');
                overlay.classList.add('active');

                overlay.addEventListener('click', (e) => {
                    modalElem.classList.remove('active');
                    overlay.classList.remove('active');
                });
            },
            sendCreateUser: () => {
                console.log('create user');

                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof FormItem)
                    .filter(child => child.element?.attributes.hasOwnProperty('chats_user_create'))
                    .map((child) => ([(child as FormItem).getName(), (child as FormItem).getValue()]));

                console.log(values);

                const data = Object.fromEntries(values);

                ChatsController.addUserInChat(data, this.props.selectedChatId);
            },
            sendDeleteUser: () => {
                console.log('delete user');

                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof FormItem)
                    .filter(child => child.element?.className.match('chats_user_remove'))
                    .map((child) => ([(child as FormItem).getName(), (child as FormItem).getValue()]));

                console.log(values);

                const data = Object.fromEntries(values);

                console.log(data);

                ChatsController.removeUserInChat(data);
            },
        });
    }

    init() {
        ChatsController.fetchChats();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withChatPage = withStore((state) => (state));

export const ChatPage = withChatPage(ChatPageBase);
