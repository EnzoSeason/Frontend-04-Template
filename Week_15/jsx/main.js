import { createElement } from './tools/framework.js';
import Carousel from './containers/Carousel';

const images = [
    "./asset/img/1.jpg",
    "./asset/img/2.jpg",
    "./asset/img/3.jpg",
    "./asset/img/4.jpg",
    "./asset/img/5.jpg",
]
const a = <Carousel  src={images} />;

a.mountTo(document.body);