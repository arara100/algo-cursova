import { generateGraph } from './functions';

export const updateTree = (binaryTree, setNodes, setEdges) => {
  const nodes = [];
  const edges = [];
  generateGraph(binaryTree.root, 0, 0, nodes, edges);
  setNodes([...nodes]);
  setEdges([...edges]);
};
