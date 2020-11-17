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
        this.root = document.createElement('div');
        this.render();
        parent.appendChild(this.root);
    }
    render() {
        this.root.classList.add('carousel'); 
        // add images
        for(let imgUrl of this.attributes['src']) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${imgUrl}')`;
            this.root.appendChild(child);
        }
        this.autoPlay();

    }

    autoPlay() {
        let currentIdx = 0;
        setInterval(() => {
            let children = this.root.children;
            // get current img and next img
            let nextIdx = (currentIdx + 1) % children.length;
            let current = children[currentIdx];
            let next = children[nextIdx];
            // prepare for the position of next img
            next.style.transition = 'none';
            next.style.transform = `translateX(${100 - nextIdx * 100}%)`; // move to the right of current img
            // move to next img
            setTimeout(()=>{
                next.style.transition = '';
                current.style.transform = `translateX(${- 100 - currentIdx * 100}%)`;
                next.style.transform = `translateX(${- nextIdx * 100}%)`;
                currentIdx = nextIdx;
            }, 16); // 16ms is the time for a frame in browser
        }, 3000);
    }

}
const images = [
    "./asset/img/1.jpg",
    "./asset/img/2.jpg",
    "./asset/img/3.jpg"
]
const a = <Carousel  src={images} />;

a.mountTo(document.body);