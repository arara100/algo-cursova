export const tarjan = (graph) => {
  const { nodes, edges } = graph;
  let idx = 0;
  const stack = [];
  const index = {};
  const low = {};
  const onStack = {};
  const sccs = [];
  const steps = [];

  const dfs = (node) => {
    index[node.id] = idx;
    low[node.id] = idx;
    idx++;
    stack.push(node.id);
    onStack[node.id] = true;

    steps.push({
      type: "start",
      node: node.id,
      stack: [...stack],
      sccs: [...sccs],
    });

    edges
      .filter((edge) => edge.from === node.id)
      .forEach((edge) => {
        if (index[edge.to] === undefined) {
          steps.push({ type: "edge", edge: edge });
          dfs(nodes.find((node) => node.id === edge.to));
          low[node.id] = Math.min(low[node.id], low[edge.to]);
        } else if (onStack[edge.to]) {
          low[node.id] = Math.min(low[node.id], index[edge.to]);
          steps.push({ type: "edge", edge: edge });
        }
      });

    if (low[node.id] === index[node.id]) {
      const scc = [];
      let current;
      do {
        current = stack.pop();
        onStack[current] = false;
        scc.push(current);
      } while (current !== node.id);
      sccs.push(scc);
      steps.push({
        type: "component",
        scc: scc,
        stack: [...stack],
        sccs: [...sccs],
      });
    }
  };

  nodes.forEach((node) => {
    if (index[node.id] === undefined) {
      dfs(node);
    }
  });

  return steps;
};
