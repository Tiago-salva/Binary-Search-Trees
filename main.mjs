import Tree from "./index.mjs";

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

// function debugTree(node) {
//     if (node === null) return;
//     console.log(`Node: ${node.value}, Left: ${node.left?.value}, Right: ${node.right?.value}`);
//     debugTree(node.left);
//     debugTree(node.right);
// }

function cleanAndSortArray(array) {
  // Eliminar duplicados y ordenar el array
  return [...new Set(array)].sort((a, b) => a - b);
}

let sortedArray = cleanAndSortArray([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

const myTree = new Tree(sortedArray);

// console.log(`Array: ${sortedArray}`);

// console.log("-------");

prettyPrint(myTree.root);

// myTree.insert(2);
// console.log("----------");

// prettyPrint(myTree.root);

myTree.deleteItem(67);
console.log("----------");

prettyPrint(myTree.root);
