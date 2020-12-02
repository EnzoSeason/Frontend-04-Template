import { Component } from '../tools/framework';
import { enableGesture } from '../tools/gesture-package';
import { Timeline, Animation } from '../tools/animation';
import { ease } from '../tools/cubic-bezier';

const TIMELINE = Symbol('timeline');
const ANIMATION_T = Symbol('animation-time');
const ANIMATION_DX = Symbol('animation-dx');
const AUTOPLAY_HANDLER = Symbol('autoplay-handler');

class Carousel extends Component {
    constructor() {
        super();
        this.currentIdx = 0;
        this[TIMELINE] = new Timeline();
        this.intervalDuration = 3000;
        this.animationDuration = 500;
        this[ANIMATION_T] = 0;
        this[ANIMATION_DX] = 0;
        this[AUTOPLAY_HANDLER] = null;
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
        this[TIMELINE].start();
        this.autoPlay();
    }

    enableTapStart() {
        this.root.addEventListener('tapstart', event => {
            this[TIMELINE].pause();
            clearInterval(this[AUTOPLAY_HANDLER]);

            let vw = this.root.getBoundingClientRect()['width'];
            let progress = (Date.now() - this[ANIMATION_T]) / this.animationDuration;
            if (Date.now() - this[ANIMATION_T] < this.animationDuration) { 
                // while the image is moving, animation causes dx.
                this[ANIMATION_DX] = ease(progress) * vw - vw ; 
            } else {
                // while the image is still, no dx.
                this[ANIMATION_DX] = 0;
            }
        });
    }

    enablePanMove() {
        this.root.addEventListener('panmove', event => {
            let children = this.root.children;
            let vw = this.root.getBoundingClientRect()['width'];

            let x = event.clientX - event.startX - this[ANIMATION_DX];
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
            this[TIMELINE].reset();
            this[TIMELINE].start();
            this.autoPlay();

            let x = event.clientX - event.startX - this[ANIMATION_DX];
            let currentIdx = this.currentIdx - (x - (x % vw) )/ vw; // round down
            let direction = Math.round((x % vw) / vw);
            
            for (let offset of [-1, 0, 1]) { 
                let nextIdx = currentIdx + offset;
                nextIdx = (nextIdx % children.length + children.length) % children.length;
                // animation for moving to the next image
                let animation = new Animation(
                    children[nextIdx].style, 'transform',
                    - (nextIdx - offset) * vw + x % vw,  
                    - (nextIdx - offset) * vw + direction * vw ,
                    this.animationDuration, 0, ease, v => `translateX(${v}px)`
                );
                this[TIMELINE].add(animation);
            }

            this.currentIdx = this.currentIdx - (x - (x % vw))/ vw - direction;
            this.currentIdx = (this.currentIdx % children.length + children.length) % children.length;
        });
    }

    autoPlay() {
        this[AUTOPLAY_HANDLER] = setInterval(() => {
            let children = this.root.children;
            let vw = this.root.getBoundingClientRect()['width'];
            // get current img and next img
            let nextIdx = (this.currentIdx + 1) % children.length;
            let current = children[this.currentIdx];
            let next = children[nextIdx];
            // animation for current image
            let currentAnimation = new Animation(
                current.style, 'transform',
                - this.currentIdx * vw, - vw - this.currentIdx * vw,
                this.animationDuration, 0, ease, v => `translateX(${v}px)`
            );
            // animation for next image
            let nextAnimation = new Animation(
                next.style, 'transform',
                vw - nextIdx * vw, - nextIdx * vw,
                this.animationDuration, 0, ease, v => `translateX(${v}px)`
            );
    
            this[ANIMATION_T] = Date.now();
            this[TIMELINE].add(currentAnimation);
            this[TIMELINE].add(nextAnimation);
            
            this.currentIdx = nextIdx;
        }, this.intervalDuration);
    }

}

export default Carousel;