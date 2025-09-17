#!/usr/bin/env node

import { Tree } from "./bst.js";
import { prettyPrint } from "./bst.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(arr);

// 'Insert' Method:
// newTree.insert(2);
// newTree.insert(6);

// 'Delete' Method:
// newTree.delete(1);

// 'Find' Method
// console.log(newTree.find(5));
// console.log(newTree.find(67));

// 'Level Order For Each' Method
const multiplyNodeByTwo = (node) => {
  const product = node.data * 2;

  return product;
};
newTree.levelOrderForEach(multiplyNodeByTwo);

// prettyPrint(newTree.root);
