class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  buildTree(array, start, end) {
    //base case -> when the length of a subarray becomes 0
    if (start > end) {
      return null;
    }
    let mid = Math.floor((end + start) / 2);
    let rootNode = new Node(array[mid]);
    rootNode.left = this.buildTree(array, start, mid - 1);
    rootNode.right = this.buildTree(array, mid + 1, end);
    return rootNode;
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
let tree = new BinaryTree([1, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.root, "", true);
