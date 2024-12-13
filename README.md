# Binary Search Tree Project

This project implements a **Binary Search Tree (BST)** in JavaScript, including functionality for common operations such as insertion, deletion, traversal, and balancing. It is designed as a learning exercise to better understand data structures and algorithms.

---

## Features

- **Insertion**: Add new values to the tree while maintaining BST properties.
- **Deletion**: Remove values from the tree while maintaining balance.
- **Search**: Find specific values efficiently.
- **Traversal**: Perform different types of tree traversal (in-order, pre-order, post-order, level-order).
- **Tree Properties**: Calculate height and depth of nodes, and check if the tree is balanced.
- **Rebalancing**: Transform an unbalanced tree into a balanced one.

---

## Functions Overview

### 1. `insert(value)`

Adds a new value to the tree. The function ensures that the BST property is preserved:

- Values smaller than the current node go to the left subtree.
- Values greater than the current node go to the right subtree.

### 2. `deleteItem(value)`

Removes a node with the specified value while maintaining the BST structure:

- Handles cases for nodes with no children, one child, or two children.
- If the node has two children, the function finds the in-order successor or predecessor to replace the deleted node.

### 3. `find(value)`

Finds and returns the node containing the given value. If the value does not exist in the tree, it returns `null`.

### 4. `levelOrder(callback)`

Traverses the tree in breadth-first order (level by level). It applies a callback function to each node. If no callback is provided, the function returns an array of all node values in level-order.

### 5. `inOrder(callback)`

Traverses the tree in in-order sequence (left, root, right). It applies a callback function to each node. If no callback is provided, the function returns an array of all node values in in-order.

### 6. `preOrder(callback)`

Traverses the tree in pre-order sequence (root, left, right). It applies a callback function to each node. If no callback is provided, the function returns an array of all node values in pre-order.

### 7. `postOrder(callback)`

Traverses the tree in post-order sequence (left, right, root). It applies a callback function to each node. If no callback is provided, the function returns an array of all node values in post-order.

### 8. `height(node)`

Calculates the height of the given node:

- Height is defined as the number of edges on the longest path from the node to a leaf.
- If the node is `null`, the function returns `-1`.

### 9. `depth(node)`

Calculates the depth of the given node:

- Depth is defined as the number of edges from the root to the node.
- If the node is not found, the function returns `null`.

### 10. `isBalanced()`

Checks if the tree is balanced:

- A tree is balanced if the height difference between the left and right subtrees of every node is at most 1.
- Returns `true` if balanced, otherwise `false`.

### 11. `rebalance()`

Rebalances the tree to ensure it remains efficient:

- Performs an in-order traversal to get a sorted array of node values.
- Rebuilds the tree using the `buildTree` function to create a balanced structure.

### 12. `buildTree(array)`

Constructs a balanced BST from a sorted array:

- The middle element of the array becomes the root.
- Recursively applies the same logic to the left and right halves of the array.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd binary-search-tree
   ```

3. Run the script using Node.js:
   ```bash
   node index.js
   ```

---

## Example Usage

```javascript
// Create an array
const randomNumbers = randomCleanAndSortArray(minSize, maxSize, maxValue);

// Create the tree with the array
const tree = new Tree(randomNumbers);

// Check if the tree is balanced
console.log(tree.isBalanced()); // true

// Perform an in-order traversal
console.log(tree.inOrder()); // [3, 5, 7, 10, 13, 15, 17]

// Delete a value
tree.deleteItem(10);

// Rebalance the tree if necessary
if (!tree.isBalanced()) {
  tree.rebalance();
}
```

---

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you see fit.

---

## Acknowledgments

This project was inspired by the need to deepen understanding of binary search trees as part of learning data structures and algorithms.
