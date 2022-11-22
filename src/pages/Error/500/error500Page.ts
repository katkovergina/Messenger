import Components from '../../../utils/Components';
import template from './error.hbs';

export class Error500Page extends Components {
    render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}
