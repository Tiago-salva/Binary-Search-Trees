class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// Sirve para recorrer el arbol para futuras operaciones (set, remove, etc)
export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree(this.array);
  }

  // Add a new node to the final of the subtree, like a leaf
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

  // Delete a item
  deleteItem(value, currentNode = this.root) {
    if (currentNode === null) return currentNode; // Caso base: árbol vacío

    // Recorrer el árbol
    if (value < currentNode.value) {
      // El valor está en el subárbol izquierdo
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else if (value > currentNode.value) {
      // El valor está en el subárbol derecho
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else {
      // Nodo encontrado, manejar los casos de eliminación
      if (currentNode.left === null) {
        // Caso 1: Nodo tiene un solo hijo o ninguno (derecho o ninguno)
        return currentNode.right;
      } else if (currentNode.right === null) {
        // Caso 2: Nodo tiene un hijo izquierdo
        return currentNode.left;
      } else {
        // Caso 3: Nodo tiene dos hijos
        const successor = this.findMin(currentNode.right); // Buscar el menor en el subárbol derecho
        currentNode.value = successor.value; // Reemplazar datos
        currentNode.right = this.deleteItem(successor.value, currentNode.right); // Eliminar sucesor
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
}

// Transforma todos los elementos en nodos y crea el arbol
function buildTree(array) {
  if (array.length === 0) return null;

  const mid = Math.floor(array.length / 2);
  const midElement = array[mid];

  const left = buildTree(array.slice(0, mid));
  const right = buildTree(array.slice(mid + 1));

  const newNode = new Node(midElement, left, right);
  return newNode;
}
