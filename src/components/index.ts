import Link from './link';
import Button from './button';
import FormItem from './FormItem';
import Input from './input';
import Error from './error';
import Icon from './icon';
import ProfileItems from './Profile';
import MessageButton from './Chat/MessageButton';
import {ComponentInterface} from '../utils/registerComponent';
import ProfileImage from './ImageProfile';
import ChatList from './Chat/ChatsList';
import ChatUsersDropdown from './Dropdown/ChatUsers';
import ChatListItem from './Chat/chatsListItem';
import ChatMessages from './Chat/chatMessages';

export const components: ComponentInterface<any>[] = [
    Button,
    MessageButton,
    FormItem,
    Icon,
    Link,
    Input,
    Error,
    ProfileItems,
    ProfileImage,
    ChatList,
    ChatUsersDropdown,
    ChatListItem,
    ChatMessages,
];
