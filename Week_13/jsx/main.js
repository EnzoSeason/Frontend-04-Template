import { Component, createElement } from './framework.js';
import Carousel from './components/Carousel';
import { Timeline, Animation } from './animation.js';

const images = [
    "./asset/img/1.jpg",
    "./asset/img/2.jpg",
    "./asset/img/3.jpg"
]
const a = <Carousel  src={images} />;

a.mountTo(document.body);

let tl = new Timeline();
let animation = new Animation(
    {set a(v) {console.log(v)}},"a",0,100,1000,null
);
tl.add(animation);
tl.start();