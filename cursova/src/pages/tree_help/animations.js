export const animateInsertion = (path, setNodes, callback) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= path.length) {
      clearInterval(interval);
      callback();
      return;
    }

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === path[i].toString()
          ? { ...node, className: 'node-orange' }
          : node
      )
    );
    i++;
  }, 500);
};

export const animateSearch = (path, setNodes, callback) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= path.length) {
      clearInterval(interval);
      setTimeout(() => {
        resetNodeStyles(setNodes);
        callback();
      }, 3000);
      return;
    }

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === path[i].toString()) {
          const className = i === path.length - 1 ? 'node-green' : 'node-blue';
          return { ...node, className };
        }
        return node;
      })
    );
    i++;
  }, 500);
};

const resetNodeStyles = (setNodes) => {
  setNodes((prevNodes) =>
    prevNodes.map((node) => ({
      ...node,
      className: '',
    }))
  );
};
