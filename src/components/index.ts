import Link from './link';
import Button from './button';
import FormItem from './FormItem';
import Input from './input';
import Error from './error';
import Icon from './icon';
import DeleteButton from './Chat/DeleteButton'
import ProfileItems from './Profile';
import MessageButton from './Chat/MessageButton';
import {ComponentInterface} from '../utils/registerComponent';
import ProfileImage from './ImageProfile';
import ChatList from './Chat/ChatsList';
import ChatUsersDropdown from './Dropdown/ChatUsers';
import ChatListItem from './Chat/ChatsListItem';
import ChatMessages from './Chat/ChatMessages';

export const components: ComponentInterface<any>[] = [
    Button,
    MessageButton,
    FormItem,
    Icon,
    //@ts-ignore
    Link,
    Input,
    Error,
    ProfileItems,
    DeleteButton,
    ProfileImage,
    ChatList,
    ChatUsersDropdown,
    ChatListItem,
    //@ts-ignore
    ChatMessages,
];
