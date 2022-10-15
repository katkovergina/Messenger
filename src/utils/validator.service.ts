/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
export enum ValidationType {
    FIRST_NAME = 'first_name',
    SECOND_NAME = 'second_name',
    LOGIN = 'login',
    PASSWORD = 'password',
    EMAIL = 'email',
    PHONE = 'phone',
    MESSAGE = 'message'
}

export type MessageRes = {
    result: boolean, 
    message: string 
}

export class Validator {
    public validate(type: string, value: string): MessageRes {
        const isEmptyString = this.isEmpty(value);

        if (isEmptyString) {
            return this.message(value);
        }

        switch (type) {
            case ValidationType.EMAIL:
                return this.email(value);
            case ValidationType.LOGIN:
                return this.login(value);
            case ValidationType.FIRST_NAME:
            case ValidationType.SECOND_NAME:
                return this.name(value);
            case ValidationType.PASSWORD:
                return this.password(value);
            case ValidationType.PHONE:
                return this.phone(value);
            case ValidationType.MESSAGE:
                return this.message(value);
            default:
                return {
                    result: true,
                    message: '',
                };
        }
    }

    private name(value: string): MessageRes {
        const regular = /^[A-ZА-ЯЁ][a-zа-яё-]*$/g;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Латиница, первая букава заглавная, без цифр и специальных символов',
        };
    }

    private login(value: string): MessageRes {
        const regular = /^(?!\d+$)[\da-zA-Z_-]{3,20}$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Допустим набор из букв и цифр (латиница), размер от 3 до 20 символов',
        };
    }

    private password(value: string): MessageRes {
        const regular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Пароль должен содержать от 8 до 40 символов, а также содержать хотя бы одну заглавную букву или цифру',
        };
    }

    private email(value: string): MessageRes {
        const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'Email должен быть формата name@mail.com',
        };
    }

    private phone(value: string): MessageRes {
        const regular = /^((\+7|7|8)+([0-9]){10,15})$/;

        const result = regular.test(value);

        return {
            result: result,
            message: 'От 10 до 15 символов, состоит из цифр, может начинаться с плюса',
        };
    }

    private message(value: string): MessageRes {
        return {
            result: this.isNotEmpty(value),
            message: 'Сообщение не может быть пустым',
        };
    }

    private isEmpty(value: string): boolean {
        const regular = /^\s*$/;

        return regular.test(value);
    }

    private isNotEmpty(value: string): boolean {
        return !this.isEmpty(value);
    }
}