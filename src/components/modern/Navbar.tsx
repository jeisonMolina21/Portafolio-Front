/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { name: "Sobre mí", href: "#about" },
  { name: "Proyectos", href: "#projects" },
  { name: "Experiencia", href: "#experience" },
  { name: "Contacto", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Initial theme check
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') document.documentElement.classList.add('light');

    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    const sections = navItems.map(item => document.querySelector(item.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <nav className="nav-root">
      <div className="container-custom">
        <div className={`nav-container-wrapper ${isScrolled ? 'nav-scrolled' : 'nav-top'}`}>
          
          {/* Logo */}
          <motion.a 
            href="/" 
            className="nav-logo-btn group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="nav-logo-text">
              JEISON<span className="text-primary">.</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="nav-items-desktop">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`nav-link ${activeSection === item.href ? 'text-primary' : ''}`}
              >
                {item.name}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="nav-link-underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="nav-lang-btn"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <a 
              href="#contact" 
              className="nav-btn-hire"
            >
              Contacto
            </a>

            {/* Mobile Toggle */}
            <button 
              className="nav-mobile-toggle" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item, i) => (
                <motion.a 
                  key={item.name} 
                  href={item.href} 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-5xl font-display font-black text-white uppercase tracking-tighter hover:text-primary transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
