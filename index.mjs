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

  // Function that accepts a callback function as it's parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses.
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

  // Primero el subarbol izquierdo, luego el nodo actual y por ultimo el subarbol derecho
  inOrder(callback, currentNode = this.root) {
    if (!callback) return "You need a callback function";

    if (!currentNode) return;

    this.inOrder(callback, currentNode.left);
    callback(currentNode);
    this.inOrder(callback, currentNode.right);
  }

  // Primero el nodo actual, luego el subarbol izquierdo y por ultimo el subarbol derecho
  preOrder(callback, currentNode = this.root) {
    if (!callback) return "You need a callback function";

    if (!currentNode) return;

    callback(currentNode);

    this.preOrder(callback, currentNode.left);
    this.preOrder(callback, currentNode.right);
  }

  // Primero el subarbol izquierdo, luego el subarbol derecho y por ultimo el nodo actual
  postOrder(callback, currentNode = this.root) {
    if (!callback) return "You need a callback function";

    if (!currentNode) return;

    this.postOrder(callback, currentNode.left);
    this.postOrder(callback, currentNode.right);
    callback(currentNode);
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
