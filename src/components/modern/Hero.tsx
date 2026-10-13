/** @jsxImportSource react */
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Code2, Cpu, Wrench, ShieldCheck } from 'lucide-react';
import HeroBackground from './HeroBackground';
import CyberTerminal from './CyberTerminal';
import { useLanguage } from '../../context/LanguageContext';
import { IMAGE_BASE_URL } from '../../utils/api';

type RoleKey = 'fullstack' | 'automation' | 'helpdesk';

export const Hero = ({ profile, profiles }: { profile: any; profiles?: any[] }) => {
  const { lang } = useLanguage();
  const containerRef = useRef(null);
  const [activeRole, setActiveRole] = useState<RoleKey>('fullstack');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const roleConfig = {
    fullstack: {
      badge: "Fullstack Engineer & Backend Architect",
      titleLine1: "FULLSTACK &",
      titleLine2: "DEVELOPMENT",
      subtitle: "Ingeniería de Sistemas // React 19 // Node.js // Express // PostgreSQL",
      description: "Diseño y construcción de aplicaciones web escalables y APIs REST robustas. Creador del Sistema de Carnetización Digital Institucional con arquitectura basada en roles.",
      color: "#0EA5E9",
      lightColor: "#2563EB",
      cvUrl: "/cv-fullstack.pdf"
    },
    automation: {
      badge: "RPA & Process Automation Specialist",
      titleLine1: "AUTOMATION &",
      titleLine2: "PYTHON RPA",
      subtitle: "Python // Pandas // n8n // Microsoft Graph API // ZKTeco API",
      description: "Desarrollo de bots y scripts en Python para optimización operativa e ingesta masiva de datos. Reducción de 12 días de trabajo manual al mes (Proyecto Kairós).",
      color: "#10b981",
      lightColor: "#7C3AED",
      cvUrl: "/cv-automation.pdf"
    },
    helpdesk: {
      badge: "IT Support & Helpdesk Specialist N1/N2",
      titleLine1: "IT SUPPORT &",
      titleLine2: "HELPDESK N1/N2",
      subtitle: "ServiceNow // Jira // Microsoft 365 // Active Directory // Redes",
      description: "Gestión de mesas de ayuda, resolución de incidencias N1/N2, administración de identidades en Microsoft 365 / Active Directory y mantenimiento preventivo de infraestructura.",
      color: "#1E40AF",
      lightColor: "#2563EB",
      cvUrl: "/cv-helpdesk.pdf"
    }
  };

  // Find dynamic database profile for the active role (1: fullstack, 2: automation, 3: helpdesk)
  const dbProfile = profiles?.find((p: any) => {
    if (activeRole === 'fullstack') return p.id === 1;
    if (activeRole === 'automation') return p.id === 2;
    if (activeRole === 'helpdesk') return p.id === 3;
    return false;
  }) || profile;

  const current = {
    ...roleConfig[activeRole],
    badge: dbProfile?.title || roleConfig[activeRole].badge,
    description: dbProfile?.bio || roleConfig[activeRole].description
  };

  return (
    <section ref={containerRef} className="hero-section">
      {/* Interactive Particles Background */}
      <HeroBackground />

      {/* Dynamic Role Background Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${current.color}25 0%, transparent 70%)`,
          filter: 'blur(100px)',
          transition: 'all 0.8s ease',
          pointerEvents: 'none'
        }}
      />

      <motion.div style={{ opacity, zIndex: 10 }} className="hero-content-grid">
        {/* Left: Editorial Content & Role Switcher */}
        <div className="hero-text-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Skeuomorphic Dock Selector */}
            <div style={{
              display: 'inline-flex',
              gap: '6px',
              padding: '8px',
              borderRadius: '9999px',
              background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '8px 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => setActiveRole('fullstack')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                  background: activeRole === 'fullstack' ? 'linear-gradient(180deg, #0EA5E9, #1E40AF)' : 'transparent',
                  color: activeRole === 'fullstack' ? '#ffffff' : 'rgba(226, 232, 240, 0.6)',
                  boxShadow: activeRole === 'fullstack' ? '0 4px 14px rgba(14, 165, 233, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)' : 'none',
                  transition: 'all 0.3s'
                }}
              >
                <Code2 size={12} />
                <span>Fullstack</span>
              </button>

              <button
                onClick={() => setActiveRole('automation')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                  background: activeRole === 'automation' ? 'linear-gradient(180deg, #10b981, #047857)' : 'transparent',
                  color: activeRole === 'automation' ? '#ffffff' : 'rgba(226, 232, 240, 0.6)',
                  boxShadow: activeRole === 'automation' ? '0 4px 14px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)' : 'none',
                  transition: 'all 0.3s'
                }}
              >
                <Cpu size={12} />
                <span>Automatización</span>
              </button>

              <button
                onClick={() => setActiveRole('helpdesk')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                  background: activeRole === 'helpdesk' ? 'linear-gradient(180deg, #7C3AED, #1E40AF)' : 'transparent',
                  color: activeRole === 'helpdesk' ? '#ffffff' : 'rgba(226, 232, 240, 0.6)',
                  boxShadow: activeRole === 'helpdesk' ? '0 4px 14px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)' : 'none',
                  transition: 'all 0.3s'
                }}
              >
                <Wrench size={12} />
                <span>Soporte TI</span>
              </button>
            </div>

            {/* Dynamic Animated Content Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Technical Badge */}
                <div className="hero-tagline" style={{ color: current.color }}>
                  <span className="flex h-2 w-2 rounded-full animate-ping" style={{ background: current.color }} />
                  <span>{current.badge}</span>
                </div>

                {/* Massive Editorial Heading */}
                <div style={{ marginTop: '12px' }}>
                  <h1 className="hero-title">
                    {current.titleLine1} <br />
                    <span style={{ color: current.color, textShadow: `0 0 30px ${current.color}66` }} className="italic">
                      {current.titleLine2}
                    </span>
                  </h1>
                  <p 
                    className="hero-description" 
                    style={{ 
                      marginTop: '1rem', 
                      textTransform: 'uppercase', 
                      fontSize: '11px', 
                      letterSpacing: '0.25em', 
                      color: current.color,
                      fontWeight: 700 
                    }}
                  >
                    {current.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="hero-description" style={{ marginTop: '16px' }}>
                  {current.description}
                </p>

                {/* Skeuomorphic High-Contrast CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', paddingTop: '24px', alignItems: 'center' }}>
                  <a 
                    href="#projects" 
                    className="btn-primary skeuo-btn"
                  >
                    <span>Ver Proyectos</span>
                    <ArrowRight size={14} />
                  </a>

                  <a 
                    href={`${IMAGE_BASE_URL}/api/cv/download?role=${activeRole}&lang=${lang}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ border: `1px solid ${current.color}44` }}
                  >
                    <span>Descargar PDF ({activeRole.toUpperCase()})</span>
                    <Download size={14} style={{ color: current.color }} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column: Skeuomorphic Avatar Frame + CyberTerminal Console */}
        <div className="hero-visual-column">
          {/* Holographic Avatar Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="holo-avatar-frame skeuo-card"
            style={{
              scale,
              borderColor: `${current.color}55`
            }}
          >
            <img 
              src={profile?.image_url || "/profile-photo.jpg"} 
              alt="Jeison Molina"
              className="holo-avatar-img"
            />
            
            <div className="holo-avatar-badge">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14} style={{ color: current.color }} />
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.1em' }}>
                  JEISON MOLINA
                </span>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 700, color: current.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {activeRole.toUpperCase()}
              </span>
            </div>
          </motion.div>

          {/* CyberTerminal Console */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <CyberTerminal role={activeRole} accentColor={current.color} />
          </motion.div>
        </div>
      </motion.div>

      {/* Vertical Navigation Hint */}
      <div className="hero-explore-hint">
        <span className="hero-explore-text">Explore</span>
        <div className="hero-explore-line" />
      </div>
    </section>
  );
};

export default Hero;
