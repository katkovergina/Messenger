/* eslint-disable no-unused-vars */
import { EventBus } from './event-bus.service';
import { nanoid } from 'nanoid';

export class Component {
    public static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
        FLOW_ADD_EVENTS: 'flow:add-events',
    } as const;

    public id = nanoid(6);
    public children: Record<string, Component>;
    public refs: Record<string, Component> = {};
    public props: Record<string, any>;

    public element: HTMLElement | null = null;
    private _meta: { props: any };
    private _eventBus: () => EventBus;

    static componentName: string | undefined;

    constructor(propsAndChildren: object = {}) {
        const eventBus = new EventBus();
        const {children, props} = this._getChildren(propsAndChildren);

        this.children = children;

        this._meta = {
            props,
        };

        this.props = this._makePropsProxy(props);

        this._eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Component.EVENTS.INIT);
    }

    public compile(template: (context: any) => string, context: any) {
        const html = template({...context, children: this.children, refs: this.refs});

        const tempFragment = document.createElement('template');

        tempFragment.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            const stub = tempFragment.content.querySelector(`[data-id="id-${component.id}"]`);

            if (!stub) {
                return;
            }

            const content = component.getContent()!;

            stub.replaceWith(content);

            if (stub.childNodes.length) {
                content.append(...stub.childNodes);
            }
        });

        return tempFragment.content;
    }

    public getContent() {
        return this.element;
    }

    protected componentDidMount() {
        return true;
    }

    protected dispatchComponentDidMount() {
        this._eventBus().emit(Component.EVENTS.FLOW_CDM);
    }

    protected componentDidUpdate(oldProps, newProps) {
        return JSON.stringify(oldProps) === JSON.stringify(newProps);
    }

    public setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    private _init() {
        this.init();
        this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
        this._eventBus().emit(Component.EVENTS.FLOW_ADD_EVENTS);
    }

    public init(): void {}

    private _render() {
        const fragment = this.render();

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this.element) {
            this._removeEvents();
            this.element.replaceWith(newElement);
        }

        this.element = newElement;

        this._addEvents();
    }

    private get Element() {
        return this.element;
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Component.EVENTS.FLOW_ADD_EVENTS, this._addEvents.bind(this));
    }

    private _getChildren(propsAndChildren) {
        const children: Record<string, Component> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Component) {
                children[key as string] = value;
            } else if (Array.isArray(value) && value.every(value => (value instanceof Component))) {
                children[key] = value;
            }
             else {
                props[key] = value;
            }
        });

        return {children: children as Record<any, Component>, props};
    }

    private _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    private _componentDidUpdate(oldProps: any, newProps: any) {
        if (!this.componentDidUpdate(oldProps, newProps)) {
            this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    private _makePropsProxy(props: Record<string, any>) {
        const self = this;

        return new Proxy(props, {
            get(target: Record<string, any>, p: string) {
                const value = target[p];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, any>, p: string, value) {
                const oldProps = {...target};
                target[p] = value;

                self._eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }

    private _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach((eventName) => {
            this.element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events || !this.element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this.element!.removeEventListener(event, listener);
        });
    }
}