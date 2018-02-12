/**
 * @license
 * tree-operations 0.0.1
 * Copyright Sylvain Longepée
 * Released under MIT license <https://github.com/Sylvain59650/tree-operations/blob/master/LICENSE>
 */

;
(function(moduleName, root, factory) {
  if (typeof define === 'function' && define.amd) {
    // define([""], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    Array = factory();
  }
}("TreeModule", this, function() {
  'use strict';

  Array.prototype.flatten = function(childrenPropertyName, reversible) {
    var tree = this;
    if (reversible != true) reversible = false;
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

  Array.prototype.unflatten = function(predicateChild, childrenPropertyName = "childs") {
    var list = this;
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

  return Array;

}));