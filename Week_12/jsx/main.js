function createElement(type, attributes, ...children) {
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

class Wrapper {
    constructor(type, element) {
        if (type === 'element') {
            this.root = document.createElement(element);
        }
        if (type === 'text') {
            this.root = document.createTextNode(element);
        }
    }
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
class TextNodeWrapper extends Wrapper{
    constructor(content) {
        super('text', content);
    }
}

class ElementWrapper extends Wrapper{
    constructor(type){
        super('element', type);
    }
}

class MyDiv extends Wrapper{
    constructor() {
        super('element', 'div');
    }
}

const a = <MyDiv id="a" class="cls">
    <span>Hello</span>
    <br />
    <span>Bonjour</span>
</MyDiv>;

a.mountTo(document.body);