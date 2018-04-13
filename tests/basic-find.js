import { test } from "ava";

//require("../distrib/tree-operations.min.js");


const TreeOps = require("../sources/tree-operations.js");

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

test("parentOf112", t => {
  var parentOf112 = TreeOps.find(
    tree,
    x => x.childrens && x.childrens.find(y => y.id === 112),
    (node, parentNode) => node.parent === parentNode.id,
    "childrens"
  )

  t.deepEqual(parentOf112, {
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
  });
});


test("node1", t => {
  var node1 = TreeOps.find(
    tree,
    x => x.id === 1,
    (node, parentNode) => node.parent === parentNode.id,
    "childrens"
  );
  t.deepEqual(node1, tree[0]);
});

test("node13", t => {
  var node13 = TreeOps.find(
    tree,
    x => x.id === 13,
    (node, parentNode) => node.parent === parentNode.id,
    "childrens"
  );
  t.deepEqual(node13, { "id": 13, "parent": 1, "title": "Title 1.3" });
});

test("node112", t => {
  var node112 = TreeOps.find(
    tree,
    x => x.id === 112,
    (node, parentNode) => node.parent === parentNode.id,
    "childrens"
  );
  t.deepEqual(node112, {
    "id": 112,
    "parent": 11,
    "title": "Title 1.1.2",
    "childrens": [
      { "id": 1121, "parent": 112, "title": "Title 1.1.2.1" }
    ]
  });
});