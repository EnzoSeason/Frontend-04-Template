export function createElement(type, attributes, ...children) {
    let element;
    if (typeof type === "string") {
        // wrap the native HTML element
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
    let processChildren = children => {
        for (const child of children) {
            if (typeof child === 'object' && child instanceof Array) {
                processChildren(child);
                continue;
            }
            if (typeof child === 'string') {
                const textNode = new TextNodeWrapper(child);
                element.appendChild(textNode); // appendChild must have used mountTo
            } else {
                element.appendChild(child); // appendChild must have used mountTo
            }
        }
    }
    processChildren(children);
    return element;
}

export const STATE = Symbol('state');
export const ATTRIBUTES = Symbol('attributes');
export const ROOT = Symbol('root');

export class Component {
    constructor() {
        this[ATTRIBUTES] = Object.create(null);
        this[STATE] = Object.create(null);
    }
    setAttribute(name, value) {
        this[ATTRIBUTES][name] = value;
    }
    mountTo(parent) {
        // proxy of DOM API: appendChild
        if (!this[ROOT]) {
            this.render();
        }
        parent.appendChild(this[ROOT]);
    }
    appendChild(child) {
        // use proxy: mountTo
        child.mountTo(this[ROOT]);
    }
    render() { 
        return this[ROOT];
    }
    triggerEvent(type, arg) {
        const key = 'on' + type.replace(/^[\s\S]/, s => s.toUpperCase());
        this[ATTRIBUTES][key](new CustomEvent(type, {detail: arg})); 
    }
}
class TextNodeWrapper extends Component{
    constructor(content) {
        super();
        this[ROOT] = document.createTextNode(content);
    }
}

class ElementWrapper extends Component{
    constructor(type){
        super();
        this[ROOT] = document.createElement(type);
    }
}