var TreeOps = require("../distrib/tree-operations.min.js");

var data = require("./graph.json");
var dataMapped = data.map(x => {
  return {
    Uid: x.data.Uid || "Book",
    parentUid: x.data.ParentUid || "Book",
    data: x.data
  }
});
dataMapped[0].parentUid = null;

var tree = TreeOps.fromArray(
  dataMapped,
  (node, parentNode) => node.parentUid === parentNode.Uid
);
console.log(JSON.stringify(tree));