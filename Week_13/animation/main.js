import { Timeline, Animation } from './tools/animation.js';
import bezier from './tools/cubic-bezier.js';

let tl = new Timeline(); 
let animation = new Animation(
    document.querySelector('#el').style,
    "transform",
     0, 500, 2000, 1000,
     bezier(.25,.1,.25,1), v => `translateX(${v}px)`
);

document.querySelector('#el').addEventListener('mouseover', () => tl.pause());
document.querySelector('#el').addEventListener('mouseout', () => tl.resume());

tl.start();
tl.add(animation);