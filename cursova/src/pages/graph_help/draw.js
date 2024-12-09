export const draw = (canvas, nodes, edges, step) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const colors = ["#e57373", "#81c784", "#64b5f6", "#ffb74d", "#ba68c8"];
    const colorMap = {};
  
    if (step && step.sccs) {
      step.sccs.forEach((scc, i) => {
        scc.forEach((n) => {
          colorMap[n] = colors[i % colors.length];
        });
      });
    }
  
    edges.forEach((e) => {
      const from = nodes.find((n) => n.id === e.from);
      const to = nodes.find((n) => n.id === e.to);
      const isEdge = step?.type === "edge" && step.edge.from === e.from && step.edge.to === e.to;
      arrow(ctx, from, to, isEdge);
    });
  
    nodes.forEach((n) => {
      const isNode = step?.node === n.id;
      const isAnim = isNode && step?.type === "start";
      const fillColor = isAnim ? animateColor(n.id) : "#fff";
  
      ctx.fillStyle = fillColor;
      ctx.strokeStyle = isNode ? "#f50057" : "#000";
      ctx.lineWidth = isNode ? 4 : 2;
  
      ctx.beginPath();
      ctx.arc(n.x, n.y, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
  
      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.fillText(n.id, n.x - 6, n.y + 5);
    });
  };
  
  const animateColor = (id) => {
    let start = { r: 255, g: 255, b: 255 };
    let end = { r: 245, g: 0, b: 87 };
    let progress = 0;
    let color = interpolate(start, end, progress);
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };
  
  const interpolate = (start, end, progress) => {
    let r = Math.round(start.r + (end.r - start.r) * progress);
    let g = Math.round(start.g + (end.g - start.g) * progress);
    let b = Math.round(start.b + (end.b - start.b) * progress);
    return { r, g, b };
  };
  
  const arrow = (ctx, from, to, isEdge) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx * dx + dy * dy);
  
    ctx.strokeStyle = isEdge ? "#2196f3" : "#000";
    ctx.lineWidth = isEdge ? 3 : 1.5;
  
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x - 20 * Math.cos(angle), to.y - 20 * Math.sin(angle));
    ctx.stroke();
  
    const headLength = 10;
    ctx.beginPath();
    ctx.moveTo(to.x - 20 * Math.cos(angle), to.y - 20 * Math.sin(angle));
    ctx.lineTo(to.x - 20 * Math.cos(angle) - headLength * Math.cos(angle - Math.PI / 6), to.y - 20 * Math.sin(angle) - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(to.x - 20 * Math.cos(angle) - headLength * Math.cos(angle + Math.PI / 6), to.y - 20 * Math.sin(angle) - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = isEdge ? "#2196f3" : "#000";
    ctx.fill();
  };
  