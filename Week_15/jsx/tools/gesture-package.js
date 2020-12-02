export class Listener {
    constructor(el, recognizer) {
        this.el = el;
        this.recognizer = recognizer;
        this.contexts = new Map();
        this.isListeningMouse = false;

        this.mouseEvents();
        this.touchEvents();
    }

    mouseEvents() {
        this.el.addEventListener('mousedown', event => {
            // console.log(event.button, event.buttons);
            
            let context = Object.create(null);
            const button = 1 << event.button; // exemple, event.button === 2, button === 00100
            // here, the button we created:
            // left: 0b00001
            // rigth: 0b00100 (not 0b00010 in event.buttons) 
            // middle: 0b00010 (not 0b00100 in event.buttons)
            
            this.contexts.set('mouse' + button, context);
            this.recognizer.start(event, context);

            const mouseMove = event => {
                let key = 1; // key in event.buttons
                // loop for all the mouse buttons
                while (key <= event.buttons) {
                    if (key & event.buttons) { // 1&1 = 1; 其他都是0；取一个数的指定位
                        let button = key;
                        if (key === 2 ) { // 0b00010: middle
                            button = 4;
                        }
                        if (key === 4) { // 0b00100
                            button = 2;
                        }
                        let context = this.contexts.get('mouse'+button);
                        this.recognizer.move(event, context);
                    }
                    key = key << 1;
                }
            };

            const mouseUp = event => {
                const button = 1 << event.button;
                let context = this.contexts.get('mouse' + button);

                this.recognizer.end(event, context);
                this.contexts.delete('mouse' + button);

                if (event.buttons === 0) { // no button on the mouse is pressed
                    document.removeEventListener('mousemove', mouseMove);
                    document.removeEventListener('mouseup', mouseUp);
                    this.isListeningMouse = false;
                }
            }

            if (!this.isListeningMouse) {
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);
                this.isListeningMouse = true;
            }
        });
    }

    touchEvents() {
        this.el.addEventListener('touchstart', event => {
            for (let touch of event.changedTouches) {
                let context = Object.create(null);
                this.contexts.set(touch.identifier, context); 
                this.recognizer.start(touch, context);
            }
        });

        this.el.addEventListener('touchmove', event => {
            for (let touch of event.changedTouches) {
                let context = this.contexts.get(touch.identifier);
                this.recognizer.move(touch, context);
            }
        });

        this.el.addEventListener('touchend', event => {
            for (let touch of event.changedTouches) {
                let context = this.contexts.get(touch.identifier);
                this.recognizer.end(touch, context);
                this.contexts.delete(touch.identifier);
            }
        });

        this.el.addEventListener('touchcancel', event => {
            for (let touch of event.changedTouches) {
                let context = this.contexts.get(touch.identifier);
                this.recognizer.cancel(touch, context);
                this.contexts.delete(touch.identifier);
            }
        });
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    start(point, context) {
        context.startX = point.clientX, context.startY = point.clientY;
        // tap start
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.isFlick = false;
        // set start point
        context.points = [
            {
                t: Date.now(),
                x: point.clientX,
                y: point.clientY
            }
        ];
        // console.log('tap start', point);
        this.dispatcher.dispatch('tapstart', {}); 
        
        context.pressHandler = setTimeout(() => {
            // press start
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            context.pressHandler = null;
            // console.log('press start', point);
            this.dispatcher.dispatch('pressstart', {}); 
        }, 500);
    }

    move(point, context) {
        // remove old points, add current point
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push(
            {
                t: Date.now(),
                x: point.clientX,
                y: point.clientY
            }
        )
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        context.isVertical = Math.abs(dx) < Math.abs(dy);
    
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            // pan start
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            clearTimeout(context.pressHandler);
            // console.log('pan start', point);
            this.dispatcher.dispatch('panstart', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            }); 
        }
    
        if (context.isPan) {
            // pan move
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            // console.log('pan move', point);            
            this.dispatcher.dispatch('panmove', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY, 
                isVertical: context.isVertical
            }); 
        }
    }

    end(point, context){
        context.points = context.points.filter(point => Date.now() -  point.t < 500);
        let v = 0;
        if (context.points.length) {
            const startPoint = context.points[0];
            const d = Math.sqrt(
                (point.clientX - startPoint.x) ** 2 + 
                (point.clientY - startPoint.y) ** 2
            );
            v = d / (Date.now() - startPoint.t);
        }
        if (v > 1.5) {
            // console.log('flick', point);
            context.isFlick = true;
        } else {
            context.isFlick = false;
        }

        if (context.isFlick) {
            this.dispatcher.dispatch('flick', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY, 
                isVertical: context.isVertical,
                isFlick: context.isFlick,
                velocity: v
            }); 
        }
        
        if (context.isTap) {
            // tap end
            // console.log('tap end', point);
            this.dispatcher.dispatch('tapend', {}); 
            clearTimeout(context.pressHandler);
        }
    
        if (context.isPress) {
            // press end
            // console.log('press end', point);
            this.dispatcher.dispatch('pressend', {});
        }
    
        if (context.isPan) {
            // pan end
            // console.log('pan end', point);
            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY, 
                isVertical: context.isVertical,
                isFlick: context.isFlick
            }); 
        }
    }

    cancel(point, context){
        clearTimeout(context.pressHandler);
        // console.log('cancel', point);
        this.dispatcher.dispatch('cancel', {});
    }
}

export class Dispatcher {
    constructor(element) {
        this.element = element;
    }
    dispatch(type, props) {
        let event = new Event(type);
        for (let name in props) {
            event[name] = props[name];
        }
        this.element.dispatchEvent(event);
    }
}

export function enableGesture(element) {
    const dispatcher = new Dispatcher(element);
    const recognizer = new Recognizer(dispatcher);
    new Listener(element,recognizer);

    return;
}