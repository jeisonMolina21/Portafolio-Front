/** @jsxImportSource react */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Github, ArrowUpRight, Loader2, Check } from 'lucide-react';
import { api } from '../../utils/api';
import { copyToClipboard } from '../../utils/helpers';

const Contact = ({ profile }: { profile: any }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const email = profile?.email || "andreyyeisonmg@gmail.com";
  const linkedin = profile?.linkedin_url || "https://www.linkedin.com/in/jeison-molina12/";
  const github = profile?.github_url || "https://github.com/jeisonMolina21";

  const copyEmail = async () => {
    const success = await copyToClipboard(email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    
    setStatus('sending');
    try {
      const response = await api.post('messages', {
        name: formData.name,
        message: `Email: ${formData.email}\n\nProyecto:\n${formData.message}`,
        phone: null,
        whatsapp: null,
        city: null
      });

      if (response && !response.error) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(response?.error || 'Error al enviar');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.02] pointer-events-none" />

      <div className="contact-content-grid">
        {/* Left: Editorial Header */}
        <div className="lg:col-span-7 space-y-12">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[12vw] lg:text-[7vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-text-main"
          >
            HABLEMOS <br />
            <span className="text-primary italic">DEL FUTURO</span>
          </motion.h2>

          <p className="text-text-dim text-lg font-light max-w-md leading-relaxed border-l border-primary/30 pl-8">
            Disponible para arquitecturas de alto impacto, <br />
            automatización inteligente y soluciones <br />
            escalables de software.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
             <div className="space-y-4">
                <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em]">Email Directo</span>
                <button 
                   onClick={copyEmail}
                   className="text-2xl font-display font-black text-text-main hover:text-primary transition-colors flex items-center gap-3 bg-transparent border-0 cursor-pointer text-left p-0"
                >
                   {email.split('@')[0]}
                   <ArrowUpRight className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
                </button>
                {copied && <span className="text-primary font-mono text-[10px] animate-pulse uppercase tracking-widest block" style={{ marginTop: '8px' }}>Copiado al portapapeles</span>}
             </div>

             <div className="space-y-4">
                <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em]">Social</span>
                <div className="flex gap-6">
                   <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-text-main/40 hover:text-primary transition-colors"><Linkedin size={24} /></a>
                   <a href={github} target="_blank" rel="noopener noreferrer" className="text-text-main/40 hover:text-primary transition-colors"><Github size={24} /></a>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Modern Form Card */}
        <div className="lg:col-span-5 relative">
          <div className="contact-form-card">
            <div className="contact-form-glow" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="contact-input-group">
                <label className="contact-label" htmlFor="name">Nombre</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className="contact-input"
                  required
                />
              </div>

              <div className="contact-input-group">
                <label className="contact-label" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  className="contact-input"
                  required
                />
              </div>

              <div className="contact-input-group">
                <label className="contact-label" htmlFor="message">Proyecto / Mensaje</label>
                <textarea 
                  id="message"
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Detalles sobre tu proyecto o consulta..."
                  className="contact-input contact-textarea"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="contact-submit-btn group"
              >
                {status === 'sending' ? (
                  <>
                    <span>Enviando</span>
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : status === 'success' ? (
                  <>
                    <span>Mensaje Enviado</span>
                    <Check size={16} />
                  </>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send size={16} className="contact-submit-icon" />
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-xs font-mono text-primary uppercase tracking-widest text-center mt-4">
                  Ocurrió un error. Intenta de nuevo.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
