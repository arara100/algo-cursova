export const generateGraph = (node, x, y, nodes, edges, parent = null, level = 0) => {
  if (!node) return;

  const newNode = {
    id: node.value.toString(),
    data: { label: node.value.toString() },
    position: { x, y },
    style: { transition: 'all 0.5s ease-in-out' },
  };
  nodes.push(newNode);

  if (parent) {
    edges.push({
      id: `${parent}-${node.value}`,
      source: parent,
      target: node.value.toString(),
      animated: true,
    });
  }

  const offsetX = level > 0 ? 200 / (level + 1) : 300;
  const offsetY = 100;

  generateGraph(node.left, x - offsetX, y + offsetY, nodes, edges, node.value.toString(), level + 1);
  generateGraph(node.right, x + offsetX, y + offsetY, nodes, edges, node.value.toString(), level + 1);
};
