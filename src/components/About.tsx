"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";
import Container from "./Container";



function AnimatedCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Special case for the endless coffee counter
    if (value === "54053") {
      let currentVal = 54053;
      setDisplayed(currentVal.toLocaleString("fr-FR"));
      
      const coffeeTimer = setInterval(() => {
        // Increment by a random amount between 1 and 5 every tick
        currentVal += Math.floor(Math.random() * 5) + 1;
        setDisplayed(currentVal.toLocaleString("fr-FR"));
      }, 80); // Fast increment
      
      return () => clearInterval(coffeeTimer);
    }

    /* Extract numeric part */
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    if (isNaN(numeric) || value === "∞") {
      setDisplayed(value);
      return;
    }
    const start = Date.now();
    const duration = 1800;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(numeric * eased * 10) / 10;
      if (Number.isInteger(numeric)) {
        setDisplayed(Math.floor(numeric * eased) + suffix);
      } else {
        setDisplayed(current.toFixed(1) + suffix);
      }
      if (progress >= 1) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card glow-border p-6 text-center group cursor-default"
    >

      <div className="font-mono text-3xl sm:text-4xl font-black gradient-text leading-none mb-2">
        {displayed}
      </div>
      <div className="text-dim text-sm">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative z-10 py-24">
      <Container>
        <div className="flex items-baseline gap-3 mb-12">
          <h2 className="text-3xl font-bold">
            À propos de <span className="gradient-text">moi</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <AnimatedCounter
              key={s.label}
              value={s.value}
              label={s.label}

              delay={i * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
