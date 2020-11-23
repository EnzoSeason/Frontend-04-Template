import { Timeline, Animation } from './tools/animation.js';

let tl = new Timeline(); 
let animation = new Animation(
    document.querySelector('#el').style,
    "transform",
     0, 500, 2000,
     null, v => `translateX(${v}px)`
);

document.querySelector('#el').addEventListener('mouseover', () => tl.pause());
document.querySelector('#el').addEventListener('mouseout', () => tl.resume());

tl.start();
setTimeout(() => {
    tl.add(animation);
}, 1000);