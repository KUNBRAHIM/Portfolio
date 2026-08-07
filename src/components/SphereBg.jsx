'use client';

import React, { useEffect, useRef } from 'react';

/**
 * @typedef {Object} SphereBgProps
 * @property {number} [opacity=0.45]
 * @property {number} [radiusRatio=0.28]
 */

export default function SphereBg({ opacity = 0.45, radiusRatio = 0.28 }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const POINTS = 220;
    const spherePoints = [];
    for (let i = 0; i < POINTS; i++) {
      const theta = Math.acos(1 - 2 * i / POINTS);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      spherePoints.push({
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
      });
    }

    const project = (p, cx, cy, r, a) => {
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const cosB = Math.cos(a * 0.4);
      const sinB = Math.sin(a * 0.4);
      const rx = p.x * cosA - p.z * sinA;
      const rz = p.x * sinA + p.z * cosA;
      const ry2 = p.y * cosB - rz * sinB;
      const rz2 = p.y * sinB + rz * cosB;
      const scale = (rz2 + 2) / 3;
      return { sx: cx + rx * r * scale, sy: cy + ry2 * r * scale, depth: rz2 };
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(canvas.width, canvas.height) * radiusRatio;

      angle += 0.005;
      const projected = spherePoints.map((p) => project(p, cx, cy, r, angle));

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].sx - projected[j].sx;
          const dy = projected[i].sy - projected[j].sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < r * 0.28) {
            const alpha =
              (1 - dist / (r * 0.28)) *
              0.35 *
              ((projected[i].depth + projected[j].depth + 2) / 4);
            ctx.beginPath();
            ctx.moveTo(projected[i].sx, projected[i].sy);
            ctx.lineTo(projected[j].sx, projected[j].sy);
            ctx.strokeStyle = `rgba(200, 150, 90, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      projected.forEach((p) => {
        const a = (p.depth + 1.2) / 2.2;
        const size = a * 2.2;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 150, 90, ${a * 0.85})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [radiusRatio]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
