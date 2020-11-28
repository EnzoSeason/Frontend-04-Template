const el = document.documentElement;

// mouse

el.addEventListener('mousedown', event => {
    const mouseMove = event => move(event);

    const mouseUp = event => {
        // remove listeners
        end(event);
        el.removeEventListener('mousemove', mouseMove);
        el.removeEventListener('mouseup', mouseUp);
    }

    start(event);
    el.addEventListener('mousemove', mouseMove);
    el.addEventListener('mouseup', mouseUp);
});

// touch

let contexts = new Map();

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
    console.log('tap start');
    
    context.pressHandler = setTimeout(() => {
        // press start
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context.pressHandler = null;
        console.log('press start');
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
        console.log('pan start');
    }

    if (context.isPan) {
        // pan move
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log('pan move');
    }
}

const end = (point, context) => {
    if (context.isTap) {
        // tap end
        console.log('tap end');
        clearTimeout(context.pressHandler);
    }

    if (context.isPress) {
        // press end
        console.log('press end');
    }

    if (context.isPan) {
        // pan end
        console.log('pan end')
    }
}

const cancel = (point, context) => {
    clearTimeout(context.pressHandler);
    console.log('cancel');
}