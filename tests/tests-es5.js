"use strict";

var dataMapped = data.map(function (x) {
  return {
    Uid: x.data.Uid || x.data.ShortName || "Book",
    parentUid: x.data.ParentUid || "Book",
    data: x.data
  };
});
dataMapped[0].parentUid = null;

var tree = dataMapped.unflatten(function (node, parentNode) {
  return node.parentUid === parentNode.Uid;
});

console.log(JSON.stringify(tree));