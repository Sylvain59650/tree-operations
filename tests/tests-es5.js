"use strict";
import data from "./graph.json";
import expected from "./expected.json";
import { test } from "ava";

var TreeOps = require("../sources/tree-operations.js");

var dataMapped = data.map(function(x) {
  return {
    Uid: x.data.Uid || x.data.ShortName || "Book",
    parentUid: x.data.ParentUid || "Book",
    data: x.data
  };
});
dataMapped[0].parentUid = null;








test("toFlatArray", t => {
  var tree = TreeOps.fromArray(dataMapped, function(node, parentNode) {
    return node.parentUid === parentNode.Uid;
  });

  t.deepEqual(tree, expected);
});