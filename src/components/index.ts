import Link from './Link';
import Button from './Button';
import FormItem from './FormItem';
import Input from './Input';
import Error from './Error';
import Icon from './Icon';
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
