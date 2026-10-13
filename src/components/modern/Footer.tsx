/** @jsxImportSource react */
import React from 'react';
import { Code2 } from 'lucide-react';

const footerLinks = [
  { name: 'Sobre mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Experiencia', href: '#experience' },
  { name: 'Contacto', href: '#contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="footer-glow" />
      
      <div className="container-custom">
        <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
          {/* Branding */}
          <div className="flex items-center gap-2.5">
            <div className="footer-logo">
              <Code2 size={24} className="text-primary" />
              <span>JEISON<span className="text-primary">.DEV</span></span>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-8">
            {footerLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="footer-nav-link liquid-underline"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="footer-copy">
            © {currentYear} Jeison Molina · Bogotá
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
