/**
 * @license
 * tree-operations 0.9.1
 * Copyright Sylvain Longepée
 * Released under MIT license <https://github.com/Sylvain59650/tree-operations/blob/master/LICENSE>
 */

;
(function(moduleName, root, factory) {
  if (typeof define === "function" && define.amd) {
    // define([""], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    window.TreeOps = factory();
  }
}("TreeModule", null, function() {
  "use strict";

  function TreeOps() {}

  TreeOps.toFlatArray = function(tree, childrenPropertyName, reversible) {
    if (reversible !== true) { reversible = false; }
    var stack = (tree && tree.length) ? [{ pointer: tree, offset: 0, ref: null }] : [];
    var flat = [];
    var current = null;
    var i = 1;
    while (stack.length) {
      current = stack.pop();
      current.parentId = (current.node) ? current.node._id : null;
      while (current.offset < current.pointer.length) {
        var node = current.pointer[current.offset];
        if (reversible) {
          node._id = i;
          node._parentId = current.ref;
        }
        var children = node[childrenPropertyName];
        delete node[childrenPropertyName];
        flat.push(node);
        current.offset++;
        if (children) {
          stack.push(current);
          current = {
            pointer: children,
            offset: 0,
            node: node,
            ref: node._id
          };
        }
        i++;
      }
    }
    return flat;
  }

  TreeOps.fromArray = function(list, predicateChild, childrenPropertyName = "childs") {
    return list.reduce((tree, node) => {
      const parentNode = list.find(parent => predicateChild(node, parent));
      if (parentNode === undefined) {
        tree.push(node);
      } else {
        if (!parentNode[childrenPropertyName]) {
          parentNode[childrenPropertyName] = [];
        }
        parentNode[childrenPropertyName].push(node);
      }
      return tree;
    }, []);
  }

  TreeOps.find = function(tree, predicateFind, predicateChild, childrenPropertyName = "childs") {
    if (!tree) { return undefined; }
    var found = tree.find(predicateFind);
    if (found) {
      return found;
    }
    for (var branch of tree) {
      var childrens = branch[childrenPropertyName];
      if (!childrens) { continue; }
      found = this.find(childrens, predicateFind, predicateChild, childrenPropertyName);
      if (found) { return found; }
    }
    return undefined;
  }

  TreeOps.orderBy = function(tree, childrenComparaison, childrenPropertyName = "childs") {
    if (!tree) { return undefined; }
    for (var branch of tree) {
      var childrens = branch[childrenPropertyName];
      if (!childrens) { continue; }
      branch[childrenPropertyName] = childrens.sort(childrenComparaison);
      branch[childrenPropertyName] = this.orderBy(branch[childrenPropertyName], childrenComparaison, childrenPropertyName);
    }
    return tree;
  }

  TreeOps.selectNew = function(tree, childrenPropertyName = "childs", ...fieldsNames) {
    var arr = [];
    for (var i = 0; i < tree.length; i++) {
      var item = {};
      for (var f of fieldsNames) {
        item[f] = tree[i][f];
      }
      if (!item[childrenPropertyName] && tree[i][childrenPropertyName]) {
        item[childrenPropertyName] = tree[i][childrenPropertyName];
      }
      if (item[childrenPropertyName] && item[childrenPropertyName].length > 0) {
        item[childrenPropertyName] = this.selectNew(item[childrenPropertyName], childrenPropertyName, ...fieldsNames);
      }
      arr.push(item);
    }
    return arr;
  }


  return TreeOps;

}));