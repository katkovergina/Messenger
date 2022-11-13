import Components from '../../../utils/Components';
import template from './error.hbs';

export class Error500Page extends Components {
    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}
