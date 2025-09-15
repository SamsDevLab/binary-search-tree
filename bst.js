#!/usr/bin/env node

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  recursivelyInsert(root, value) {
    if (root === null) return new Node(value);

    if (value < root.data) {
      root.left = this.recursivelyInsert(root.left, value);
    } else if (value > root.data) {
      root.right = this.recursivelyInsert(root.right, value);
    }

    return root;
  }

  insert(value) {
    const root = this.root;

    if (root.data === value) return root;

    this.recursivelyInsert(root, value);
  }

  createNodeRecursively(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    const root = new Node(arr[mid]);

    root.left = this.createNodeRecursively(arr, start, mid - 1);
    root.right = this.createNodeRecursively(arr, mid + 1, end);

    return root;
  }

  buildTree(array) {
    console.log(array);
    const sortedArr = array.sort((a, b) => a - b);
    const uniqueArr = [...new Set(sortedArr)];

    const start = 0;
    const end = uniqueArr.length - 1;

    const root = this.createNodeRecursively(uniqueArr, start, end);

    return root;
  }
}

// Print Binary Tree
export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
