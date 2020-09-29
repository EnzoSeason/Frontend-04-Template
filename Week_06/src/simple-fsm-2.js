// find abababx
function find(str){ 
    
    let state = start;
    for (let i = 0; i < str.length; i++) {
        state = state(str[i], t[i]);
    }
    
    return state === end;
}

function end(char) {
    return end;
}

function start(char) {
    if (char === "a") {
        return foundA;
    } else {
        return start;
    }
}

function foundA1(char) {
    if (char === "b") {
        return foundB;
    } else {
        return start(char);
    }
}

function foundB1(char) {
    if (char === "a") {
        return foundA2;
    } else {
        return start(char);
    }
}

function foundA2(char) {
    if (char === "b") {
        return foundB2;
    } else {
        return foundA1(char);
    }
}

function foundB2(char) {
    if (char === "a") {
        return foundA3;
    } else {
        return foundB1(char);
    }
}

function foundA3(char) {
    if (char === "b") {
        return foundB3;
    } else {
        return foundA2(char);
    }
}

function foundB3(char) {
    if (char === "x") {
        return end;
    } else {
        return foundB2(char);
    }
}