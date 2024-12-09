export const addnode = (nodes, edges, newNode) => {
    if (!nodes.includes(newNode)) {
      const updatedNodes = [...nodes, newNode]; // створення нового масиву вузлів
      return { nodes: updatedNodes, edges };
    }
    return { nodes, edges };
  };  
  
  export const addedge = (edges, from, to) => {
    if (!edges.some(edge => edge.from === from && edge.to === to)) {
      const updatedEdges = [...edges, { from, to }]; // створення нового масиву ребер
      return updatedEdges;
    }
    return edges;
  };
  