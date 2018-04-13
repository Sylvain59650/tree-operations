import { test } from "ava";

var TreeOps = require("../sources/tree-operations.js");

var flatten = [
  { id: 1, parent: 0, title: "Title 1" },
  { id: 11, parent: 1, title: "Title 1.1" },
  { id: 111, parent: 11, title: "Title 1.1.1" },
  { id: 112, parent: 11, title: "Title 1.1.2" },
  { id: 113, parent: 11, title: "Title 1.1.3" }
];

test("toFlatArray", t => {
  var tree = TreeOps.fromArray(
    flatten,
    (node, parentNode) => node.parent === parentNode.id,
    "childrens"
  );

  t.deepEqual(tree, [{
    id: 1,
    parent: 0,
    title: "Title 1",
    childrens: [{
      id: 11,
      parent: 1,
      title: "Title 1.1",
      childrens: [{ id: 111, parent: 11, title: "Title 1.1.1" },
        { id: 112, parent: 11, title: "Title 1.1.2" },
        { id: 113, parent: 11, title: "Title 1.1.3" }
      ]
    }]
  }]);
});