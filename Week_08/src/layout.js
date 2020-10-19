function getStyle(element) {
    if (!element.style) {
      element.style = {};
    }
    for (const prop in element.computeStyle) {
      element.style[prop] = element.computeStyle[prop].value;
      const value = element.style[prop].toString();
      if (value.match(/px$/)) {
        element.style[prop] = parseInt(value);
      }
      if (value.match(/^[0-9\.]+$/)) {
        element.style[prop] = parseInt(value);
      }
    }
    return element.style;
}

function layout(element) {
    if (!element.computeStyle) {
        return;
    }
    let elementStyle = getStyle(element);
  
    if (elementStyle.display !== 'flex') {
        return;
    }
    let items = element.children.filter((e) => e.type === 'element');
  
    items.sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
    });
  
    let style = elementStyle;
    ['width', 'height'].forEach((size) => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    });

    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch';
    }
  
    let mainSize,
        mainStart,
        mainEnd,
        mainSign,
        mainBase,
        crossSize,
        crossStart,
        crossEnd,
        crossSign,
        crossBase;
    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;
    
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
  
    if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;
  
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
  
    if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;
    
        crossSize = 'width';
        crossStart = 'letf';
        crossEnd = 'right';
    }
  
    if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = -1;
        mainBase = style.height;
    
        crossSize = 'width';
        crossStart = 'letf';
        crossEnd = 'right';
    }
  
    if (style.flexWrap === 'wrap-reverse') {
        const tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossSign = 1;
        crossBase = 0;
    }
}
  
module.exports = layout;