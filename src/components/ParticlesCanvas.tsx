"use client";
import { useEffect, useRef } from "react";

/*
 * Antigravity-style particle field:
 * - Particles are spread across the screen with a uniform drift direction
 * - Cursor creates a wave/ripple displacement within a radius
 * - Particles smoothly return to their home positions
 */

const COLS = 40;
const ROWS = 25;
const MOUSE_RADIUS = 250;
const PUSH_FORCE = 60;
const RETURN_SPEED = 0.06;
const DRIFT_SPEED = 0.3;
const DRIFT_ANGLE = -Math.PI / 6; // ~30° upper-left drift
const COLOR = "#4488ff";

export default function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    /* Grid spacing */
    let spacingX = 0, spacingY = 0;

    const COUNT = 800;
    const homeX  = new Float32Array(COUNT);
    const homeY  = new Float32Array(COUNT);
    const x      = new Float32Array(COUNT);
    const y      = new Float32Array(COUNT);
    const vx     = new Float32Array(COUNT);
    const vy     = new Float32Array(COUNT);
    const homeVx = new Float32Array(COUNT);
    const homeVy = new Float32Array(COUNT);
    const sizes  = new Float32Array(COUNT);
    const alphas = new Float32Array(COUNT);

    const initPositions = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      for (let i = 0; i < COUNT; i++) {
        homeX[i] = Math.random() * W;
        homeY[i] = Math.random() * H;
        x[i] = homeX[i];
        y[i] = homeY[i];
        vx[i] = 0;
        vy[i] = 0;
        // Assign a constant, very slow random drift to each particle's home position
        homeVx[i] = (Math.random() - 0.5) * 0.4;
        homeVy[i] = (Math.random() - 0.5) * 0.4;
        sizes[i] = 2 + Math.random() * 2.5;
        alphas[i] = 0.2 + Math.random() * 0.4;
      }
    };
    initPositions();
    window.addEventListener("resize", initPositions);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    /* Uniform drift direction */
    const driftX = Math.cos(DRIFT_ANGLE) * DRIFT_SPEED;
    const driftY = Math.sin(DRIFT_ANGLE) * DRIFT_SPEED;

    let raf: number;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.x, my = mouse.y;
      const r2 = MOUSE_RADIUS * MOUSE_RADIUS;

      for (let i = 0; i < COUNT; i++) {
        /* Mouse repulsion */
        const dx = x[i] - mx;
        const dy = y[i] - my;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < r2 && dist2 > 0) {
          const dist = Math.sqrt(dist2);
          const force = (1 - dist / MOUSE_RADIUS) * PUSH_FORCE;
          const nx = dx / dist;
          const ny = dy / dist;
          vx[i] += nx * force * 0.15;
          vy[i] += ny * force * 0.15;
        }

        /* Omnidirectional continuous slow drift */
        homeX[i] += homeVx[i];
        homeY[i] += homeVy[i];

        /* Loop back smoothly on all edges */
        if (homeX[i] < -50) { homeX[i] = W + 50; x[i] = W + 50; }
        else if (homeX[i] > W + 50) { homeX[i] = -50; x[i] = -50; }
        
        if (homeY[i] < -50) { homeY[i] = H + 50; y[i] = H + 50; }
        else if (homeY[i] > H + 50) { homeY[i] = -50; y[i] = -50; }

        /* Drift + return to home */
        vx[i] += (homeX[i] + driftX - x[i]) * RETURN_SPEED;
        vy[i] += (homeY[i] + driftY - y[i]) * RETURN_SPEED;

        /* Damping */
        vx[i] *= 0.85;
        vy[i] *= 0.85;

        x[i] += vx[i];
        y[i] += vy[i];

        /* Draw — simple rect, very fast */
        const displacement = Math.sqrt(
          (x[i] - homeX[i]) * (x[i] - homeX[i]) +
          (y[i] - homeY[i]) * (y[i] - homeY[i])
        );
        const brightBoost = Math.min(displacement / 30, 1);
        /* Dynamically read CSS variable so particles turn red with the easter egg */
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim();
        ctx.fillStyle = primaryColor || "#0086FF";
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(x[i], y[i], sizes[i], 0, Math.PI * 2);
        ctx.fill(
        );
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", initPositions);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
}
