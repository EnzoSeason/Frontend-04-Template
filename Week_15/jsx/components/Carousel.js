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
        this.frameTime = 1500;
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
        this.enableTapStart();
        this.enableTapEnd();
        this.enablePressEnd();
        this.enablePanMove();
        this.enablePanEnd();

        // enable autoplay
        this.timeline.start();
        this.autoPlay();
    }

    enableTapStart() {
        this.root.addEventListener('tapstart', event => {
            this.timeline.pause();
        });
    }

    enableTapEnd() {
        this.root.addEventListener('tapend', event => {
            this.timeline.resume();
        });
    }

    enablePressEnd() {
        this.root.addEventListener('pressend', event => {
            this.timeline.resume();
        });
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
            
            this.timeline.resume();
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

            let currentAnimation = new Animation(
                current.style, 'transform',
                - this.currentIdx * vw, - vw - this.currentIdx * vw,
                this.frameTime, 0, ease, v => `translateX(${v}px)`
            );
            let nextAnimation = new Animation(
                next.style, 'transform',
                vw - nextIdx * vw, - nextIdx * vw,
                this.frameTime, 0, ease, v => `translateX(${v}px)`
            );
            this.timeline.add(currentAnimation);
            this.timeline.add(nextAnimation);
            
            this.currentIdx = nextIdx;
        }, 1000);
    }

}

export default Carousel;