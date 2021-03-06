import { test } from "ava";

var TreeOps = require("../sources/tree-operations.js");


var tree = [{
    "title": "Title 1",
    "childrens": [{
        "title": "1.1",
        "childrens": [{ "title": "Title 1.1.1" },
          { "title": "Title 1.1.2" },
          { "title": "Title 1.1.3" }
        ]
      },
      {
        "title": "Title 1.2",
        "childrens": [{
          "title": "Title 1.2.1",
          "childrens": [{
              "title": "Title 1.2.1.3",
              "childrens": [{
                  "title": "Title 1.2.1.3.1"
                },
                { "title": "Title 1.2.1.3.2" }
              ]
            },
            { "title": "Title 1.2.1.1" },
            { "title": "Title 1.2.1.2" }
          ]
        }]
      },
      { "title": "Title 1.3" }
    ]
  },
  {
    "title": "Title 2",
    "childrens": [{ "title": "Title 2.1" }]
  }
];



test("toFlatArray", t => {
  var list = TreeOps.toFlatArray(
    tree,
    "childrens",
    false
  );
  t.deepEqual(list, [
    { "title": "Title 1" },
    { "title": "1.1" },
    { "title": "Title 1.1.1" },
    { "title": "Title 1.1.2" },
    { "title": "Title 1.1.3" },
    { "title": "Title 1.2" },
    { "title": "Title 1.2.1" },
    { "title": "Title 1.2.1.3" },
    { "title": "Title 1.2.1.3.1" },
    { "title": "Title 1.2.1.3.2" },
    { "title": "Title 1.2.1.1" },
    { "title": "Title 1.2.1.2" },
    { "title": "Title 1.3" },
    { "title": "Title 2" },
    { "title": "Title 2.1" }
  ]);
});