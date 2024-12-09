import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { BinaryTree } from './tree_help/binaryTree';
import { updateTree } from './tree_help/updateTree';
import { animateInsertion, animateSearch } from './tree_help/animations';
import '../styles/tree.css';

export function Tree() {
  const [binaryTree] = useState(new BinaryTree());
  const [value, setValue] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleInsert = () => {
    const path = binaryTree.addAndTrackPath(parseInt(value));
    animateInsertion(path, setNodes, () => {
      updateTree(binaryTree, setNodes, setEdges);
      setValue('');
    });
  };

  const handleDelete = () => {
    binaryTree.remove(parseInt(value));
    updateTree(binaryTree, setNodes, setEdges);
    setValue('');
  };

  const handleSearch = () => {
    const path = binaryTree.searchAndTrackPath(parseInt(value));
    animateSearch(path, setNodes, () => {
      setValue('');
    });
  };

  return (
    <div className="tree-container">
      <h1>Binary Tree Visualization</h1>
      <div className="tree-input-container">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter node value"
        />
        <button onClick={handleInsert}>Add Node</button>
        <button onClick={handleDelete}>Delete Node</button>
        <button onClick={handleSearch}>Search Node</button>
      </div>
      <div className="react-flow-container">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}
