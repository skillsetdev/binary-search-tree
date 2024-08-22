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
    const sortedArray = this.bubbleSort(array);
    if (start > end) {
      return null;
    }
    let mid = Math.floor((end + start) / 2);
    let rootNode = new Node(sortedArray[mid]);
    rootNode.left = this.buildTree(sortedArray, start, mid - 1);
    rootNode.right = this.buildTree(sortedArray, mid + 1, end);
    return rootNode;
  }
  bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
      // Last i elements are already in place
      for (var j = 0; j < arr.length - i - 1; j++) {
        // Checking if the item at present iteration is greater than the next iteration
        if (arr[j] > arr[j + 1]) {
          // then swap them
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
  insert(value) {
    let tmp = this.root;
    let parent = null;
    while (tmp !== null) {
      parent = tmp;
      if (value >= tmp.data) {
        tmp = tmp.right;
      } else {
        tmp = tmp.left;
      }
    }
    if (value > parent.data) {
      parent.right = new Node(value);
    } else if (value < parent.data) {
      parent.left = new Node(value);
    } else {
      return;
    }
  }
  deleteItem(value) {
    this.root = this.deleteRecursive(value, this.root);
  }
  deleteRecursive(value, node) {
    if (node === null) {
      return node;
    }
    if (value > node.data) {
      node.right = this.deleteRecursive(value, node.right);
    } else if (value < node.data) {
      node.left = this.deleteRecursive(value, node.left);
    } else {
      // if value matches the nodes data
      if (node.right === null) {
        return node.left;
      }
      if (node.left === null) {
        return node.right;
      }
      const successor = this.findSuccessor(node);
      node.data = successor.data;
      node.right = this.deleteRecursive(successor.data, node.right);
    }
    return node;
  }
  findSuccessor(node) {
    //find node with the next smaller value
    let successor = node;
    successor = successor.right;
    while (successor !== null && successor.left !== null) {
      successor = successor.left;
    }
    return successor;
  }
  find(value, node = this.root) {
    if (node === null) {
      return node;
    }
    if (value > node.data) {
      return this.find(value, node.right);
    }
    if (value < node.data) {
      return this.find(value, node.left);
    }
    if (value === node.data) {
      return node;
    }
  }
  levelOrder(callback) {
    let queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      callback(queue[0]);
      queue.shift();
    }
  }
  inOrder(callback, node = this.root) {
    //left->root->right
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }
  preOrder(callback, node = this.root) {
    //root -> left -> right
    if (node === null) {
      return;
    }
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }
  postOrder(callback, node = this.root) {
    //left -> right -> root
    if (node === null) {
      return;
    }
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }
  height(node) {
    if (node === null) {
      return -1;
    }
    if (this.height(node.right) > this.height(node.left)) {
      return this.height(node.right) + 1;
    } else {
      return this.height(node.left) + 1;
    }
  }
  depth(value, node = this.root) {
    if (node === null) {
      throw Error("Node not found");
    }
    if (value > node.data) {
      return this.depth(value, node.right) + 1;
    }
    if (value < node.data) {
      return this.depth(value, node.left) + 1;
    }
    if (value === node.data) {
      return 0;
    }
  }
  isBalanced() {
    return this.checkBalance() !== -1;
  }
  checkBalance(node = this.root) {
    if (node === null) {
      return 0;
    }
    const leftHeight = this.checkBalance(node.left);
    const rightHeight = this.checkBalance(node.right);
    if (leftHeight === -1 || rightHeight === -1) {
      return -1;
    }
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  }
  rebalance() {
    const newArray = [];
    const callback = function (node) {
      newArray.push(node.data);
    };
    this.inOrder(callback);
    this.root = this.buildTree(newArray, 0, newArray.length - 1);
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
let tree = new BinaryTree([1, 23, 8, 4, 3, 5, 7, 9, 67, 120, 6345, 324]);
tree.insert(455);
tree.insert(2300);
tree.insert(4029);
tree.insert(5939);
tree.prettyPrint(tree.root);
//tree.prettyPrint(tree.find(324));
/*function callback(node) {
  console.log(node.data);
}
tree.postOrder(callback);*/
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint(tree.root);
