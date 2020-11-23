import { Component, createElement } from './framework.js';
import Carousel from './components/Carousel';

const images = [
    "./asset/img/1.jpg",
    "./asset/img/2.jpg",
    "./asset/img/3.jpg"
]
const a = <Carousel  src={images} />;

a.mountTo(document.body);