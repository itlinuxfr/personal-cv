"use client";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/data";
import Container from "./Container";

const tagStyle: Record<string, string> = {
  tc: "bg-primary/10 text-primary border-primary/20",
  tp: "bg-secondary/10 text-secondary border-secondary/20",
  tg: "bg-accent/10 text-accent border-accent/20",
  "": "bg-white/[0.03] text-dim border-white/[0.08]",
};

export default function Experience({ embedded = false }: { embedded?: boolean }) {
  return embedded ? (
    <Container>
      <Timeline />
    </Container>
  ) : (
    <section id="experience" className="relative z-10 py-24">
      <Container>
        {!embedded && (
          <div className="flex items-baseline gap-3 mb-12">
            <h2 className="text-3xl font-bold">
              Expériences <span className="gradient-text">professionnelles</span>
            </h2>
          </div>
        )}
        <Timeline />
      </Container>
    </section>
  );
}

function Timeline() {
  return (
    <div className="relative pl-8">
      <div className="timeline-line" />
      <div className="flex flex-col gap-6">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative"
          >
            <div
              className="timeline-dot"
              style={{
                borderColor: exp.dotColor,
                boxShadow: `0 0 12px ${exp.dotColor}55`,
              }}
            />
            <div className="glass-card glow-border p-7 group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                    {exp.company}
                  </h3>
                  <p className="font-mono text-sm text-primary mt-0.5">
                    {exp.role}
                  </p>
                </div>
                <span
                  className="font-mono text-xs px-3 py-1.5 rounded-full border self-start sm:self-center shrink-0"
                  style={{
                    color: exp.dotColor,
                    borderColor: exp.dotColor + "44",
                    background: exp.dotColor + "11",
                  }}
                >
                  {exp.date}
                </span>
              </div>
              <p className="text-dim text-base leading-relaxed mb-5">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((t) => (
                  <span
                    key={t.label}
                    className={`font-mono text-xs px-3 py-1 rounded-full border transition-all duration-200 hover:scale-105 hover:shadow-sm ${
                      tagStyle[t.style] ?? tagStyle[""]
                    }`}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
