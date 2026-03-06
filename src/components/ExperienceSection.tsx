"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Experience from "./Experience";
import CareerTree from "./CareerTree";
import Container from "./Container";

type View = "timeline" | "tree";

export default function ExperienceSection() {
  const [view, setView] = useState<View>("timeline");

  return (
    <section id="experience" className="relative z-10 py-24">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            <h2 className="text-3xl font-bold">
              Expériences <span className="gradient-text">professionnelles</span>
            </h2>
          </div>

          {/* Toggle buttons - Temporarily disabled 
          <div className="flex gap-1 bg-white/[0.04] border border-white/[0.08] rounded-lg p-1">
            <button
              onClick={() => setView("timeline")}
              className={`px-4 py-1.5 rounded-md text-sm font-mono transition-all duration-200 ${
                view === "timeline"
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-dim hover:text-text"
              }`}
            >
              📋 Timeline
            </button>
            <button
              onClick={() => setView("tree")}
              className={`px-4 py-1.5 rounded-md text-sm font-mono transition-all duration-200 ${
                view === "tree"
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-dim hover:text-text"
              }`}
            >
              🌳 ArgoCD
            </button>
          </div>
          */}
        </div>
      </Container>

      <Experience embedded />
      
      {/* 
      <AnimatePresence mode="wait">
        {view === "timeline" ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Experience embedded />
          </motion.div>
        ) : (
          <motion.div
            key="tree"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CareerTree embedded />
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </section>
  );
}
