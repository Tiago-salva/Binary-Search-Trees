import Tree from "./index.mjs";

// Function that returns the tree in the console
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Returns an array with random numbers
function randomCleanAndSortArray(minSize, maxSize, maxValue) {
  const arraySize = Math.floor(Math.random() * (maxSize - minSize) + minSize);
  const randomNumbers = [];

  while (randomNumbers.length < arraySize) {
    randomNumbers.push(Math.floor(Math.random() * maxValue));
  }

  return [...new Set(randomNumbers)].sort((a, b) => a - b);
}

// Tests
const sortedArray = randomCleanAndSortArray(5, 11, 100);
console.log(sortedArray);

const myTree = new Tree(sortedArray);
prettyPrint(myTree.root);
console.log(`It's balanced? ${myTree.isBalanced()}`);

console.log("Level order:");
myTree.levelOrder((node) => console.log(node.value));

console.log("Pre order:");
myTree.preOrder((node) => console.log(node.value));

console.log("Post order:");
myTree.postOrder((node) => console.log(node.value));

console.log("In order:");
myTree.inOrder((node) => console.log(node.value));

myTree.insert(104);
myTree.insert(150);
myTree.insert(127);
myTree.insert(145);
myTree.insert(190);
prettyPrint(myTree.root);
console.log(`It's balanced? ${myTree.isBalanced()}`);

myTree.rebalance();
prettyPrint(myTree.root);
console.log(`It's balanced? ${myTree.isBalanced()}`);

const sarray = [10, 5, 15, 3, 7, 13, 17];
const tree = new Tree(sarray);
console.log(tree.inOrder((node) => console.log(node.value)));
