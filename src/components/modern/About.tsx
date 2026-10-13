/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code2, Cpu, TrendingUp } from 'lucide-react';

const specialties = [
  {
    title: "Automatización e Integración",
    stat: "60h+",
    statLabel: "ahorro operativo/mes",
    description: "Orquestación de flujos de trabajo autónomos con n8n & RPA para conectar CRM, ERP y APIs.",
    icon: <Zap size={22} />,
  },
  {
    title: "Backend Architecture",
    stat: "5K+",
    statLabel: "usuarios activos",
    description: "Diseño de sistemas robustos, microservicios y APIs escalables con Node.js, Python y PostgreSQL.",
    icon: <Code2 size={22} />,
  },
  {
    title: "Data Pipelines & ETL",
    stat: "50K+",
    statLabel: "registros/día",
    description: "Scripts en Python y Pandas para procesamiento, limpieza y migración masiva de datos biométricos.",
    icon: <TrendingUp size={22} />,
  },
  {
    title: "Infraestructura & Logs",
    stat: "100%",
    statLabel: "trazabilidad",
    description: "Gestión absoluta de activos fijos con contenedores y automatización de reportes de auditoría.",
    icon: <Cpu size={22} />,
  }
];

const About = () => {
  return (
    <section id="about" className="about-section">
      {/* Decorative Texture */}
      <div className="about-section-decor" />

      <div className="container-custom">
        {/* Header - Editorial Style */}
        <div className="about-header-grid">
          <div className="about-header-left">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="about-title"
            >
              IMPACTO <br />
              <span className="text-primary italic">MEDIBLE</span>
            </motion.h2>
          </div>
          <div className="about-header-right">
            <p className="about-description-text">
              Estudiante de Ingeniería de Sistemas & SENA. <br />
              Mi fuerte es el backend y los datos, con <br />
              habilidades complementarias en React/Next.js <br />
              para soluciones integrales (T-Shaped).
            </p>
          </div>
        </div>

        {/* Technical Luxury Grid */}
        <div className="about-specialties-grid">
          {specialties.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="about-specialty-card"
            >
              {/* Technical Detail */}
              <div className="about-specialty-tag">
                 <span>0{i+1} // spec</span>
              </div>

              {/* Icon - Minimalist */}
              <div className="about-specialty-icon-box">
                {s.icon}
              </div>

              {/* Metric - Technical Luxury Style */}
              <div style={{ marginBottom: '32px' }}>
                <div className="about-specialty-metric-value">
                   {s.stat}
                </div>
                <div className="about-specialty-metric-label">
                   {s.statLabel}
                </div>
              </div>
              
              <h3 className="about-specialty-title">{s.title}</h3>
              <p className="about-specialty-desc">
                {s.description}
              </p>
              
              {/* Highlight bar */}
              <div className="about-specialty-highlight-bar" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
