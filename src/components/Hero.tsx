"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROFILE, STATS } from "@/lib/data";
import Container from "./Container";

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = PROFILE.titles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del) {
      if (displayed.length < cur.length)
        t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 75);
      else t = setTimeout(() => setDel(true), 2000);
    } else {
      if (displayed.length > 0)
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      else {
        setDel(false);
        setIdx((i) => (i + 1) % PROFILE.titles.length);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, del, idx]);

  /* Terminal lines that animate in one by one */
  const terminalLines = [
    { prefix: "❯", cmd: "kubectl describe pod/benjamin -n production", isCmdLine: true },
    { label: "Name:         ", value: "Benjamin" },
    { label: "Namespace:    ", value: "production" },
    { label: "Node:         ", value: "homelab" },
    { label: "Status:       ", value: "Running", valueClass: "text-green-400" },
    { label: "Labels:" },
    { indent: true, label: "  role:       ", value: "tech-lead" },
    { indent: true, label: "  team:       ", value: "infrastructure" },
    { indent: true, label: "  location:   ", value: "Niort" },
    { indent: true, label: "  age:        ", value: "29" },
    { divider: true },
    { label: "Volumes:" },
    { indent: true, label: "  passions:" },
    { indent: true, label: "    Type:     ", value: "ConfigMap" },
    { indent: true, label: "    Items:    ", value: "automation, homelab, kubernetes, gitops, cloud, ia" },
  ];

  return (
    <section className="relative min-h-screen z-10 flex items-center py-32">
      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center">

          {/* Text Column */}
          <div className="flex flex-col gap-5">
            <div className="h-6" /> {/* Spacer to keep layout balanced without the badge */}

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glitch font-black text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.05] tracking-tight"
              data-text={PROFILE.name}
            >
              {PROFILE.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="font-mono text-base text-primary h-7"
            >
              {displayed}
              <span className="cursor-blink" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-dim text-base leading-relaxed max-w-lg"
            >
              {PROFILE.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex gap-3 pt-2"
            >
              <a
                href="#contact"
                className="font-mono text-xs px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                $ me-contacter
              </a>
              <a
                href="#experience"
                className="font-mono text-xs px-5 py-2.5 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary hover:-translate-y-0.5 transition-all duration-300"
              >
                ./voir-parcours
              </a>
            </motion.div>

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 pt-4 mt-2 border-t border-border"
            >
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-mono text-lg font-bold text-primary">{s.value}</div>
                  <div className="text-[0.6rem] text-dim">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card overflow-hidden shadow-2xl shadow-primary/10"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28ca42]" />
              <span className="text-white/30 text-xs ml-2 font-mono">
                benjamin@homelab — zsh
              </span>
            </div>
            <div className="p-6 font-mono text-[0.82rem] leading-[1.9] text-white/70">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className={line.indent ? "pl-4" : ""}
                >
                  {line.divider ? (
                    <p className="text-white/10 select-none">
                      ────────────────────────────
                    </p>
                  ) : line.isCmdLine ? (
                    <p>
                      <span className="text-accent">❯</span>{" "}
                      <span className="text-secondary">{line.cmd}</span>
                    </p>
                  ) : (
                    <p>
                      {line.label && (
                        <span className={line.indent ? "text-white/30" : "text-primary opacity-80"}>
                          {line.label}
                        </span>
                      )}
                      {line.value && (
                        <>
                          {!line.indent && "  "}
                          <span className={line.valueClass || ""}>
                            {line.value}
                          </span>
                        </>
                      )}
                    </p>
                  )}
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-2"
              >
                <span className="text-accent">❯</span>{" "}
                <span className="cursor-blink" />
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Container>

      <div className="scroll-hint flex flex-col items-center gap-1 text-dim font-mono text-[0.65rem]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        scroll
      </div>
    </section>
  );
}
