export const build = (list) => {
  const nodes = [];
  const edges = [];
  const nodeSize = 30;
  const width = 1000;
  const height = 500;

  const isOverlapping = (x, y) => {
    return nodes.some(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < nodeSize * 2; 
    });
  };

  list.forEach((neighbors, node) => {
    let x, y;
    do {
      x = Math.random() * (width - 2 * nodeSize) + nodeSize;
      y = Math.random() * (height - 2 * nodeSize) + nodeSize;
    } while (isOverlapping(x, y));

    nodes.push({ id: node, x, y });

    neighbors.forEach((neighbor) => {
      edges.push({ from: node, to: neighbor });
    });
  });

  return { nodes, edges };
};
