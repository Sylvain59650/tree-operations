//require("../distrib/tree-operations.min.js");
require("../sources/tree-operations.js");

var flatten = [
  { id: 1, parent: 0, title: "Title 1" },
  { id: 11, parent: 1, title: "Title 1.1" },
  { id: 111, parent: 11, title: "Title 1.1.1" },
  { id: 112, parent: 11, title: "Title 1.1.2" },
  { id: 113, parent: 11, title: "Title 1.1.3" }
];

var tree = flatten.unflatten(
  (node, parentNode) => node.parent === parentNode.id,
  "childs"
);

console.log(JSON.stringify(tree));