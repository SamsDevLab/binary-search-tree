#!/usr/bin/env node

import { Tree } from "./bst.js";
import { prettyPrint } from "./bst.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(arr);

// 'Insert' Method:
// newTree.insert(6500);
// newTree.insert(6750);
// newTree.insert(7000);

// 'Delete' Method:
// newTree.delete(1);

// 'Find' Method
// console.log(newTree.find(5));
// console.log(newTree.find(67));

// 'Level Order For Each' Method w/ Callback
const multiplyNodeByTwo = (node) => {
  const product = node.data * 2;

  return product;
};
// newTree.levelOrderForEach(multiplyNodeByTwo);

// 'Pre Order For Each' Method
// newTree.preOrderForEach(multiplyNodeByTwo);

// 'In Order For Each' Method
// newTree.inOrderForEach(multiplyNodeByTwo);

// 'Post Order For Each' Method
// newTree.postOrderForEach(multiplyNodeByTwo);

// 'Height' Method
// console.log(newTree.height(67));

// 'Depth' Method
// console.log(newTree.depth(7));

// 'Is Balanced' Method
console.log(newTree.isBalanced());

prettyPrint(newTree.root);
