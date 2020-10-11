const EOF = Symbol("EOF");
let currentToke = null;

function emit(token) {
    console.log(token);
}

function data(c) {
    if (c === "<") {
        return tagOpen;
    }
    
    if (c === EOF) {
        emit({
            type: 'EOF'
        });
        return;
    } 
    emit({
        type: 'text',
        content: c
    });
    return data;
}

function tagOpen(c) {
    // </
    if (c === "/") {
        return endTagOpen;
    }

    // <p 
    if (c.match(/^[a-zA-Z]$/)) {
        currentToke = {
            type: 'startTag',
            tagName: ''
        };
        return tagName(c);
    }

    return;
}

function endTagOpen(c) {
    // </p
    if (c.match(/^[a-zA-Z]$/)) {
        currentToke = {
            type: 'endTag',
            tagName: ''
        };
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
        currentToke.tagName += c;
        return beforeAttributeName;
    }

    if (c === "/") {
        return selfClosingStartTag;
    }

    if (c === ">") {
        emit(currentToken);
        return data;
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
        return data;
    }

    if (c === "=") {
        return beforeAttributeName;
    }

    return beforeAttributeName;
}

function selfClosingStartTag(c) {
    if (c === ">") {
        currentToke.isSelfClosing = true;
        emit(currentToken);
        return data;
    }

    // error
    if (c === EOF) {

    }

    // other errors
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}