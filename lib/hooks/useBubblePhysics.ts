'use client';

import { useEffect, useState, useRef } from 'react';

export interface BubbleNode {
  id: string;
  symbol: string;
  name: string;
  priceChange: number;
  value: number;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isPortfolio: boolean;
  image?: string;
}

interface UseBubblePhysicsProps {
  data: any[];
  width: number;
  height: number;
  minRadius?: number;
  maxRadius?: number;
  sizeKey?: string;
  userOwnedSymbols?: Set<string>;
}

export function useBubblePhysics({
  data,
  width,
  height,
  minRadius = 20,
  maxRadius = 60,
  sizeKey = 'total_volume',
  userOwnedSymbols = new Set<string>(),
}: UseBubblePhysicsProps) {
  const [nodes, setNodes] = useState<BubbleNode[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<BubbleNode[]>([]);

  // Initialize and pre-pack nodes when data, dimensions, or sizeKey changes
  useEffect(() => {
    if (!data || data.length === 0 || width <= 0 || height <= 0) {
      setNodes([]);
      nodesRef.current = [];
      return;
    }

    // Extract values to scale radius log-style
    const values = data.map((d) => Number(d[sizeKey]) || 0);
    const minVal = Math.min(...values) || 1;
    const maxVal = Math.max(...values) || 1;
    const logMin = Math.log(minVal);
    const logMax = Math.log(maxVal);

    const getRadius = (val: number) => {
      const numVal = Math.max(val, minVal);
      const logVal = Math.log(numVal);
      const ratio = logMax === logMin ? 0.5 : (logVal - logMin) / (logMax - logMin);
      // Bound radius
      return minRadius + ratio * (maxRadius - minRadius);
    };

    const centerX = width / 2;
    const centerY = height / 2;

    const newNodes: BubbleNode[] = data.map((d, index) => {
      const symbol = d.symbol.toUpperCase();
      const radius = getRadius(Number(d[sizeKey]) || 0);

      // Arrange nodes circularly to avoid immediate high-overlap explosion
      const angle = (index / data.length) * 2 * Math.PI;
      const distance = 40 + Math.random() * 60;

      const existing = nodesRef.current.find((n) => n.symbol === symbol);

      return {
        id: d.id || symbol,
        symbol,
        name: d.name,
        priceChange: Number(d.price_change_percentage_24h) || 0,
        value: Number(d[sizeKey]) || 0,
        radius,
        x: existing ? existing.x : centerX + Math.cos(angle) * distance,
        y: existing ? existing.y : centerY + Math.sin(angle) * distance,
        vx: existing ? existing.vx : 0,
        vy: existing ? existing.vy : 0,
        isPortfolio: userOwnedSymbols.has(symbol),
        image: d.image,
      };
    });

    // Pre-pack simulation: run 200 ticks to initialize nodes in packed position
    const gravity = 0.02;
    const collisionStrength = 0.15;
    const padding = 3;

    for (let k = 0; k < 200; k++) {
      // 1. Center attraction
      for (let i = 0; i < newNodes.length; i++) {
        const n = newNodes[i];
        n.vx += (centerX - n.x) * gravity;
        n.vy += (centerY - n.y) * gravity;
      }

      // 2. Collisions between nodes
      for (let i = 0; i < newNodes.length; i++) {
        const n1 = newNodes[i];
        for (let j = i + 1; j < newNodes.length; j++) {
          const n2 = newNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy) || 1;
          const minDist = n1.radius + n2.radius + padding;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const force = overlap * collisionStrength;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }

      // 3. Update position and check container boundaries
      for (let i = 0; i < newNodes.length; i++) {
        const n = newNodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.8;
        n.vy *= 0.8;

        const margin = n.radius + padding;
        if (n.x < margin) n.x = margin;
        if (n.x > width - margin) n.x = width - margin;
        if (n.y < margin) n.y = margin;
        if (n.y > height - margin) n.y = height - margin;
      }
    }

    nodesRef.current = newNodes;
    setNodes([...newNodes]);
  }, [data, width, height, minRadius, maxRadius, sizeKey, userOwnedSymbols]);

  // Live simulation tick to create smooth drift and responsive interactions
  useEffect(() => {
    if (nodes.length === 0 || width <= 0 || height <= 0) return;

    let active = true;
    const gravity = 0.008;
    const collisionStrength = 0.1;
    const padding = 4;
    const friction = 0.9;

    const tick = () => {
      if (!active) return;

      const currentNodes = nodesRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Center attraction
      for (let i = 0; i < currentNodes.length; i++) {
        const n = currentNodes[i];
        n.vx += (centerX - n.x) * gravity;
        n.vy += (centerY - n.y) * gravity;
      }

      // 2. Collisions between nodes
      for (let i = 0; i < currentNodes.length; i++) {
        const n1 = currentNodes[i];
        for (let j = i + 1; j < currentNodes.length; j++) {
          const n2 = currentNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy) || 1;
          const minDist = n1.radius + n2.radius + padding;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const force = overlap * collisionStrength;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }

      // 3. Update positions, apply friction & constrain within viewport bounding boxes
      for (let i = 0; i < currentNodes.length; i++) {
        const n = currentNodes[i];
        n.x += n.vx;
        n.y += n.vy;

        n.vx *= friction;
        n.vy *= friction;

        const margin = n.radius + 2;
        if (n.x < margin) {
          n.x = margin;
          n.vx *= -0.5;
        }
        if (n.x > width - margin) {
          n.x = width - margin;
          n.vx *= -0.5;
        }
        if (n.y < margin) {
          n.y = margin;
          n.vy *= -0.5;
        }
        if (n.y > height - margin) {
          n.y = height - margin;
          n.vy *= -0.5;
        }
      }

      setNodes([...currentNodes]);
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, nodes.length]);

  return { nodes };
}
