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
        } else { // may need change line
            // shrink item size to fit mainSpace size
            if (itemStyle[mainSize] > elementStyle[mainSize]) {
                itemStyle[mainSize] = elementStyle[mainSize];
            }

            // change line
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;

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
    if (elementStyle.flexWrap === "nowrap" || isAutoMainSize) {
        flexLine.crossSpace = (elementStyle[crossSize] === void 0) ? crossSpace : elementStyle[crossSize];
    } else {
        flexLine.crossSpace = crossSpace;
    }

    // calculate main axis
    if (mainSpace < 0) {
        // scale main space and items' main size
        let scale = elementStyle[mainSize] / (elementStyle[mainSize] - mainSpace);
        let currentMain = mainBase;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let itemStyle = getStyle(item);
        
            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] * mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
      } else {
            flexLines.forEach((items) => {
                // get flex style
                let mainSpace = items.mainSpace;
                let flexTotal = 0;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    let itemStyle = getStyle(item);
                    if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
                        flexTotal += flex;
                        continue;
                    }
                }
        
                if (flexTotal > 0) { // items have flex style
                    let currentMain = mainBase;
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        let itemStyle = getStyle(item);
                        if (itemStyle.flex) {
                            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                        }
                        itemStyle[mainStart] = currentMain;
                        itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                        currentMain = itemStyle[mainEnd];
                    }
                } else { // items don't have flex style
                    let currentMain = mainBase;
                    let step = 0;
                    if (style.justifyContent === 'flex-start') {
                        // defalut setting
                    }
                    if (style.justifyContent === 'flex-end') {
                        currentMain = mainSpace * mainSign + mainBase;
                    }
            
                    if (style.justifyContent === 'center') {
                        currensteptMain = (mainSpace / 2) * mainSign + mainBase;
                    }
                    if (style.justifyContent === 'space-between') {
                        step = (mainSpace / (items.length - 1)) * mainSign;
                    }
                    if (style.justifyContent === 'space-around') {
                        step = (mainSpace / items.length) * mainSign;
                        currentMain = step / 2 + mainBase;
                    }
            
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        let itemStyle = getStyle(item);
                        itemStyle[mainStart] = currentMain;
                        itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                        currentMain = itemStyle[mainEnd] + step;
                    }
                }
            });
    }    

}
  
module.exports = layout;