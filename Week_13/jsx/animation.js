const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIMATION = Symbol('animation');

export class Timeline {
    constructor() {
        this[ANIMATION] = new Set();
    }

    start() {
        // set start time
        const startTime = Date.now();
        
        this[TICK] = () => {
            // calculate the passed time of animation
            const t = Date.now() - startTime;
            for (let animation of this[ANIMATION]) {
                if (animation.duration > t) {
                    // animation receives time, update property
                    animation.receive(t); 
                } else {
                    // delete expired animation
                    this[ANIMATION].delete(animation);
                }
            }
            // ask for next frame
            requestAnimationFrame(this[TICK]);
        }
        // run
        this[TICK]();
    }

    add(animation) {
        this[ANIMATION].add(animation);
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