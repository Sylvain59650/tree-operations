//require("../distrib/tree-operations.min.js");
var TreeOps = require("../sources/tree-operations.js");

var tree = [{
  "id": 1,
  "parent": 0,
  "title": "Title 1",
  "childrens": [{
      "id": 11,
      "parent": 1,
      "title": "Title 1.1",
      "childrens": [
        { "id": 111, "parent": 11, "title": "Title 1.1.1" },
        {
          "id": 112,
          "parent": 11,
          "title": "Title 1.1.2",
          "childrens": [
            { "id": 1121, "parent": 112, "title": "Title 1.1.2.1" }
          ]
        },
        { "id": 113, "parent": 11, "title": "Title 1.1.3" }
      ]
    },
    {
      "id": 12,
      "parent": 1,
      "title": "Title 1.2",
      "childrens": [
        { "id": 121, "parent": 12, "title": "Title 1.2.1" }
      ]
    },
    { "id": 13, "parent": 1, "title": "Title 1.3" }
  ]
}];

var parentOf112 = TreeOps.find(
  tree,
  x => x.childrens && x.childrens.find(y => y.id === 112),
  (node, parentNode) => node.parent === parentNode.id,
  "childrens"
)

var node1 = TreeOps.find(
  tree,
  x => x.id === 1,
  (node, parentNode) => node.parent === parentNode.id,
  "childrens"
)

var node13 = TreeOps.find(
  tree,
  x => x.id === 13,
  (node, parentNode) => node.parent === parentNode.id,
  "childrens"
)


var node112 = TreeOps.find(
  tree,
  x => x.id === 112,
  (node, parentNode) => node.parent === parentNode.id,
  "childrens"
)



console.log("node1", JSON.stringify(node1));
console.log("node13", JSON.stringify(node13));
console.log("node112", JSON.stringify(node112));
console.log("parentOf112", JSON.stringify(parentOf112));