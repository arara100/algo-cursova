export const tarjan = (g) => {
    const { nodes, edges } = g;
    let idx = 0;
    const stack = [];
    const index = {};
    const low = {};
    const onStack = {};
    const sccs = [];
    const steps = [];
  
    const dfs = (n) => {
      index[n.id] = idx;
      low[n.id] = idx;
      idx++;
      stack.push(n.id);
      onStack[n.id] = true;
  
      steps.push({ type: "start", node: n.id, stack: [...stack], sccs: [...sccs] });
  
      edges
        .filter((e) => e.from === n.id)
        .forEach((e) => {
          if (index[e.to] === undefined) {
            steps.push({ type: "edge", edge: e });
            dfs(nodes.find((no) => no.id === e.to));
            low[n.id] = Math.min(low[n.id], low[e.to]);
          } else if (onStack[e.to]) {
            low[n.id] = Math.min(low[n.id], index[e.to]);
            steps.push({ type: "edge", edge: e });
          }
        });
  
      if (low[n.id] === index[n.id]) {
        const scc = [];
        let w;
        do {
          w = stack.pop();
          onStack[w] = false;
          scc.push(w);
        } while (w !== n.id);
        sccs.push(scc);
        steps.push({ type: "component", scc, stack: [...stack], sccs: [...sccs] });
      }
    };
  
    nodes.forEach((n) => {
      if (index[n.id] === undefined) {
        dfs(n);
      }
    });
  
    return steps;
  };
  