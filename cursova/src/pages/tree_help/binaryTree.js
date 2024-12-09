class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  export class BinaryTree {
    constructor() {
      this.root = null;
    }
  
    add(value) {
      const newNode = new TreeNode(value);
      if (this.root === null) {
        this.root = newNode;
        return;
      }
      this._addNode(this.root, newNode);
    }
  
    addAndTrackPath(value) {
      const newNode = new TreeNode(value);
      const path = [];
      if (this.root === null) {
        this.root = newNode;
        return path;
      }
      this._addNodeAndTrack(this.root, newNode, path);
      return path;
    }
  
    _addNode(node, newNode) {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this._addNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this._addNode(node.right, newNode);
        }
      }
    }
  
    _addNodeAndTrack(node, newNode, path) {
      path.push(node.value);
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this._addNodeAndTrack(node.left, newNode, path);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this._addNodeAndTrack(node.right, newNode, path);
        }
      }
    }
  
    remove(value) {
      this.root = this._removeNode(this.root, value);
    }
  
    _removeNode(node, value) {
      if (node === null) return null;
  
      if (value < node.value) {
        node.left = this._removeNode(node.left, value);
      } else if (value > node.value) {
        node.right = this._removeNode(node.right, value);
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
  
        let minRight = this._findMin(node.right);
        node.value = minRight.value;
        node.right = this._removeNode(node.right, minRight.value);
      }
  
      return node;
    }
  
    _findMin(node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node;
    }
  
    traverse() {
      const result = [];
      this._inOrder(this.root, result);
      return result;
    }
  
    _inOrder(node, result) {
      if (node === null) return;
      this._inOrder(node.left, result);
      result.push(node.value);
      this._inOrder(node.right, result);
    }
  
    searchAndTrackPath(value) {
      const path = [];
      this._searchAndTrack(this.root, value, path);
      return path;
    }
  
    _searchAndTrack(node, value, path) {
      if (node === null) return;
      path.push(node.value);
  
      if (value < node.value) {
        this._searchAndTrack(node.left, value, path);
      } else if (value > node.value) {
        this._searchAndTrack(node.right, value, path);
      }
    }
  }
  