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

el.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
        start(touch);
    }
});

el.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
        move(touch);
    }
});

el.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
        end(touch);
    }
});

el.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
        cancel(touch);
    }
});


// function

// start point
let startX, startY;
// state: tap, pan, press
let isTap = false;
let isPan = false;
let isPress = false;
// press handler: 0.5s tap => press
let pressHandler;

const start = point => {
    startX = point.clientX, startY = point.clientY;
    // tap start
    isTap = true;
    isPan = false;
    isPress = false;
    console.log('tap start');
    
    pressHandler = setTimeout(() => {
        // press start
        isTap = false;
        isPan = false;
        isPress = true;
        pressHandler = null;
        console.log('press start');
    }, 500);
}

const move = point => {
    let dx = point.clientX - startX;
    let dy = point.clientY - startY;

    if (!isPan && dx ** 2 + dy ** 2 > 100) {
        // pan start
        isTap = false;
        isPan = true;
        isPress = false;
        clearTimeout(pressHandler);
        console.log('pan start');
    }

    if (isPan) {
        // pan move
        isTap = false;
        isPan = true;
        isPress = false;
        console.log('pan move');
    }
}

const end = point => {
    if (isTap) {
        // tap end
        console.log('tap end');
        clearTimeout(pressHandler);
    }

    if (isPress) {
        // press end
        console.log('press end');
    }

    if (isPan) {
        // pan end
        console.log('pan end')
    }
}

const cancel = point => {
    clearTimeout(pressHandler);
    console.log('cancel');
}