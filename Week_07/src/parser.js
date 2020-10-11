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
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName
	} else if (c === '/' || c === '>' || c === EOF) {
		return afterAttributeName
	} else if (c === '=') {
	} else {
		currentAttribute = {
			name: '',
			value: '',
		}
		return attributeName(c)
	}
}

function afterAttributeName(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return afterAttributeName(c)
	} else if (c === '/' || c === '>') {
		return selfClosingStartTag
	} else if (c === EOF) {
		return data
	} else if (c === '=') {
		return beforeAttributeValue
	} else {
		return afterAttributeName
	}
}

function attributeName(c) {
	if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
		return afterAttributeName(c)
	} else if (c === '=') {
		return beforeAttributeValue
	} else if (c === '\u0000') {
	} else if (c === '"' || c === "'" || c === '<') {
	} else {
		currentAttribute.name += c
		return attributeName
	}
}

function beforeAttributeValue(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeValue
	} else if (c === '"') {
		return doubleQuotedAttributeValue
	} else if (c === "'") {
		return singleQuotedAttributeValue
	} else if (c === '/' || c === '>' || c === EOF) {
		return data
	} else {
		return UnquotedAttributeValue(c)
	}
}

function doubleQuotedAttributeValue(c) {
	if (c === '"') {
		currentToken[currentAttribute.name] = currentAttribute.value
		return afterQuotedAttributeValue
	} else if (c === '\u0000') {
	} else if (c === EOF) {
	} else {
		currentAttribute.value += c
		return doubleQuotedAttributeValue
	}
}

function singleQuotedAttributeValue(c) {
	if (c === "'") {
		currentToken[currentAttribute.name] = currentAttribute.value
		return afterQuotedAttributeValue
	} else if (c === '\u0000') {
	} else if (c === EOF) {
	} else {
		currentAttribute.value += c
		return singleQuotedAttributeValue
	}
}

function UnquotedAttributeValue(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		currentToken[currentAttribute.name] = currentAttribute.value
		return beforeAttributeName
	} else if (c === '/') {
		currentToken[currentAttribute.name] = currentAttribute.value
		return selfClosingStartTag
	} else if (c === '>') {
		currentToken[currentAttribute.name] = currentAttribute.value
		emit(currentToken)
		return data
	} else if (c === '\u0000') {
	} else if (c === '"' || c === "'" || c === '<' || c === '=') {
	} else if (c === EOF) {
	} else {
		currentAttribute.value += c
		return UnquotedAttributeValue
	}
}

function afterQuotedAttributeValue(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return afterQuotedAttributeValue
	} else if (c.match(/^[a-zA-Z]$/)) {
		return beforeAttributeName(c)
	} else if (c === '/') {
		return selfClosingStartTag
	} else if (c === '>') {
		currentToken[currentAttribute.name] = currentAttribute.value
		emit(currentToken)
		return data
	} else if (c === EOF) {
	} else {
		currentAttribute.value += c
		return doubleQuotedAttributeValue
	}
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