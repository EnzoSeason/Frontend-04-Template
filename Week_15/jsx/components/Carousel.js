import { Component } from '../tools/framework';
import { enableGesture } from '../tools/gesture-package';
import { Timeline, Animation } from '../tools/animation';
import { ease } from '../tools/cubic-bezier';
class Carousel extends Component {
    constructor() {
        super();
        this.attributes = {};
        this.currentIdx = 0;
        this.timeline = new Timeline();
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
        // enable gestures
        enableGesture(this.root);
        this.enablePanMove();
        this.enablePanEnd();

        // enable autoplay
        this.timeline.start();
        this.autoPlay();
    }

    enablePanMove() {
        this.root.addEventListener('panmove', event => {
            let children = this.root.children;
            let vw = this.root.getBoundingClientRect()['width'];

            let x = event.clientX - event.startX;
            let currentIdx = this.currentIdx - (x - (x % vw) )/ vw; // round down
                
            // move images, the tail is connected to the head
            // only move the images next to the current one
            for (let offset of [-1, 0, 1]) { 
                let nextIdx = currentIdx + offset;
                nextIdx = (nextIdx % children.length + children.length) % children.length;
                
                children[nextIdx].style.transition = 'none';
                children[nextIdx].style.transform = `translateX(${ - (nextIdx - offset) * vw + x % vw}px)`;
            }
        });
    }

    enablePanEnd() {
        this.root.addEventListener('panend', event => {
            let children = this.root.children;
            let vw = this.root.getBoundingClientRect()['width'];
            
            let x = event.clientX - event.startX;
            let currentIdx = this.currentIdx - Math.round(x / vw); // to the nearest whole number
            
            const next = Math.sign(x - vw / 2 * Math.sign(x));
            for (let offset of [0, next]) { 
                let nextIdx = currentIdx + offset;
                nextIdx = (nextIdx + children.length) % children.length;
                
                children[nextIdx].style.transition = '';
                children[nextIdx].style.transform = `translateX(${ - (nextIdx - offset) * vw}px)`;
            }

            this.currentIdx = (currentIdx + children.length) % children.length;
        });
    }

    autoPlay() {
        setInterval(() => {
            let children = this.root.children;
            let vw = this.root.getBoundingClientRect()['width'];
            // get current img and next img
            let nextIdx = (this.currentIdx + 1) % children.length;
            let current = children[this.currentIdx];
            let next = children[nextIdx];
            // prepare for the position of next img
            next.style.transition = 'none';
            next.style.transform = `translateX(${vw - nextIdx * vw}px)`; // move to the right of current img
            // move to next img
            setTimeout(()=>{
                next.style.transition = '';
                current.style.transform = `translateX(${- vw - this.currentIdx * vw}px)`;
                next.style.transform = `translateX(${- nextIdx * vw}px)`;
                this.currentIdx = nextIdx;
            }, 16); // 16ms is the time for a frame in browser
        }, 1000);
    }

}

export default Carousel;