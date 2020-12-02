import { Component } from '../tools/framework';
import { enableGesture } from '../tools/gesture-package';
import { Timeline, Animation } from '../tools/animation';
import { ease } from '../tools/cubic-bezier';
class Carousel extends Component {
    constructor() {
        super();
        this.currentIdx = 0;
        this.timeline = new Timeline();
        this.intervalDuration = 1500;
        this.animationDuration = 500;
        this.animationTime = 0;
        this.animationDX = 0;
        this.animationHandler = null;
    }
    
    render() {
        this.root = document.createElement('div');
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
        this.enablePanMove();
        this.enableAllEnd();

        // enable autoplay
        this.timeline.start();
        this.autoPlay();
    }

    enableTapStart() {
        this.root.addEventListener('tapstart', event => {
            this.timeline.pause();
            clearInterval(this.animationHandler);

            let vw = this.root.getBoundingClientRect()['width'];
            let progress = (Date.now() - this.animationTime) / this.animationDuration;
            this.animationDX = ease(progress) * vw - vw ; 
        });
    }

    enablePanMove() {
        this.root.addEventListener('panmove', event => {
            let children = this.root.children;
            let vw = this.root.getBoundingClientRect()['width'];

            let x = event.clientX - event.startX - this.animationDX;
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

    enableAllEnd() {
        this.root.addEventListener('allend', event => {
            let children = this.root.children;
            let vw = this.root.getBoundingClientRect()['width'];
            // restart timeline
            this.timeline.reset();
            this.timeline.start();
            this.autoPlay();

            let x = event.clientX - event.startX - this.animationDX;
            let currentIdx = this.currentIdx - (x - (x % vw) )/ vw; // round down
            let direction = Math.round((x % vw) / vw);
            
            for (let offset of [-1, 0, 1]) { 
                let nextIdx = currentIdx + offset;
                nextIdx = (nextIdx % children.length + children.length) % children.length;
                
                // children[nextIdx].style.transition = 'none';
                // children[nextIdx].style.transform = `translateX(${ - (nextIdx - offset) * vw + x % vw}px)`;

                let animation = new Animation(
                    children[nextIdx].style, 'transform',
                    - (nextIdx - offset) * vw + x % vw,  
                    - (nextIdx - offset) * vw + direction * vw ,
                    this.animationDuration, 0, ease, v => `translateX(${v}px)`
                );
                this.timeline.add(animation);
            }

            this.currentIdx = this.currentIdx - (x - (x % vw) )/ vw - direction;
            this.currentIdx = (this.currentIdx % children.length + children.length) % children.length;
        });
    }

    autoPlay() {
        this.animationHandler = setInterval(() => {
            let children = this.root.children;
            let vw = this.root.getBoundingClientRect()['width'];
            // get current img and next img
            let nextIdx = (this.currentIdx + 1) % children.length;
            let current = children[this.currentIdx];
            let next = children[nextIdx];
    
            let currentAnimation = new Animation(
                current.style, 'transform',
                - this.currentIdx * vw, - vw - this.currentIdx * vw,
                this.animationDuration, 0, ease, v => `translateX(${v}px)`
            );
            let nextAnimation = new Animation(
                next.style, 'transform',
                vw - nextIdx * vw, - nextIdx * vw,
                this.animationDuration, 0, ease, v => `translateX(${v}px)`
            );
    
            this.animationTime = Date.now();
            this.timeline.add(currentAnimation);
            this.timeline.add(nextAnimation);
            
            this.currentIdx = nextIdx;
        }, this.intervalDuration);
    }

}

export default Carousel;