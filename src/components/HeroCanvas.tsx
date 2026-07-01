/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  type: 'server' | 'database' | 'client' | 'node';
  active: boolean;
}

interface Connection {
  from: Node;
  to: Node;
  progress: number;
  speed: number;
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    let connections: Connection[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseIn = false;

    const nodeLabels = [
      'Sovereon-VM', 'Sovereon-Auth', 'Core-Cluster',
      'NexusMesh-1', 'NexusMesh-2', 'SovereonVault-Alpha',
      'Database-Neon', 'Redis-Cache', 'Client-Web-01',
      'Client-App-02', 'Storage-R2-Node', 'Sanity-CMS-01'
    ];

    const initNodes = (width: number, height: number) => {
      nodes = [];
      connections = [];
      const nodeCount = Math.min(12, Math.floor((width * height) / 45000) + 4);

      for (let i = 0; i < nodeCount; i++) {
        const typeRand = Math.random();
        const type: Node['type'] = 
          typeRand < 0.25 ? 'server' :
          typeRand < 0.5 ? 'database' :
          typeRand < 0.75 ? 'node' : 'client';

        nodes.push({
          x: Math.random() * (width - 100) + 50,
          y: Math.random() * (height - 100) + 50,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: type === 'server' ? 6 : type === 'database' ? 5 : type === 'node' ? 4 : 3.5,
          label: nodeLabels[i % nodeLabels.length],
          type,
          active: Math.random() > 0.3,
        });
      }

      // Create a connected network
      for (let i = 0; i < nodes.length; i++) {
        // Connect to nearest 2-3 nodes
        const targets = [...nodes]
          .map((node, index) => ({ node, index, dist: Math.hypot(node.x - nodes[i].x, node.y - nodes[i].y) }))
          .filter(item => item.index !== i)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, Math.floor(Math.random() * 2) + 2);

        targets.forEach(target => {
          // Avoid duplicate connection tracking
          const exists = connections.some(
            c => (c.from === nodes[i] && c.to === target.node) || (c.from === target.node && c.to === nodes[i])
          );
          if (!exists) {
            connections.push({
              from: nodes[i],
              to: target.node,
              progress: Math.random(),
              speed: 0.002 + Math.random() * 0.003
            });
          }
        });
      }
    };

    // ResizeObserver implementation to guarantee desktop/mobile canvas accuracy
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // set canvas resolution matching its physical width/height * pixel ratio
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        initNodes(width, height);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Draw elegant background grid lines inside the canvas too
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update positions and handle node boundaries
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundaries with a small buffer
        if (node.x < 30 || node.x > width - 30) node.vx *= -1;
        if (node.y < 30 || node.y > height - 30) node.vy *= -1;

        // Subtle magnetism to the user's cursor
        if (isMouseIn) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.15;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }
      });

      // Draw Connecting Cable Lines
      connections.forEach(conn => {
        const dx = conn.to.x - conn.from.x;
        const dy = conn.to.y - conn.from.y;
        const dist = Math.hypot(dx, dy);

        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);

        // Highlight lines when hovered
        const mouseFromDist = Math.hypot(mouseX - conn.from.x, mouseY - conn.from.y);
        const mouseToDist = Math.hypot(mouseX - conn.to.x, mouseY - conn.to.y);
        
        if (isMouseIn && (mouseFromDist < 120 || mouseToDist < 120)) {
          ctx.strokeStyle = 'rgba(255, 69, 0, 0.18)';
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = 'rgba(15, 15, 17, 0.06)';
          ctx.lineWidth = 1;
        }
        ctx.stroke();

        // Animate Data Packets flowing on the lines
        conn.progress += conn.speed;
        if (conn.progress > 1) {
          conn.progress = 0;
          conn.speed = 0.002 + Math.random() * 0.003;
        }

        const px = conn.from.x + dx * conn.progress;
        const py = conn.from.y + dy * conn.progress;

        // Draw packet
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 69, 0, 0.75)';
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 69, 0, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw system nodes
      let hoveredLabel: string | null = null;
      nodes.forEach(node => {
        const isHovered = isMouseIn && Math.hypot(mouseX - node.x, mouseY - node.y) < 16;
        if (isHovered) {
          hoveredLabel = node.label;
        }

        // Draw outer ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered ? 6 : 4), 0, Math.PI * 2);
        ctx.strokeStyle = isHovered 
          ? 'rgba(255, 69, 0, 0.25)' 
          : 'rgba(15, 15, 17, 0.05)';
        ctx.lineWidth = isHovered ? 2 : 1.5;
        ctx.stroke();

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered 
          ? '#FF4500' 
          : node.type === 'server' ? '#1E1E22' : node.type === 'database' ? '#52525B' : '#71717A';
        ctx.fill();

        // Node type badge details
        if (node.type === 'server' || node.type === 'database') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        }

        // Render beautiful typography labels on hover or for key servers
        if (isHovered || node.type === 'server') {
          ctx.font = '500 10px "JetBrains Mono", monospace';
          ctx.fillStyle = isHovered ? '#FF4500' : '#1E1E22';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y - (node.radius + 12));
        }
      });

      if (hoveredLabel !== hoveredNode) {
        setHoveredNode(hoveredLabel);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Mouse interactive events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      isMouseIn = true;
    };

    const handleMouseLeave = () => {
      isMouseIn = false;
      setHoveredNode(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoveredNode]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full rounded-2xl border border-brand-border bg-white shadow-sm overflow-hidden flex items-center justify-center cursor-crosshair group"
      id="hero-schematic-container"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      
      {/* Decorative Blueprint Corner Accents */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-brand-gray/50 uppercase select-none pointer-events-none">
        SOV-SYS-09 // ACTIVE CLUSTERS
      </div>
      <div className="absolute top-4 right-4 font-mono text-[9px] text-brand-orange/60 font-semibold uppercase select-none pointer-events-none flex items-center space-x-1.5 animate-pulse">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
        <span>LIVEMESH OK</span>
      </div>
      
      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-brand-gray/40 select-none pointer-events-none">
        COORD: {hoveredNode ? `@${hoveredNode}` : 'STATIC_SWEEP'}
      </div>
      
      {/* Technical coordinate grids in four corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-dark/20"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-dark/20"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-dark/20"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-dark/20"></div>

      {/* Interactive hover overlay */}
      {!hoveredNode && (
        <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none">
          <span className="rounded-full bg-brand-dark/[0.04] px-4 py-1.5 font-mono text-[10px] text-brand-gray tracking-tight transition-opacity duration-300 group-hover:opacity-0">
            [ HOVER MOUSE TO ENGAGE SCHEMATICS ]
          </span>
        </div>
      )}
    </div>
  );
}
