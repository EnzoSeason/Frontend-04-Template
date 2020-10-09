const EOF = Symbol("EOF");

function start(c) {
    if (c === "<") {
        return tagOpen;
    }
    
    if (c === EOF) {
        return;
    } 
    
    return start;
}

function tagOpen(c) {
    // </
    if (c === "/") {
        return endTagOpen;
    }

    // <p 
    if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c);
    }

    return;
}

function endTagOpen(c) {
    // </p
    if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c);
    }

    // </>, error
    if (c === ">") {

    }

    // </[EOF], error
    if (c === EOF) {

    }

    // other errors
}

function tagName(c) {
    // space
    if (c.match(/^[\t\n\f\s]$/)) {
        return beforeAttributeName;
    }

    if (c === "/") {
        return selfClosingStartTag;
    }

    if (c === ">") {
        return start;
    }

    if (c.match(/^[a-zA-Z]$/)) {
        return tagName;
    }

    return tagName;
}

function beforeAttributeName(c) {
    // space
    if (c.match(/^[\t\n\f\s]$/)) {
        return beforeAttributeName;
    }

    if (c === ">") {
        return start;
    }

    if (c === "=") {
        return beforeAttributeName;
    }

    return beforeAttributeName;
}

function selfClosingStartTag(c) {
    if (c === ">") {
        currentToke.isSelfClosing = true;
        return start;
    }

    // error
    if (c === EOF) {

    }

    // other errors
}

module.exports.parseHTML = function parseHTML(html) {
    let state = start;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}