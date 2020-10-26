const standards = Array.prototype.slice.call(
    document.querySelector("#container").children
).filter(
    element => element.getAttribute("data-tag").match(/css/)
).map(
    element => ({
        name: element.children[1].innerText,
        url: element.children[1].children[0].href
    })
);