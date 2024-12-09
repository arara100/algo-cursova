import React, { useState, useRef, useEffect } from "react";
import { build } from "./graph_help/build";
import { tarjan } from "./graph_help/tarjan";
import { draw } from "./graph_help/draw";
import { update } from "./graph_help/animate";
import { useStateGraph } from "./graph_help/useState";
import { renderComps } from "./graph_help/render";
import "../styles/graph.css";

const Graph = () => {
  const list = [
    [1, 2],
    [2, 3],
    [3],
    [4],
    [0]
  ];

  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [steps, setSteps] = useState([]);
  const [showComps, setShowComps] = useState(false);

  const { step, play, comps, next, prev, togglePlay, restart } = useStateGraph(steps);

  useEffect(() => {
    const g = build(list);
    const s = tarjan(g);
    setSteps(s);
    setNodes(g.nodes);
    setEdges(g.edges);
  }, []);

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        next();
        if (step === steps.length - 1) {
          togglePlay();
          update();
          setShowComps(true);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [play, step, steps, next]);

  useEffect(() => {
    draw(canvasRef.current, nodes, edges, steps[step]);
  }, [step, nodes, edges, steps]);

  return (
    <div className="container">
      <canvas ref={canvasRef} width={1000} height={500} />
      <div>
        <button onClick={restart}>Restart</button>
        <button onClick={togglePlay}>{play ? "Pause" : "Play"}</button>
        <button onClick={prev} disabled={step === 0}>
          Back
        </button>
        <button onClick={next} disabled={step === steps.length - 1}>
          Forward
        </button>
      </div>
      {showComps && renderComps(comps)}
    </div>
  );
};

export { Graph };
