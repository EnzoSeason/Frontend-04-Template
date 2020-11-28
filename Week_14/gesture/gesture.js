const el = document.documentElement;

let contexts = new Map();
let isListeningMouse = false;

// mouse

el.addEventListener('mousedown', event => {
    console.log(event.button, event.buttons);
    
    let context = Object.create(null);
    const button = 1 << event.button; // exemple, event.button === 2, button === 00100
    // here, the button we created:
    // left: 0b00001
    // rigth: 0b00100 (not 0b00010 in event.buttons) 
    // middle: 0b00010 (not 0b00100 in event.buttons)
    
    contexts.set('mouse' + button, context);
    start(event, context);

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
                let context = contexts.get('mouse'+button);
                move(event, context);
            }
            key = key << 1;
        }
    };

    const mouseUp = event => {
        const button = 1 << event.button;
        let context = contexts.get('mouse' + button);

        end(event, context);
        contexts.delete('mouse' + button);

        if (event.buttons === 0) { // no button on the mouse is pressed
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            isListeningMouse = false;
        }
    }

    if (!isListeningMouse) {
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        isListeningMouse = true;
    }
});

// touch

el.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context); 
        start(touch, context);
    }
});

el.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }
});

el.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);
    }
});

el.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        cancel(touch, context);
        contexts.delete(touch.identifier);
    }
});


// function

// // start point
// let startX, startY;
// // state: tap, pan, press
// let isTap = false;
// let isPan = false;
// let isPress = false;
// // press handler: 0.5s tap => press
// let pressHandler;

const start = (point, context) => {
    context.startX = point.clientX, context.startY = point.clientY;
    // tap start
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    console.log('tap start', point);
    
    context.pressHandler = setTimeout(() => {
        // press start
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context.pressHandler = null;
        console.log('press start', point);
    }, 500);
}

const move = (point, context) => {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        // pan start
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        clearTimeout(context.pressHandler);
        console.log('pan start', point);
    }

    if (context.isPan) {
        // pan move
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log('pan move', point);
    }
}

const end = (point, context) => {
    if (context.isTap) {
        // tap end
        console.log('tap end', point);
        clearTimeout(context.pressHandler);
    }

    if (context.isPress) {
        // press end
        console.log('press end', point);
    }

    if (context.isPan) {
        // pan end
        console.log('pan end', point);
    }
}

const cancel = (point, context) => {
    clearTimeout(context.pressHandler);
    console.log('cancel', point);
}

function dispatch(type, props) {
    let event = new Event(type);
    for (let name in props) {
        event[name] = props[name];
    }
    element.dispatchEvent(event);
}