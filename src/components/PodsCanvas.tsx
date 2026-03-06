"use client";
import { useEffect, useRef } from "react";
import { TECHS } from "@/lib/data";

const HEX_COLORS = ["#0086FF", "#326CE5", "#00B4E5", "#0055A4"];

export default function PodsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    /* Preload logos — use white-colored icons for dark bg */
    /* Some logos are too dark on blue hexagons — override to white */
    const imgs: Record<string, HTMLImageElement> = {};
    const lightOverrides: Record<string, string> = { helm: "ffffff", vault: "ffffff", git: "ffffff", etcd: "ffffff" };
    TECHS.forEach(({ name, slug }) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      const color = lightOverrides[slug];
      img.src = color
        ? `https://cdn.simpleicons.org/${slug}/${color}`
        : `https://cdn.simpleicons.org/${slug}`;
      imgs[name] = img;
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let dragPod: Pod | null = null;
    let offX = 0,
      offY = 0;
    let dragStartX = 0,
      dragStartY = 0;

    class Pod {
      name: string;
      img: HTMLImageElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      alpha: number;
      rot: number;
      rotSpd: number;
      dragging = false;

      constructor(i: number) {
        const tech = TECHS[i % TECHS.length];
        this.name = tech.name;
        this.img = imgs[tech.name];
        this.r = 30 + Math.random() * 10;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        /* Increased speed to make the drifting motion more noticeable */
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.color = HEX_COLORS[i % HEX_COLORS.length];
        this.alpha = 0.05 + Math.random() * 0.08;
        this.rot = Math.random() * Math.PI * 2;
        /* Increased rotation slightly so the hexagons spin visually */
        this.rotSpd = (Math.random() - 0.5) * 0.005;
      }

      hex(x: number, y: number, r: number) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
        }
        ctx.closePath();
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.globalAlpha = this.dragging ? this.alpha * 4 : this.alpha;
        ctx.fillStyle = this.color;
        this.hex(0, 0, this.r);
        ctx.fill();
        ctx.globalAlpha = this.dragging ? 0.6 : 0.15;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        this.hex(0, 0, this.r);
        ctx.stroke();
        ctx.restore();

        /* Logo upright */
        ctx.save();
        ctx.translate(this.x, this.y);
        const s = this.r * 0.9;
        if (this.img?.complete && this.img.naturalWidth > 0) {
          ctx.globalAlpha = this.dragging ? 0.85 : Math.min(this.alpha * 3.5, 0.5);
          ctx.drawImage(this.img, -s / 2, -s / 2, s, s);
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      update() {
        if (this.dragging) return;
        this.x += this.vx;
        this.y += this.vy;
        this.rot += this.rotSpd;
        const W = window.innerWidth,
          H = window.innerHeight;
        if (this.x < -this.r) this.x = W + this.r;
        if (this.x > W + this.r) this.x = -this.r;
        if (this.y < -this.r) this.y = H + this.r;
        if (this.y > H + this.r) this.y = -this.r;
      }

      hit(mx: number, my: number) {
        const dx = mx - this.x,
          dy = my - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.r * 1.2;
      }
    }

    const pods = TECHS.map((_, i) => new Pod(i));

    const onMouseDown = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left,
        my = e.clientY - r.top;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      for (const p of [...pods].reverse()) {
        if (p.hit(mx, my)) {
          dragPod = p;
          p.dragging = true;
          offX = mx - p.x;
          offY = my - p.y;
          break;
        }
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragPod) return;
      const r = canvas.getBoundingClientRect();
      dragPod.x = e.clientX - r.left - offX;
      dragPod.y = e.clientY - r.top - offY;
    };
    const onMouseUp = (e: MouseEvent) => {
      if (dragPod) {
        const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
        if (dist < 10) {
          const root = document.documentElement;

          const resetTheme = () => {
            root.classList.remove("theme-red", "theme-purple");
            root.style.removeProperty("--color-primary");
            root.style.removeProperty("--color-secondary");
            root.style.removeProperty("--color-glow");
            root.style.removeProperty("--primary");
            root.style.removeProperty("--secondary");
            root.style.removeProperty("--glow");
          };

          const applyTheme = (
            themeClass: string,
            primary: string,
            secondary: string,
            glow: string
          ) => {
            resetTheme();
            root.classList.add(themeClass);
            root.style.setProperty("--color-primary", primary);
            root.style.setProperty("--color-secondary", secondary);
            root.style.setProperty("--color-glow", glow);
            root.style.setProperty("--primary", primary);
            root.style.setProperty("--secondary", secondary);
            root.style.setProperty("--glow", glow);
          };

          if (dragPod.name === "openshift") {
            if (root.classList.contains("theme-red")) {
              resetTheme();
            } else {
              applyTheme("theme-red", "#ee0000", "#cc0000", "rgba(238, 0, 0, 0.15)");
            }
          } else if (dragPod.name === "terraform") {
            if (root.classList.contains("theme-purple")) {
              resetTheme();
            } else {
              applyTheme("theme-purple", "#844FBA", "#5C3A9E", "rgba(132, 79, 186, 0.15)");
            }
          }
        }
        dragPod.dragging = false;
        /* Toss effect on release */
        dragPod.vx = (Math.random() - 0.5) * 1.5;
        dragPod.vy = (Math.random() - 0.5) * 1.5;
        dragPod = null;
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    let raf: number;
    function loop() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      /* Connection lines */
      for (let i = 0; i < pods.length; i++) {
        for (let j = i + 1; j < pods.length; j++) {
          const dx = pods[i].x - pods[j].x,
            dy = pods[i].y - pods[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            ctx.beginPath();
            ctx.strokeStyle = "#0086FF";
            ctx.globalAlpha = (1 - d / 180) * 0.04;
            ctx.lineWidth = 1;
            ctx.moveTo(pods[i].x, pods[i].y);
            ctx.lineTo(pods[j].x, pods[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      pods.forEach((p) => {
        p.update();
        p.draw();
      });
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <canvas
      id="pods-canvas"
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-all duration-700"
    />
  );
}
