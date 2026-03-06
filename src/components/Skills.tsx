"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SKILLS } from "@/lib/data";
import Container from "./Container";

function SkillTag({ name, delay }: { name: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, type: "spring", stiffness: 100 }}
      className="px-3 py-1.5 rounded-md text-sm font-mono bg-white/[0.03] border border-white/[0.08] text-dim hover:text-text hover:bg-white/[0.08] hover:border-primary/30 transition-all cursor-default"
    >
      {name}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-24">
      <Container>
        <div className="flex items-baseline gap-3 mb-12">
          <h2 className="text-3xl font-bold">
            Compétences <span className="gradient-text">techniques</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SKILLS.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="glass-card glow-border p-7"
            >
              <div className="flex items-center gap-2 mb-6">
                <p className="font-mono text-[0.7rem] text-accent tracking-wide">
                  {cat.category}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skillName, ii) => (
                  <SkillTag key={skillName} name={skillName} delay={0.1 + ii * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
