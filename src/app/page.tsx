import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import About           from "@/components/About";
import ExperienceSection from "@/components/ExperienceSection";
import Skills          from "@/components/Skills";
import Contact         from "@/components/Contact";
import PodsCanvas      from "@/components/PodsCanvas";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import Container       from "@/components/Container";

export default function Home() {
  return (
    <div className="bg-mesh min-h-screen">
      <PodsCanvas />
      <ParticlesCanvas />
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
        <About />
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
        <ExperienceSection />
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
        <Skills />
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-border py-6">
        <Container className="flex justify-between items-center text-dim font-mono text-xs">
          <span>
            <span className="text-primary font-bold">Benjamin Martineau</span> ·
            Tech Lead OpenShift/Kubernetes
          </span>
          <span>Niort, France · 2026</span>
        </Container>
      </footer>
    </div>
  );
}
