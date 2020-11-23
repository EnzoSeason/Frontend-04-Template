function createElement(type, attributes, ...children) {
    let element = document.createElement(type);
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
    for (const child of children) {
        if (typeof child === 'string') {
            const textNode = document.createTextNode(child);
            element.appendChild(textNode);
        } else {
            element.appendChild(child);
        }
    }
    return element;
}

const a = <div id="a" class="cls">
    <span>Hello world</span>
    <span></span>
</div>;

document.body.appendChild(a);