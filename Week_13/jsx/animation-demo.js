import { Timeline, Animation } from './tools/animation.js';

let tl = new Timeline();
let animation = new Animation(
    {set a(v) {console.log(v)}},"a",0,100,1000,null
);

window.tl = tl;
window.animation = animation;

tl.start();