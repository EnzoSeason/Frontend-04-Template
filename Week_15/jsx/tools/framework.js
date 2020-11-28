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
    for (const child of children) {
        if (typeof child === 'string') {
            const textNode = new TextNodeWrapper(child);
            element.appendChild(textNode); // appendChild must have used mountTo
        } else {
            element.appendChild(child); // appendChild must have used mountTo
        }
    }
    return element;
}

export class Component {
    mountTo(parent) {
        // proxy of DOM API: appendChild
        parent.appendChild(this.root);
    }
    appendChild(child) {
        // use proxy: mountTo
        child.mountTo(this.root);
    }
    setAttribute(name, value) {
        // DOM API
        this.root.setAttribute(name, value);
    }
}
class TextNodeWrapper extends Component{
    constructor(content) {
        super();
        this.root = document.createTextNode(content);
    }
}

class ElementWrapper extends Component{
    constructor(type){
        super();
        this.root = document.createElement(type);
    }
}