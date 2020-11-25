const el = document.documentElement;

// mouse

el.addEventListener('mousedown', event => {
    const move = event => {
        // main action
        move(event);
    }

    const up = event => {
        // remove listeners
        end(event);
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseup', up);
    }

    start(event);
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseup', up);
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

const start = point => {
    console.log('start', point.clientX, point.clientY);
}

const move = point => {
    console.log('move', point.clientX, point.clientY);
}

const end = point => {
    console.log('end', point.clientX, point.clientY);
}

const cancel = point => {
    console.log('cancel', point.clientX, point.clientY);
}