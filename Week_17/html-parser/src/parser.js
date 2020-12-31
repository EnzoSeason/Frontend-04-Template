const EOF = Symbol("EOF");
const css = require('css');

let currentToken;
let currentAttribute;
let currentTextNode;
let stack;
let rules;

function addCSSRules(text) {
	let ast = css.parse(text);
	rules.push(...ast.stylesheet.rules);
}

function specificity(selector) {
	let p = [0, 0, 0, 0]; // inline style, id, class, tag
	let selectorParts = selector.split(" ");
	for (let part of selectorParts) {
		if (part.charAt(0) === "#") {
			p[1] += 1;
		} else if (part.charAt(0) === ".") {
			p[2] += 1;
		} else {
			p[3] += 1;
		}
	}
	return p;
}

function compare(sp1, sp2) {
	for (let i = 0; i < 3; i++) {
		if (sp1[i] - sp2[i]) {
			return sp1[i] - sp2[i];
		}
	}
	return sp1[3] - sp2[3];
}


/**
 * 3 types of selectors: div .a #b
 * 
 * @param {*} element 
 * @param {*} selector 
 */
function match(element, selector) {
	if (!selector || !element.attributes) {
		return false;
	}

	if (selector.charAt(0) === "#") {
		let attr = element.attributes.filter(attr => attr.name === "id")[0];
		if (attr && attr.value === selector.replace("#", "")) {
			return true;
		}
	} else if (selector.charAt(0) === ".") {
		let attr = element.attributes.filter(attr => attr.name === "class")[0];
		if (attr && attr.value === selector.replace(".", "")) {
			return true;
		}
	} else {
		if (element.tagName === selector) {
			return true;
		}
	}
	return false;
}

function computedCSS(element) {
	let elements = stack.slice().reverse();

	if (!element.computedStyle) {
		element.computedStyle = {};
	}

	for (let rule of rules) {
		let selectorParts = rule.selectors[0].split(" ").reverse();

		if (!match(element, selectorParts[0])) {
			continue;
		}

		let matched = false
		
		let j = 1; // index of selectorParts
		for (let i = 0; i < elements.length; i++) {
			if (match(elements[i], selectorParts[j])) {
				j++;
			}
		}
		if (j >= selectorParts.length) {
			matched = true;
		}

		if (matched) {
			let sp = specificity(rule.selectors[0]);
			let computedStyle = element.computedStyle;
			for (let declaration of rule.declarations) {
				if (!computedStyle[declaration.property]) {
					computedStyle[declaration.property] = {};
				}

				if (!computedStyle[declaration.property].specificity) {
					computedStyle[declaration.property].value = declaration.value;
					computedStyle[declaration.property].specificity = sp;
				} else if (compare(sp, computedStyle[declaration.property].specificity) < 0) {
					// current specificity is higher than accent one, overwrite css
					computedStyle[declaration.property].value = declaration.value;
					computedStyle[declaration.property].specificity = sp;
				}
				
			}
		}
	}
}

function emit(token) {
	// console.log(token)
	let top = stack[stack.length - 1]
	if (token.type === 'startTag') {
		let element = {
			type: 'element',
			attributes: [],
			children: [],
		}
		element.tagName = token.tagName
		for (let p in token) {
			if (p !== 'type' && p !== 'tagName') {
				element.attributes.push({
					name: p,
					value: token[p],
				})
			}
		}
		// element.parent = top
		
		computedCSS(element);
		
		top.children.push(element)

		if (!token.isSelfClosing) {
			stack.push(element)
		}
		currentTextNode = null
	} else if (token.type === 'text') {
		if (currentTextNode === null) {
			currentTextNode = {
				type: 'text',
				content: '',
			}
			top.children.push(currentTextNode)
		}
		currentTextNode.content += token.content
	} else if (token.type === 'endTag') {
		if (top.tagName !== token.tagName) {
			throw new Error(top.tagName + '!==' + token.tagName)
		} else {
			if (top.tagName === 'style') {
				addCSSRules(currentTextNode.content)
			}
			stack.pop()
		}
		currentTextNode = null
	}
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
        currentToken = {
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
        currentToken = {
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
		currentToken.tagName += c;
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
		return afterAttributeName;
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
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    }

    // error
    if (c === EOF) {

	}
	
	return data;
}

export default function parseHTML(html) {

	currentToken = null;
	currentAttribute = null;
	currentTextNode = null;
	stack = [{ type: 'document', children: [] }];
	rules = [];

    let state = data;
    for (let c of html) {
        state = state(c);
    }
	state = state(EOF);
	return stack[0];
}