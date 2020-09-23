const objects = {
    id: 'Object',
    children: [
        {id: 'Boolean'}, {id: 'String'}, {id: 'Number'}, {id: 'Symbol'}, {id: 'Data'},
        {id: 'Promise'}, {id: 'RegExp'}, {id: 'Proxy'},
        {id: 'Map'}, {id: 'WeakMap'}, {id: 'Set'}, {id: 'WeakSet'},
        {id: 'Function'}, {id: 'ArrayBuffer'}, {id: 'SharedArrayBuffer'}, {id: 'DataView'},
        {
            id: 'Array',
            children: [
                {id: 'Float32Array'}, {id: 'Float64Array'}, 
                {id: 'Int8Array'}, {id: 'Int16Array'}, {id: 'Int32Array'}, 
                {id: 'UInt8Array'}, {id: 'UInt16Array'}, {id: 'UInt32Array'}, {id: 'UInt8ClampedArray'},
            ]
        },
        {
            id: 'Error',
            children: [
                {id: 'EvalError'}, {id: 'RangeError'}, {id: 'ReferenceError'}, 
                {id: 'SyntaxError'}, {id: 'TypeError'}, {id: 'URIError'}
            ]
        }
    ]
}

function generateNodes(node, nodes) {
    if (node.id) {
        nodes.push({
            id: node.id,
            label: node.id
        });
    }

    if (node.children) {
        for(let n of node.children) {
            generateNodes(n, nodes);
        }
    }
}

function generateEdges(node, edges) {
    if (!node.children) {
        return;
    }
    for(let n of node.children) {
        edges.push({
            source: node.id,
            target: n.id
        });
        generateEdges(n, edges);
    }
}

const nodes = [];
const edges = [];
generateNodes(objects, nodes);
generateEdges(objects, edges);

const graph = new G6.Graph({
    container: 'mountNode',
    width: 1000,
    height: 900,
    modes: {
        default: ['drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
    },
    defaultNode: {
      size: 70,
      labelCfg: {
        style: {
          fill: '#fff',
        },
      },
    },
    defaultEdge: {
      labelCfg: {
        autoRotate: true,
      },
    },
    layout: {
      type: 'force', // 设置布局算法为 force
      linkDistance: 200, // 设置边长为 100
      preventOverlap: true, // 设置防止重叠
    },
});


nodes.forEach((node) => {
    if (!node.style) {
        node.style = {};
    }
    node.style.lineWidth = 1;
    node.style.stroke = '#666';
    node.style.fill = 'steelblue';
    node.type = 'circle';
});

edges.forEach((edge) => {
    if (!edge.style) {
        edge.style = {};
    }
    edge.style.lineWidth = 1;
    edge.style.opacity = 0.6;
    edge.style.stroke = 'grey';
});

const data = {
    nodes: nodes,
    edges: edges
}

graph.data(data);
graph.render();