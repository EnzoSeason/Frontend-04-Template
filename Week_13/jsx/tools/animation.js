const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIMATION = Symbol('animation');
const START_TIME = Symbol('start-time');

export class Timeline {
    constructor() {
        this[ANIMATION] = new Set();
        this[START_TIME] = new Map(); // key: animation, value: start time
    }

    start() {
        // set timeline's start time
        const startTime = Date.now();
        
        this[TICK] = () => {
            // calculate the passed time of animation
            const now = Date.now();
            let t;
            for (let animation of this[ANIMATION]) {
                if (this[START_TIME].get(animation) < startTime) {
                    // animation starts before timeline starts
                    t = now - startTime;
                } else {
                    // animation starts after timeline starts
                    t = now - this[START_TIME].get(animation);
                }
                if (t >= 0) { // if t < 0, it means animation is not started yet
                    if (animation.duration > t) {
                        // animation receives time, update property
                        animation.receive(t); 
                    } else {
                        // delete expired animation
                        this[ANIMATION].delete(animation);
                    }
                }
            }
            // ask for next frame
            requestAnimationFrame(this[TICK]);
        }
        // run
        this[TICK]();
    }

    add(animation, startTime = Date.now()) {
        this[ANIMATION].add(animation);
        this[START_TIME].set(animation, startTime);
    }
}

export class Animation {
    constructor(
        object, property, 
        startValue, endValue, duration,
        timingFn) {
            this.object = object;
            this.property = property;
            this.startValue = startValue;
            this.endValue = endValue;
            this.duration = duration;
            this.timingFn = timingFn;
        }
    
    receive(time) {
        let range = this.endValue - this.startValue;
        this.object[this.property] = this.startValue + range * time / this.duration;
    }
}