import { Component, createElement } from './framework.js';
class Carousel extends Component {
    constructor() {
        super();
        this.attributes = {};
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
    render() {
        this.root = document.createElement('div');
        
        for(let imgUrl of this.attributes['src']) {
            let child = document.createElement('img');
            child.src = imgUrl;
            this.root.appendChild(child);
        }

        return this.root;
    }

}
const images = [
    "https://static001.geekbang.org/resource/image/0f/ed/0fdee52b3fee2f16558df1da46a6d7ed.jpg",
    "https://static001.geekbang.org/resource/image/73/2a/737fb9f94c18a26a875c27169222b82a.jpg",
    "https://static001.geekbang.org/resource/image/51/c0/5196d9fb7fcbbfb43450624045ae81c0.jpg"
]
const a = <Carousel  src={images} />;

a.mountTo(document.body);