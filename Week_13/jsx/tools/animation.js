const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIMATIONS = Symbol('animations');
const TIMELINE_START = Symbol('timeline-start')
const ANIMATION_START = Symbol('animation-start');
const PAUSE_START = Symbol('pause-start');
const PAUSED_TIME = Symbol('pause-time');
export class Timeline {
    constructor() {
        this[TIMELINE_START] = Date.now();

        this[ANIMATIONS] = new Set();
        this[ANIMATION_START] = new Map(); // key: animation, value: start time
        this[PAUSED_TIME] = 0; // init PAUSED_TIME as 0, means never paused

        this[TICK] = () => {
            const now = Date.now();
            let t;

            for (let animation of this[ANIMATIONS]) {
                if (this[ANIMATION_START].get(animation) < this[TIMELINE_START]) {
                    // animation starts before timeline starts
                    t = now - this[TIMELINE_START];
                } else {
                    // animation starts after timeline starts
                    t = now - this[ANIMATION_START].get(animation);
                }
                t -= this[PAUSED_TIME]; // remove paused time
                
                if (t >= 0) { // if t < 0, it means animation is not started yet
                    if (animation.duration > t) {
                        // animation receives time, update property
                        animation.receive(t); 
                    } else {
                        // delete expired animation
                        this[ANIMATIONS].delete(animation);
                    }
                }
            }
            // ask for next frame
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
    }

    start() {
        this[TICK]();
    }

    pause() {
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }

    resume() {
        this[PAUSED_TIME] += Date.now() - this[PAUSE_START];
        this[TICK](); 
    }

    add(animation, startTime = Date.now()) {
        this[ANIMATIONS].add(animation);
        this[ANIMATION_START].set(animation, startTime);
    }
}

export class Animation {
    constructor(
        object, property, 
        startValue, endValue, duration,
        timingFn, template) {
            this.object = object;
            this.property = property;
            this.startValue = startValue;
            this.endValue = endValue;
            this.duration = duration;
            this.timingFn = timingFn;
            this.template = template;
        }
    
    receive(time) {
        let range = this.endValue - this.startValue;
        this.object[this.property] = this.template(this.startValue + range * time / this.duration);
    }
}