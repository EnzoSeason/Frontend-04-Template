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
    
    ['width', 'height'].forEach((size) => {
        if (elementStyle[size] === 'auto' || elementStyle[size] === '') {
            elementStyle[size] = null;
        }
    });

    if (!elementStyle.flexDirection || elementStyle.flexDirection === 'auto') {
        elementStyle.flexDirection = 'row';
    }
    if (!elementStyle.alignItems || elementStyle.alignItems === 'auto') {
        elementStyle.alignItems = 'stretch';
    }
    if (!elementStyle.justifyContent || elementStyle.justifyContent === 'auto') {
        elementStyle.justifyContent = 'flex-start';
    }
    if (!elementStyle.flexWrap || elementStyle.flexWrap === 'auto') {
        elementStyle.flexWrap = 'nowrap';
    }
    if (!elementStyle.alignContent || elementStyle.alignContent === 'auto') {
        elementStyle.alignContent = 'stretch';
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
    if (elementStyle.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1; // left to right
        mainBase = 0; // start point
    
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
  
    if (elementStyle.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = elementStyle.width;
  
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
  
    if (elementStyle.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;
    
        crossSize = 'width';
        crossStart = 'letf';
        crossEnd = 'right';
    }
  
    if (elementStyle.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = -1;
        mainBase = elementStyle.height;
    
        crossSize = 'width';
        crossStart = 'letf';
        crossEnd = 'right';
    }
  
    if (elementStyle.flexWrap === 'wrap-reverse') {
        const tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossSign = 1;
        crossBase = 0;
    }

    let isAutoMainSize = false;
    // if the main size is not set, use no-wrap 
    // set all the items in one row
    if (!elementStyle[mainSize]) {
        elementStyle[mainSize] = 0;
        for (let i = 0; i < items.length; i++) {
                const item = items[i];
                let itemStyle = getStyle(item);
                if (itemStyle[mainSize] !== null || itemStyle[mainSize]) {
                    elementStyle[mainSize] = elementStyle[mainSize] + item[mainSize];
                }
        }
        isAutoMainSize = true;
    }

    let flexLine = [];
    let flexLines = [flexLine];
    let mainSpace = elementStyle[mainSize];
    let crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let itemStyle = getStyle(item);
        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }
        // set crossSpace
        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
            crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        }
        // if item has flex style, then item must be placed inline.
        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (elementStyle.flexWrap === 'nowrap' && isAutoMainSize) {
            // place item inline
            mainSpace -= itemStyle[mainSize];

            flexLine.push(item);
        } else {
            // shrink item size to fit mainSpace size
            if (itemStyle[mainSize] > elementStyle[mainSize]) {
                itemStyle[mainSize] = elementStyle[mainSize];
            }elementStyle

            // 剩下空间放不下元素时的处理（换行）
            if (mainSpace < itemStyle[mainSize]) {
                // 记录当前行的剩余空间（主轴和交叉轴的剩余空间）
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                // 换行
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = elementStyle[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;
    flexLine.crossSpace = crossSpace;

}
  
module.exports = layout;