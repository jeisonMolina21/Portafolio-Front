/** @jsxImportSource react */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Code2, Cpu, Wrench, Sparkles } from 'lucide-react';
import { fallbackData } from '../../data/fallbackData';
import { parseTechStack } from '../../utils/helpers';

type FilterCategory = 'all' | 'fullstack' | 'automation' | 'helpdesk';

export const Projects = ({ projects: propProjects }: { projects?: any[] }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  
  const projectsList = (propProjects || fallbackData.projects).map((p, i) => {
    const titleLower = (p.title || '').toLowerCase();
    const techLower = (p.tech_stack || p.stack || '').toString().toLowerCase();

    let category: FilterCategory = 'fullstack';
    if (titleLower.includes('kairós') || titleLower.includes('hermes') || titleLower.includes('automatización') || techLower.includes('n8n') || techLower.includes('python')) {
      category = 'automation';
    } else if (titleLower.includes('mesa') || titleLower.includes('soporte') || titleLower.includes('helpdesk') || techLower.includes('servicenow') || techLower.includes('jira')) {
      category = 'helpdesk';
    }

    return {
      ...p,
      num: `0${i + 1}`,
      categoryTag: category,
      image: p.image_url || p.image, 
      stack: parseTechStack(p.tech_stack || p.stack || []),
      problem: p.problem || p.description,
      solution: p.solution || "Arquitectura optimizada implementada bajo altos estándares de rendimiento y seguridad.",
      results: p.results || ["Optimización de procesos", "Reducción de tiempos operativos", "Arquitectura escalable"]
    };
  });

  const filteredProjects = projectsList.filter(p => {
    if (activeFilter === 'all') return true;
    return p.categoryTag === activeFilter;
  });

  return (
    <section id="projects" className="projects-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container-custom relative z-10">
        {/* Header - Cyber Command Style */}
        <div style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[12vw] lg:text-[7vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-text-main"
            >
              MATRIZ DE <br />
              <span className="text-gradient-cinematic italic">PROYECTOS & CASOS</span>
            </motion.h2>
          </div>

          {/* Interactive Filter Dock */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: activeFilter === 'all' ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                background: activeFilter === 'all' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                color: '#ffffff',
                transition: 'all 0.3s'
              }}
            >
              Todos ({projectsList.length})
            </button>

            <button
              onClick={() => setActiveFilter('fullstack')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: activeFilter === 'fullstack' ? '1px solid #00f3ff' : '1px solid rgba(255,255,255,0.1)',
                background: activeFilter === 'fullstack' ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255,255,255,0.03)',
                color: activeFilter === 'fullstack' ? '#00f3ff' : '#888888',
                transition: 'all 0.3s'
              }}
            >
              <Code2 size={12} /> Fullstack
            </button>

            <button
              onClick={() => setActiveFilter('automation')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: activeFilter === 'automation' ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                background: activeFilter === 'automation' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                color: activeFilter === 'automation' ? '#10b981' : '#888888',
                transition: 'all 0.3s'
              }}
            >
              <Cpu size={12} /> Automatización
            </button>

            <button
              onClick={() => setActiveFilter('helpdesk')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: activeFilter === 'helpdesk' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                background: activeFilter === 'helpdesk' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                color: activeFilter === 'helpdesk' ? '#3b82f6' : '#888888',
                transition: 'all 0.3s'
              }}
            >
              <Wrench size={12} /> Soporte TI
            </button>
          </div>
        </div>

        {/* Technical Grid of Projects */}
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id || index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="project-card group cursor-pointer cyber-hud-border"
                style={{ borderRadius: '20px', overflow: 'hidden' }}
              >
                {/* Image Frame */}
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image" 
                  />
                  <div className="project-image-overlay" />
                </div>

                {/* Metadata & Content */}
                <div className="project-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="project-category">
                      {project.num} / {project.stack[0] || 'Tech'}
                    </span>
                    <span 
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: project.categoryTag === 'automation' ? 'rgba(16,185,129,0.2)' : project.categoryTag === 'helpdesk' ? 'rgba(59,130,246,0.2)' : 'rgba(0,243,255,0.2)',
                        color: project.categoryTag === 'automation' ? '#10b981' : project.categoryTag === 'helpdesk' ? '#3b82f6' : '#00f3ff'
                      }}
                    >
                      {project.categoryTag}
                    </span>
                  </div>
                  
                  <h3 className="project-title">
                    {project.title}
                  </h3>
                  
                  <p className="project-description">
                    {project.problem}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="project-tags">
                    {project.stack.slice(0, 4).map((s: string) => (
                      <span key={s} className="project-tag">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <span className="project-link-primary">
                      Ver Detalles <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal - Cyber Detail */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="relative w-full h-full lg:h-[80vh] lg:max-w-6xl bg-black border border-white/10 overflow-y-auto lg:overflow-hidden z-20"
              style={{ borderRadius: '24px' }}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 text-text-main z-50 hover:text-primary transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={32} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                <div className="lg:col-span-7 relative h-[40vh] lg:h-full overflow-hidden">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply" />
                </div>
                
                <div className="lg:col-span-5 p-12 lg:p-16 space-y-12 bg-black overflow-y-auto">
                  <div className="space-y-4">
                    <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-widest">Desafío</span>
                    <p className="text-xl text-text-dim leading-relaxed font-light italic">"{selectedProject.problem}"</p>
                  </div>

                  <div className="space-y-4">
                    <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-widest">Solución Técnica</span>
                    <p className="text-lg text-text-main font-sans leading-relaxed font-light">{selectedProject.solution}</p>
                  </div>

                  <div className="space-y-6">
                    <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-widest">Resultados</span>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedProject.results.map((r: string, ri: number) => (
                        <div key={ri} className="flex items-center gap-4 border-b border-white/5 pb-4">
                          <span className="text-primary font-mono text-lg">0{ri+1}</span>
                          <span className="text-text-main font-bold uppercase tracking-tighter text-md">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 flex gap-4">
                    <a href={selectedProject.github_url || "#"} className="flex-1 py-4 border border-primary/20 text-center text-text-main text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all" style={{ borderRadius: '12px' }}>
                       Código Fuente
                    </a>
                    {selectedProject.demo_url && (
                       <a href={selectedProject.demo_url} className="flex-1 py-4 bg-primary text-center text-white text-[10px] font-bold uppercase tracking-widest hover:bg-text-main hover:text-midnight transition-all" style={{ borderRadius: '12px' }}>
                          Live Demo
                       </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
