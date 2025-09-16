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

  /*************************/

  createNodeRecursively(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    const root = new Node(arr[mid]);

    root.left = this.createNodeRecursively(arr, start, mid - 1);
    root.right = this.createNodeRecursively(arr, mid + 1, end);

    return root;
  }

  buildTree(array) {
    const sortedArr = array.sort((a, b) => a - b);
    const uniqueArr = [...new Set(sortedArr)];

    const start = 0;
    const end = uniqueArr.length - 1;

    const root = this.createNodeRecursively(uniqueArr, start, end);

    return root;
  }

  /*************************/

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

  /*************************/

  getSuccessor(root) {
    let current = root.right;

    while (current.left !== null) {
      current = current.left;
    }

    return current;
  }

  /*
  Pseudo:
1. Check to see if root === null.
  - If so, return 'root' as this means you have hit the end of the line
    without finding the value (it's not in the binary search tree)
2. Check if value < root
  - If so, you'll need to recurse left until you find value
3. Check if value > root
  - If so, you'll need to recurse right until you find value
4. Once the value is found you'll need to see if it has children
  */

  deleteNode(root, value) {
    if (root === null) return root;

    if (root.data > value) {
      root.left = this.deleteNode(root.left, value);
    } else if (root.data < value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      const successor = this.getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteNode(root.right, successor.data);
    }

    return root;
  }

  delete(value) {
    const root = this.root;

    this.deleteNode(root, value);
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
