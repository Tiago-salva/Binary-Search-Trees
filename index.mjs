class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree(this.array);
  }

  // It add a new node to the final of the subtree, like a leaf
  insert(value, currentNode = this.root) {
    // If the tree it's empty, the new Node it's going to be the root
    if (currentNode === null) {
      this.root = new Node(value);
      return;
    }

    // If the value it's less than the root, go to left
    if (value < currentNode.value) {
      if (currentNode.left === null) {
        // If there's no left child, insert it here
        currentNode.left = new Node(value);
      } else {
        // If there's a left child, keep loking recursively
        this.insert(value, currentNode.left);
      }
    } else {
      if (currentNode.right === null) {
        // If there's no right child, insert it here
        currentNode.right = new Node(value);
      } else {
        // If there's a right child, keep loking recursively
        this.insert(value, currentNode.right);
      }
    }
  }

  // Function to remove a item
  deleteItem(value, currentNode = this.root) {
    if (currentNode === null) return currentNode;

    if (value < currentNode.value) {
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else if (value > currentNode.value) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else {
      // Node found, handle the different cases of remove
      if (currentNode.left === null) {
        // Case 1: Node have 1 child or none (left or none)
        return currentNode.right;
      } else if (currentNode.right === null) {
        // Caso 2: Node have a right child
        return currentNode.left;
      } else {
        // Caso 3: Node have 2 childs
        const successor = this.findMin(currentNode.right); // Find the minor in the right subtree
        currentNode.value = successor.value; // Replace value
        currentNode.right = this.deleteItem(successor.value, currentNode.right); // Remove successor
      }
    }

    return currentNode;
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Function that returns the node with the given value
  find(value, currentNode = this.root) {
    if (value === currentNode.value) {
      return currentNode;
    }

    if (value < currentNode.value) {
      return this.find(value, currentNode.left);
    }

    if (value > currentNode.value) {
      return this.find(value, currentNode.right);
    }

    return null;
  }

  // Function that traverse the tree in breadth-first level order
  levelOrder(callback) {
    if (!callback) return "You need a callback function";

    const queue = [];
    queue.push(this.root);
    let current = null;
    while (queue.length > 0) {
      current = queue.shift();
      callback(current); // Process the current node
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrder(callback, currentNode = this.root) {
    if (!callback) return "You need a callback function";

    if (!currentNode) return;

    this.inOrder(callback, currentNode.left);
    callback(currentNode);
    this.inOrder(callback, currentNode.right);
  }

  preOrder(callback, currentNode = this.root) {
    if (!callback) return "You need a callback function";

    if (!currentNode) return;

    callback(currentNode);

    this.preOrder(callback, currentNode.left);
    this.preOrder(callback, currentNode.right);
  }

  postOrder(callback, currentNode = this.root) {
    if (!callback) return "You need a callback function";

    if (!currentNode) return;

    this.postOrder(callback, currentNode.left);
    this.postOrder(callback, currentNode.right);
    callback(currentNode);
  }

  // Function that returns the given node's height
  height(node) {
    // Find the node
    const startNode = this.find(node);
    if (!startNode) return -1; // If not found, return -1

    const calculateHeight = (currentNode) => {
      if (!currentNode) return -1;

      const leftHeight = calculateHeight(currentNode.left);
      const rightHeight = calculateHeight(currentNode.right);

      return 1 + Math.max(leftHeight, rightHeight);
    };

    // Call the function recursively from the node
    return calculateHeight(startNode);
  }

  // Function that returns the given node’s depth
  depth(node, currentNode = this.root, depth = 0) {
    if (!node) return null;

    if (!currentNode) return -1;

    if (node === currentNode.value) {
      return depth;
    } else if (node < currentNode.value) {
      return this.depth(node, currentNode.left, depth + 1);
    } else if (node > currentNode.value) {
      return this.depth(node, currentNode.right, depth + 1);
    }
  }

  // Function that checks if the tree is balanced
  isBalanced(currentNode = this.root) {
    function checkHeight(node) {
      if (!node) return 0;

      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return 1 + Math.max(leftHeight, rightHeight);
    }

    return checkHeight(currentNode) !== -1;
  }

  // Function that rebalances an unbalanced tree
  rebalance() {
    const sortedValues = [];
    this.inOrder((node) => sortedValues.push(node.value)); // Add all the nodes to an array
    this.root = buildTree(sortedValues);
  }
}

// Transform all the elements into nodes, and create the tree
function buildTree(array) {
  if (array.length === 0) return null;

  const mid = Math.floor(array.length / 2);
  const midElement = array[mid];

  const left = buildTree(array.slice(0, mid));
  const right = buildTree(array.slice(mid + 1));

  const newNode = new Node(midElement, left, right);
  return newNode;
}
