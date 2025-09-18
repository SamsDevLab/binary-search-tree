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

  /*************************/

  findNode(root, value) {
    if (root === null) return root;

    if (root.data > value) {
      let foundNode = this.findNode(root.left, value);
      return foundNode;
    } else if (root.data < value) {
      let foundNode = this.findNode(root.right, value);
      return foundNode;
    } else if (root.data === value) {
      return root;
    }

    return foundNode;
  }

  find(value) {
    const root = this.root;

    const foundNode = this.findNode(root, value);

    return foundNode;
  }

  /*************************/

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    const queue = [this.root];

    const recurseLevelOrder = (callback) => {
      if (queue.length === 0) return;

      const visitedNode = queue.shift();

      if (visitedNode.left !== null) queue.push(visitedNode.left);
      if (visitedNode.right !== null) queue.push(visitedNode.right);

      const callbackValue = callback(visitedNode);

      console.log(callbackValue);

      recurseLevelOrder(callback);
    };

    recurseLevelOrder(callback);

    //----

    const iterateLevelOrder = (callback) => {
      while (queue.length !== 0) {
        const visitedNode = queue.shift();

        if (visitedNode.left !== null) queue.push(visitedNode.left);
        if (visitedNode.right !== null) queue.push(visitedNode.right);

        const callbackValue = callback(visitedNode);

        console.log(callbackValue);
      }
    };

    iterateLevelOrder(callback);
  }

  /*************************/

  // Visit <left> <root> <right>
  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    const rootNode = this.root;

    const inOrderRecursion = (rootNode, callback) => {
      if (rootNode === null) return;

      inOrderRecursion(rootNode.left, callback);
      console.log(callback(rootNode));
      inOrderRecursion(rootNode.right, callback);
    };

    inOrderRecursion(rootNode, callback);
  }

  //----

  // - Visit <root> <left> <right>
  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    const rootNode = this.root;

    const preOrderRecursion = (rootNode, callback) => {
      if (rootNode === null) return;

      console.log(callback(rootNode));

      preOrderRecursion(rootNode.left, callback);
      preOrderRecursion(rootNode.right, callback);
    };

    preOrderRecursion(rootNode, callback);
  }

  //----

  // - Visit <left> <right> <root>
  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    const rootNode = this.root;

    const postOrderRecursion = (rootNode, callback) => {
      if (rootNode === null) return;

      postOrderRecursion(rootNode.right, callback);
      postOrderRecursion(rootNode.left, callback);
      console.log(callback(rootNode));
    };

    postOrderRecursion(rootNode, callback);
  }

  /*************************/

  height(value) {
    const targetNode = this.find(value);

    if (targetNode === null) return null;

    const findHeight = (root) => {
      if (root === null) return -1;

      const leftHeight = findHeight(root.left);
      const rightHeight = findHeight(root.right);

      return Math.max(leftHeight, rightHeight) + 1;
    };

    const total = findHeight(targetNode);

    return total;
  }

  /*************************/

  depth(value) {
    const targetNode = this.find(value);

    if (targetNode === null) return null;

    const root = this.root;

    const findDepth = (root, targetNode) => {
      if (root.data > targetNode.data) {
        return findDepth(root.left, targetNode) + 1;
      } else if (root.data < targetNode.data) {
        return findDepth(root.right, targetNode) + 1;
      } else {
        return 0;
      }
    };

    const total = findDepth(root, targetNode);

    return total;
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
