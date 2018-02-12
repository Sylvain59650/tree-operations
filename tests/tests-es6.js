var dataMapped = data.map(x => {
  return {
    Uid: x.data.Uid || x.data.ShortName || "Book",
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